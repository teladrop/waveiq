import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

const youtube = google.youtube('v3');

export async function getKeywordMetrics(keyword: string) {
  try {
    const response = await youtube.search.list({
      part: ['snippet'],
      q: keyword,
      type: ['video'],
      maxResults: 50,
      key: process.env.YOUTUBE_API_KEY,
    });

    const videos = response.data.items || [];
    const videoIds = videos.map(video => video.id?.videoId).filter(Boolean) as string[];

    let totalViews = 0;
    let avgViews = 0;
    let competition = videos.length;

    if (videoIds.length > 0) {
      const statsResponse = await youtube.videos.list({
        part: ['statistics'],
        id: videoIds,
        key: process.env.YOUTUBE_API_KEY,
      });
      const stats = statsResponse.data.items || [];
      totalViews = stats.reduce((sum, video) => sum + parseInt(video.statistics?.viewCount || '0'), 0);
      avgViews = totalViews / stats.length;
    }

    // Calculate niche score (0-100)
    const nicheScore = Math.min(100, Math.max(0, 
      (avgViews / 10000) * 40 + // View factor
      (competition / 100) * 30 + // Competition factor
      (videos[0]?.snippet?.publishedAt ? 30 : 0) // Recency factor
    ));

    // Calculate difficulty (easy, medium, hard)
    let difficulty: 'easy' | 'medium' | 'hard';
    if (competition < 10 && avgViews < 1000) {
      difficulty = 'easy';
    } else if (competition < 50 && avgViews < 10000) {
      difficulty = 'medium';
    } else {
      difficulty = 'hard';
    }

    return {
      keyword,
      volume: competition,
      competition: competition,
      niche_score: Math.round(nicheScore),
      difficulty,
    };
  } catch (error) {
    console.error('Error fetching keyword metrics:', error);
    throw error;
  }
}

export async function getChannelVideos(channelUrl: string) {
  try {
    // Extract channel ID from URL
    const channelId = channelUrl.split('/').pop();
    
    const response = await youtube.search.list({
      part: ['snippet'],
      channelId,
      order: 'viewCount',
      type: ['video'],
      maxResults: 10,
      key: process.env.YOUTUBE_API_KEY,
    });

    const videos = await Promise.all(
      (response.data.items || []).map(async (video) => {
        const videoDetails = await youtube.videos.list({
          part: ['statistics', 'snippet'],
          id: [video.id?.videoId || ''],
          key: process.env.YOUTUBE_API_KEY,
        });

        return {
          title: video.snippet?.title,
          views: parseInt(videoDetails.data.items?.[0]?.statistics?.viewCount || '0'),
          tags: videoDetails.data.items?.[0]?.snippet?.tags || [],
        };
      })
    );

    return videos;
  } catch (error) {
    console.error('Error fetching channel videos:', error);
    throw error;
  }
}

export async function getBestUploadTimes(channelUrl: string) {
  try {
    const channelId = channelUrl.split('/').pop();
    
    const response = await youtube.search.list({
      part: ['snippet'],
      channelId,
      type: ['video'],
      maxResults: 50,
      key: process.env.YOUTUBE_API_KEY,
    });

    const videos = response.data.items || [];
    const uploadTimes = videos.map(video => {
      const date = new Date(video.snippet?.publishedAt || '');
      return {
        day: date.getDay(),
        hour: date.getHours(),
      };
    });

    // Create heatmap data
    const heatmap = Array(7).fill(0).map(() => Array(24).fill(0));
    
    uploadTimes.forEach(({ day, hour }) => {
      heatmap[day][hour]++;
    });

    return heatmap;
  } catch (error) {
    console.error('Error fetching upload times:', error);
    throw error;
  }
} 