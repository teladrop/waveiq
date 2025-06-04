import { NextResponse } from 'next/server';
import { google } from 'googleapis';

const youtube = google.youtube('v3');

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get('keyword');

    if (!keyword) {
      return NextResponse.json(
        { error: 'Keyword is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'YouTube API key is not configured' },
        { status: 500 }
      );
    }

    // Get search results for the keyword
    const searchResponse = await youtube.search.list({
      key: apiKey,
      part: ['snippet'],
      q: keyword,
      type: ['video'],
      maxResults: 10,
      order: 'viewCount',
    });

    // Get video statistics for the search results
    const videoIds = searchResponse.data.items?.map(item => item.id?.videoId).filter(Boolean) as string[];
    const videosResponse = await youtube.videos.list({
      key: apiKey,
      part: ['statistics', 'snippet'],
      id: videoIds,
    });

    const videos = videosResponse.data.items?.map(video => ({
      id: video.id,
      title: video.snippet?.title,
      publishedAt: video.snippet?.publishedAt,
      viewCount: parseInt(video.statistics?.viewCount || '0'),
      likeCount: parseInt(video.statistics?.likeCount || '0'),
      commentCount: parseInt(video.statistics?.commentCount || '0'),
      channelTitle: video.snippet?.channelTitle,
      thumbnailUrl: video.snippet?.thumbnails?.default?.url,
    }));

    // Calculate trend metrics
    const totalViews = videos?.reduce((sum, video) => sum + video.viewCount, 0) || 0;
    const totalLikes = videos?.reduce((sum, video) => sum + video.likeCount, 0) || 0;
    const totalComments = videos?.reduce((sum, video) => sum + video.commentCount, 0) || 0;
    const averageEngagement = videos?.length ? (totalLikes + totalComments) / totalViews * 100 : 0;

    // Get related keywords
    const relatedKeywords = await getRelatedKeywords(keyword);

    return NextResponse.json({
      keyword,
      metrics: {
        totalViews,
        totalLikes,
        totalComments,
        averageEngagement,
        videoCount: videos?.length || 0,
      },
      topVideos: videos,
      relatedKeywords,
    });
  } catch (error) {
    console.error('Error fetching keyword trends:', error);
    return NextResponse.json(
      { error: 'Failed to fetch keyword trends' },
      { status: 500 }
    );
  }
}

async function getRelatedKeywords(keyword: string): Promise<string[]> {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) return [];

    // Get search suggestions using YouTube's search API
    const response = await youtube.search.list({
      key: apiKey,
      part: ['snippet'],
      q: keyword,
      type: ['video'],
      maxResults: 5,
    });

    // Extract potential related keywords from video titles
    const titles = response.data.items?.map(item => item.snippet?.title || '') || [];
    const words = titles.join(' ').toLowerCase().split(/\s+/);
    
    // Filter out common words and the original keyword
    const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'with', 'by', 'about', 'as']);
    const keywordWords = keyword.toLowerCase().split(/\s+/);
    
    const relatedWords = words.filter(word => 
      word.length > 3 && 
      !commonWords.has(word) && 
      !keywordWords.includes(word)
    );

    // Count word frequency
    const wordCount = new Map<string, number>();
    relatedWords.forEach(word => {
      wordCount.set(word, (wordCount.get(word) || 0) + 1);
    });

    // Sort by frequency and return top 5
    return Array.from(wordCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word]) => word);
  } catch (error) {
    console.error('Error getting related keywords:', error);
    return [];
  }
} 