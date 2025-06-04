import { prisma } from './db';

// Types
export interface Activity {
  id: string;
  action: string;
  description: string;
  timestamp: Date;
  type: 'ai-generation' | 'keyword-search' | 'shorts-creation' | 'competitor-analysis' | 'upload-optimization';
  userId: string;
}

export interface TrendingTopic {
  id: string;
  topic: string;
  growth: number;
  searches: number;
  difficulty: 'Low' | 'Medium' | 'High';
  category: string;
  lastUpdated: Date;
}

export interface UserStats {
  totalKeywords: number;
  totalVideos: number;
  totalViews: number;
  averageEngagement: number;
  lastUpdated: Date;
  fullName: string;
}

// Activity Functions
export async function getRecentActivities(userId: string, limitCount: number = 5): Promise<Activity[]> {
  try {
    const activities = await prisma.activity.findMany({
      where: { userId },
      orderBy: { timestamp: 'desc' },
      take: limitCount
    });

    return activities;
  } catch (error) {
    console.error('Error fetching activities:', error);
    return [];
  }
}

// Trending Topics Functions
export async function getTrendingTopics(category?: string): Promise<TrendingTopic[]> {
  try {
    const topics = await prisma.trendingTopic.findMany({
      where: category ? { category } : undefined,
      orderBy: { searches: 'desc' },
      take: 5
    });

    return topics;
  } catch (error) {
    console.error('Error fetching trending topics:', error);
    return [];
  }
}

// User Stats Functions
export async function getUserStats(userId: string): Promise<UserStats | null> {
  try {
    const stats = await prisma.userStats.findUnique({
      where: { userId }
    });

    return stats;
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return null;
  }
}

// YouTube Data Functions
export async function getYouTubeChannelStats(channelId: string) {
  try {
    const response = await fetch(`/api/youtube/channel-stats?channelId=${channelId}`);
    if (!response.ok) throw new Error('Failed to fetch channel stats');
    return await response.json();
  } catch (error) {
    console.error('Error fetching YouTube channel stats:', error);
    return null;
  }
}

// Keyword Data Functions
export async function getKeywordTrends(keyword: string) {
  try {
    const response = await fetch(`/api/keywords/trends?keyword=${encodeURIComponent(keyword)}`);
    if (!response.ok) throw new Error('Failed to fetch keyword trends');
    return await response.json();
  } catch (error) {
    console.error('Error fetching keyword trends:', error);
    return null;
  }
}

// Competitor Analysis Functions
export async function getCompetitorAnalysis(channelId: string) {
  try {
    const response = await fetch(`/api/competitors/analysis?channelId=${channelId}`);
    if (!response.ok) throw new Error('Failed to fetch competitor analysis');
    return await response.json();
  } catch (error) {
    console.error('Error fetching competitor analysis:', error);
    return null;
  }
}

// Helper function to format numbers
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

// Helper function to format time ago
export function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + ' years ago';
  
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + ' months ago';
  
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + ' days ago';
  
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + ' hours ago';
  
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + ' minutes ago';
  
  return Math.floor(seconds) + ' seconds ago';
} 