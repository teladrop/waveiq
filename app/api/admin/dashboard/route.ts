import { NextResponse } from 'next/server';
import { getDocuments } from '@/lib/db';

export async function GET(request: Request) {
  try {
    // Get all users
    const users = await getDocuments('users');

    // Get all keywords
    const keywords = await getDocuments('keywords');

    // Get all content generations
    const contentGen = await getDocuments('content_gen');

    // Get all courses
    const courses = await getDocuments('courses');

    // Get all affiliate links
    const affiliateLinks = await getDocuments('affiliate_links');

    return NextResponse.json({
      users,
      keywords,
      contentGen,
      courses,
      affiliateLinks,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
} 