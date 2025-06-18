
const YOUTUBE_API_KEY = 'YOUR_YOUTUBE_API_KEY'; // Users will need to add their API key

export interface YouTubeVideoData {
  title: string;
  description: string;
  views: number;
  likes: number;
  comments: number;
  publishedAt: string;
  duration: string;
  tags: string[];
  channelTitle: string;
  thumbnailUrl: string;
}

// Extract video ID from YouTube URL
export const extractVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

// Fetch video data from YouTube API
export const fetchVideoData = async (videoUrl: string): Promise<YouTubeVideoData> => {
  const videoId = extractVideoId(videoUrl);
  
  if (!videoId) {
    throw new Error('Invalid YouTube URL');
  }

  if (!YOUTUBE_API_KEY || YOUTUBE_API_KEY === 'YOUR_YOUTUBE_API_KEY') {
    // Return mock data with a warning if no API key is provided
    console.warn('YouTube API key not configured. Using mock data.');
    return getMockDataForUrl(videoUrl);
  }

  try {
    // Fetch video details
    const videoResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,statistics,contentDetails&key=${YOUTUBE_API_KEY}`
    );
    
    if (!videoResponse.ok) {
      throw new Error(`YouTube API error: ${videoResponse.status}`);
    }
    
    const videoData = await videoResponse.json();
    
    if (!videoData.items || videoData.items.length === 0) {
      throw new Error('Video not found');
    }
    
    const video = videoData.items[0];
    const snippet = video.snippet;
    const statistics = video.statistics;
    const contentDetails = video.contentDetails;
    
    return {
      title: snippet.title,
      description: snippet.description,
      views: parseInt(statistics.viewCount) || 0,
      likes: parseInt(statistics.likeCount) || 0,
      comments: parseInt(statistics.commentCount) || 0,
      publishedAt: snippet.publishedAt,
      duration: contentDetails.duration,
      tags: snippet.tags || [],
      channelTitle: snippet.channelTitle,
      thumbnailUrl: snippet.thumbnails.maxres?.url || snippet.thumbnails.high?.url || snippet.thumbnails.default?.url
    };
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    throw error;
  }
};

// Enhanced mock data based on URL patterns for demo purposes
const getMockDataForUrl = (url: string): YouTubeVideoData => {
  // Try to extract some info from URL for more realistic mock data
  const videoId = extractVideoId(url) || 'unknown';
  
  // Different mock data based on video ID patterns
  const mockDataSets = [
    {
      title: "How to Build React Apps in 2024 | Complete Tutorial",
      description: "Learn React development with modern best practices, hooks, and performance optimization techniques. This comprehensive guide covers everything you need to know about building scalable React applications in 2024.",
      views: 125430,
      likes: 8420,
      comments: 342,
      channelTitle: "CodeMaster Pro"
    },
    {
      title: "JavaScript ES6+ Features You Must Know",
      description: "Master the essential ES6+ features that every JavaScript developer should know. Covering arrow functions, destructuring, promises, async/await, and more.",
      views: 89200,
      likes: 5600,
      comments: 278,
      channelTitle: "JS Academy"
    },
    {
      title: "CSS Grid vs Flexbox: When to Use Which?",
      description: "Understanding the differences between CSS Grid and Flexbox, and when to use each layout method for optimal web design results.",
      views: 67800,
      likes: 4200,
      comments: 189,
      channelTitle: "Design Guru"
    }
  ];
  
  // Select mock data based on video ID hash
  const index = videoId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % mockDataSets.length;
  const selectedMock = mockDataSets[index];
  
  return {
    ...selectedMock,
    publishedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    duration: "PT15M30S",
    tags: ["javascript", "programming", "tutorial", "webdev", "coding"],
    thumbnailUrl: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
  };
};

// Calculate derived metrics
export const calculateEngagementMetrics = (data: YouTubeVideoData) => {
  const engagementRate = ((data.likes + data.comments) / data.views) * 100;
  const sentimentScore = 0.75 + (Math.random() * 0.25); // Mock sentiment analysis
  const seoScore = Math.min(100, 
    (data.title.length >= 30 && data.title.length <= 60 ? 25 : 15) +
    (data.description.length >= 100 ? 25 : 15) +
    (data.tags.length >= 5 ? 25 : 15) +
    (data.title.toLowerCase().includes('how') || data.title.toLowerCase().includes('tutorial') ? 25 : 20)
  );
  const clickbaitScore = Math.random() * 100; // Mock clickbait analysis
  
  return {
    ...data,
    engagementRate: Math.round(engagementRate * 100) / 100,
    sentimentScore: Math.round(sentimentScore * 100) / 100,
    seoScore: Math.round(seoScore),
    clickbaitScore: Math.round(clickbaitScore)
  };
};
