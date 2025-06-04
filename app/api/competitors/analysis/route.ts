import { NextResponse } from 'next/server';
import { google } from 'googleapis';

const youtube = google.youtube('v3');

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const channelId = searchParams.get('channelId');

    if (!channelId) {
      return NextResponse.json(
        { error: 'Channel ID is required' },
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

    // Get channel information
    const channelResponse = await youtube.channels.list({
      key: apiKey,
      part: ['statistics', 'snippet', 'contentDetails'],
      id: [channelId],
    });

    const channel = channelResponse.data.items?.[0];
    if (!channel) {
      return NextResponse.json(
        { error: 'Channel not found' },
        { status: 404 }
      );
    }

    // Get channel's recent videos
    const uploadsPlaylistId = channel.contentDetails?.relatedPlaylists?.uploads;
    const videosResponse = await youtube.playlistItems.list({
      key: apiKey,
      part: ['snippet'],
      playlistId: uploadsPlaylistId,
      maxResults: 10,
    });

    const videoIds = videosResponse.data.items?.map(item => item.snippet?.resourceId?.videoId).filter(Boolean) as string[];
    const videoStatsResponse = await youtube.videos.list({
      key: apiKey,
      part: ['statistics', 'snippet', 'contentDetails'],
      id: videoIds,
    });

    const videos = videoStatsResponse.data.items?.map(video => ({
      id: video.id,
      title: video.snippet?.title,
      publishedAt: video.snippet?.publishedAt,
      viewCount: parseInt(video.statistics?.viewCount || '0'),
      likeCount: parseInt(video.statistics?.likeCount || '0'),
      commentCount: parseInt(video.statistics?.commentCount || '0'),
      duration: video.contentDetails?.duration,
      tags: video.snippet?.tags || [],
    }));

    // Calculate channel metrics
    const totalViews = videos?.reduce((sum, video) => sum + video.viewCount, 0) || 0;
    const totalLikes = videos?.reduce((sum, video) => sum + video.likeCount, 0) || 0;
    const totalComments = videos?.reduce((sum, video) => sum + video.commentCount, 0) || 0;
    const averageEngagement = videos?.length ? (totalLikes + totalComments) / totalViews * 100 : 0;

    // Get video categories
    const categories = new Map<string, number>();
    videos?.forEach(video => {
      video.tags?.forEach(tag => {
        categories.set(tag, (categories.get(tag) || 0) + 1);
      });
    });

    // Get posting frequency
    const publishDates = videos?.map(video => new Date(video.publishedAt || '').getTime()) || [];
    const averageDaysBetweenVideos = publishDates.length > 1
      ? (Math.max(...publishDates) - Math.min(...publishDates)) / (1000 * 60 * 60 * 24) / (publishDates.length - 1)
      : 0;

    // Get best performing videos
    const bestVideos = [...(videos || [])]
      .sort((a, b) => b.viewCount - a.viewCount)
      .slice(0, 5);

    return NextResponse.json({
      channel: {
        id: channel.id,
        title: channel.snippet?.title,
        description: channel.snippet?.description,
        thumbnailUrl: channel.snippet?.thumbnails?.default?.url,
        statistics: channel.statistics,
      },
      metrics: {
        totalViews,
        totalLikes,
        totalComments,
        averageEngagement,
        videoCount: videos?.length || 0,
        averageDaysBetweenVideos,
      },
      topCategories: Array.from(categories.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([category, count]) => ({ category, count })),
      bestVideos,
      recentVideos: videos,
    });
  } catch (error) {
    console.error('Error fetching competitor analysis:', error);
    return NextResponse.json(
      { error: 'Failed to fetch competitor analysis' },
      { status: 500 }
    );
  }
} 