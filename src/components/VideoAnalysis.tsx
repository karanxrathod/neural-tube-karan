
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, ThumbsUp, MessageCircle, Calendar, Clock, User } from 'lucide-react';

interface VideoAnalysisProps {
  data: {
    title: string;
    description: string;
    views: number;
    likes: number;
    comments: number;
    publishedAt: string;
    duration: string;
    channelTitle: string;
    thumbnailUrl: string;
    engagementRate: number;
    sentimentScore: number;
    seoScore: number;
    clickbaitScore: number;
  };
}

export const VideoAnalysis: React.FC<VideoAnalysisProps> = ({ data }) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatDuration = (duration: string) => {
    // Convert PT15M30S to 15:30
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return duration;
    
    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;
    const seconds = match[3] ? parseInt(match[3]) : 0;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Video Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Info */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{data.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-3">{data.description}</p>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {data.channelTitle}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(data.publishedAt).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {formatDuration(data.duration)}
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <Eye className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-900">{formatNumber(data.views)}</div>
                <div className="text-sm text-blue-600">Views</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <ThumbsUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-900">{formatNumber(data.likes)}</div>
                <div className="text-sm text-green-600">Likes</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <MessageCircle className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-900">{formatNumber(data.comments)}</div>
                <div className="text-sm text-purple-600">Comments</div>
              </div>
            </div>
          </div>

          {/* Scores */}
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Performance Scores</h4>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Engagement Rate</span>
                  <Badge className={`${getScoreColor(data.engagementRate * 10)} border-0`}>
                    {data.engagementRate}%
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">SEO Score</span>
                  <Badge className={`${getScoreColor(data.seoScore)} border-0`}>
                    {data.seoScore}/100
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Sentiment</span>
                  <Badge className={`${getScoreColor(data.sentimentScore * 100)} border-0`}>
                    {(data.sentimentScore * 100).toFixed(0)}%
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Clickbait Risk</span>
                  <Badge className={`${data.clickbaitScore > 70 ? 'text-red-600 bg-red-100' : data.clickbaitScore > 40 ? 'text-yellow-600 bg-yellow-100' : 'text-green-600 bg-green-100'} border-0`}>
                    {data.clickbaitScore}%
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
