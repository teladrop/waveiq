import { NextResponse } from 'next/server';
import { generateShortsContent } from '@/lib/ai';
import { getCurrentUser } from '@/lib/auth-server';
import { createShort } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { videoLink } = await request.json();
    if (!videoLink) {
      return NextResponse.json(
        { error: 'Missing video link' },
        { status: 400 }
      );
    }

    // Generate shorts content
    const content = await generateShortsContent(videoLink);

    // Save to database
    await createShort({
      user_id: user.id,
      video_link: videoLink,
      hooks: content.hooks,
      subtitles: content.subtitles,
      hashtags: content.hashtags,
    });

    return NextResponse.json(content);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
} 