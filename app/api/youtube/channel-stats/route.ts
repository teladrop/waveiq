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

    // Get channel statistics
    const channelResponse = await youtube.channels.list({
      key: apiKey,
      part: ['statistics', 'snippet'],
      id: [channelId],
    });

    const channel = channelResponse.data.items?.[0];
    if (!channel) {
      return NextResponse.json(
        { error: 'Channel not found' },
        { status: 404 }
      );
    }

    // Get recent videos
    const videosResponse = await youtube.search.list({
      key: apiKey,
      part: ['snippet'],
      channelId: channelId,
      order: 'date',
      type: ['video'],
      maxResults: 5,
    });

    const videos = videosResponse.data.items?.map(item => ({
      id: item.id?.videoId,
      title: item.snippet?.title,
      publishedAt: item.snippet?.publishedAt,
      thumbnailUrl: item.snippet?.thumbnails?.default?.url,
    }));

    return NextResponse.json({
      channel: {
        id: channel.id,
        title: channel.snippet?.title,
        description: channel.snippet?.description,
        thumbnailUrl: channel.snippet?.thumbnails?.default?.url,
        statistics: channel.statistics,
      },
      recentVideos: videos,
    });
  } catch (error) {
    console.error('Error fetching YouTube channel stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch channel statistics' },
      { status: 500 }
    );
  }
} 