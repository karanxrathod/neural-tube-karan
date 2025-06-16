
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Minus, Target } from 'lucide-react';

interface EngagementMetricsProps {
  data: {
    views: number;
    likes: number;
    comments: number;
    engagementRate: number;
  };
}

export const EngagementMetrics: React.FC<EngagementMetricsProps> = ({ data }) => {
  const likeRatio = (data.likes / data.views) * 100;
  const commentRatio = (data.comments / data.views) * 100;
  
  // Mock benchmark data
  const benchmarks = {
    engagementRate: 5.2,
    likeRatio: 3.8,
    commentRatio: 0.5
  };

  const getComparisonIcon = (current: number, benchmark: number) => {
    if (current > benchmark * 1.1) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (current < benchmark * 0.9) return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-yellow-600" />;
  };

  const getComparisonText = (current: number, benchmark: number) => {
    const percentage = ((current - benchmark) / benchmark * 100).toFixed(1);
    if (current > benchmark * 1.1) return `+${percentage}% above average`;
    if (current < benchmark * 0.9) return `${percentage}% below average`;
    return 'Average performance';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Engagement Rate Card */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Target className="w-5 h-5 mr-2 text-blue-600" />
            Engagement Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-3xl font-bold text-blue-900">{data.engagementRate}%</span>
                {getComparisonIcon(data.engagementRate, benchmarks.engagementRate)}
              </div>
              <Progress value={data.engagementRate * 10} className="h-3" />
            </div>
            
            <div className="text-sm text-blue-700">
              {getComparisonText(data.engagementRate, benchmarks.engagementRate)}
            </div>
            
            <div className="text-xs text-blue-600 bg-blue-200/50 rounded-lg p-2">
              <strong>Calculation:</strong> (Likes + Comments) ÷ Views × 100
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Like Ratio Card */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
            Like Ratio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-3xl font-bold text-green-900">{likeRatio.toFixed(2)}%</span>
                {getComparisonIcon(likeRatio, benchmarks.likeRatio)}
              </div>
              <Progress value={likeRatio * 5} className="h-3" />
            </div>
            
            <div className="text-sm text-green-700">
              {getComparisonText(likeRatio, benchmarks.likeRatio)}
            </div>
            
            <div className="text-xs text-green-600 bg-green-200/50 rounded-lg p-2">
              <strong>Industry Average:</strong> 3-5% is considered good
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comment Ratio Card */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Target className="w-5 h-5 mr-2 text-purple-600" />
            Comment Ratio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-3xl font-bold text-purple-900">{commentRatio.toFixed(3)}%</span>
                {getComparisonIcon(commentRatio, benchmarks.commentRatio)}
              </div>
              <Progress value={commentRatio * 50} className="h-3" />
            </div>
            
            <div className="text-sm text-purple-700">
              {getComparisonText(commentRatio, benchmarks.commentRatio)}
            </div>
            
            <div className="text-xs text-purple-600 bg-purple-200/50 rounded-lg p-2">
              <strong>Target:</strong> 0.5-1% indicates strong engagement
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Engagement Breakdown */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100 md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle className="text-lg">Engagement Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-900 mb-2">{((data.likes / (data.likes + data.comments)) * 100).toFixed(1)}%</div>
              <div className="text-sm text-orange-700">Likes vs Comments</div>
              <div className="text-xs text-orange-600 mt-1">Higher like ratio suggests broader appeal</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-900 mb-2">{(data.views / 1000).toFixed(1)}K</div>
              <div className="text-sm text-orange-700">Views per Day</div>
              <div className="text-xs text-orange-600 mt-1">Estimated daily view velocity</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-900 mb-2">{(data.comments / data.likes * 100).toFixed(1)}</div>
              <div className="text-sm text-orange-700">Comment:Like Ratio</div>
              <div className="text-xs text-orange-600 mt-1">Higher ratio = more discussion</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
