import { NextResponse } from 'next/server';
import { generateContent } from '@/lib/ai';
import { getCurrentUser } from '@/lib/auth';
import { createContent } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { keyword, tone } = await request.json();
    if (!keyword || !tone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate content
    const content = await generateContent(keyword, tone);

    // Save to database
    await createContent({
      user_id: user.id,
      keyword,
      titles: content.titles,
      description: content.description,
      tags: content.tags,
    });

    return NextResponse.json(content);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
} 