
import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Target, Brain } from 'lucide-react';

export const FeaturesPreview: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
        <CardHeader>
          <TrendingUp className="w-8 h-8 text-blue-600 mb-2" />
          <CardTitle>Real Data Analysis</CardTitle>
          <CardDescription>
            Fetches actual video data from YouTube API including views, likes, comments and metadata
          </CardDescription>
        </CardHeader>
      </Card>
      
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
        <CardHeader>
          <Target className="w-8 h-8 text-purple-600 mb-2" />
          <CardTitle>SEO Optimization</CardTitle>
          <CardDescription>
            Analyze titles, descriptions and tags for better search visibility and ranking
          </CardDescription>
        </CardHeader>
      </Card>
      
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
        <CardHeader>
          <Brain className="w-8 h-8 text-pink-600 mb-2" />
          <CardTitle>AI Recommendations</CardTitle>
          <CardDescription>
            Get personalized suggestions for titles, tags and content optimization
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};
