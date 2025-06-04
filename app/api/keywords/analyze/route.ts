import { NextResponse } from 'next/server';
import { getKeywordMetrics } from '@/lib/youtube';
import { getCurrentUser } from '@/lib/auth';
import { createKeyword } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { keyword } = await request.json();
    if (!keyword) {
      return NextResponse.json(
        { error: 'Missing keyword' },
        { status: 400 }
      );
    }

    // Get keyword metrics
    const metrics = await getKeywordMetrics(keyword);

    // Save to database
    await createKeyword({
      user_id: user.id,
      keyword,
      volume: metrics.volume,
      competition: metrics.competition,
      niche_score: metrics.niche_score,
      difficulty: metrics.difficulty,
    });

    return NextResponse.json(metrics);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
} 