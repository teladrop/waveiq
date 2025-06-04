import { NextResponse } from 'next/server';
import { generateThumbnail } from '@/lib/thumbnails';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth-server';

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const options = await request.json();
    if (!options.prompt) {
      return NextResponse.json(
        { error: 'Missing prompt' },
        { status: 400 }
      );
    }

    // Generate thumbnail
    const thumbnail = await generateThumbnail(options);

    // Save to database
    const savedThumbnail = await prisma.thumbnail.create({
      data: {
        userId: user.id,
        prompt: thumbnail.prompt,
        negativePrompt: thumbnail.negativePrompt,
        imageUrl: thumbnail.url,
        width: thumbnail.width,
        height: thumbnail.height,
      }
    });

    return NextResponse.json({
      ...thumbnail,
      id: savedThumbnail.id
    });
  } catch (error: any) {
    console.error('Thumbnail generation error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
} 