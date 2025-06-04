import { db } from './firebase';
import { collection, query, where, orderBy, limit, getDocs, Timestamp } from 'firebase/firestore';
import { auth } from './firebase';

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
    const activitiesRef = collection(db, 'activities');
    const q = query(
      activitiesRef,
      where('userId', '==', userId),
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp.toDate(),
    })) as Activity[];
  } catch (error) {
    console.error('Error fetching activities:', error);
    return [];
  }
}

// Trending Topics Functions
export async function getTrendingTopics(category?: string): Promise<TrendingTopic[]> {
  try {
    const topicsRef = collection(db, 'trending_topics');
    let q = query(
      topicsRef,
      orderBy('searches', 'desc'),
      limit(5)
    );
    
    if (category) {
      q = query(
        topicsRef,
        where('category', '==', category),
        orderBy('searches', 'desc'),
        limit(5)
      );
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      lastUpdated: doc.data().lastUpdated.toDate(),
    })) as TrendingTopic[];
  } catch (error) {
    console.error('Error fetching trending topics:', error);
    return [];
  }
}

// User Stats Functions
export async function getUserStats(userId: string): Promise<UserStats | null> {
  try {
    const statsRef = collection(db, 'user_stats');
    const q = query(
      statsRef,
      where('userId', '==', userId),
      limit(1)
    );
    
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    
    const data = snapshot.docs[0].data();
    return {
      ...data,
      lastUpdated: data.lastUpdated.toDate(),
    } as UserStats;
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