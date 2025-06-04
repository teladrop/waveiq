import { NextResponse } from 'next/server';
import { getChannelVideos } from '@/lib/youtube';
import { getCurrentUser } from '@/lib/auth';
import { createCompetitor } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { channelUrl } = await request.json();
    if (!channelUrl) {
      return NextResponse.json(
        { error: 'Missing channel URL' },
        { status: 400 }
      );
    }

    // Get channel videos
    const videos = await getChannelVideos(channelUrl);

    // Save to database
    await createCompetitor({
      user_id: user.id,
      channel_url: channelUrl,
      top_videos: videos,
    });

    return NextResponse.json({ videos });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
} 