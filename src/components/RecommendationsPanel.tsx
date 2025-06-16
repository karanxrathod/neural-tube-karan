
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lightbulb, Zap, Target, Copy, Sparkles, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

interface RecommendationsPanelProps {
  data: {
    title: string;
    tags: string[];
    seoScore: number;
    engagementRate: number;
  };
}

export const RecommendationsPanel: React.FC<RecommendationsPanelProps> = ({ data }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const titleSuggestions = [
    "🚀 Build Amazing React Apps in 2024 | Complete Beginner to Pro Tutorial",
    "React Mastery 2024: Everything You Need to Know (Step-by-Step Guide)",
    "The Ultimate React Tutorial That Will Change How You Code Forever",
    "React in 15 Minutes: From Zero to Hero | Modern Development Guide"
  ];

  const tagSuggestions = [
    "reactjs", "javascript", "webdevelopment", "coding", "tutorial", 
    "programming", "frontend", "nodejs", "hooks", "jsx", "es6", 
    "typescript", "webdev", "beginners", "2024"
  ];

  const descriptionSuggestions = [
    "Master React development with this comprehensive tutorial covering hooks, state management, and modern best practices. Perfect for beginners and intermediate developers looking to level up their skills.",
    "Learn React from scratch with hands-on examples, real-world projects, and industry best practices. This complete guide includes everything you need to become a React developer in 2024.",
  ];

  const thumbnailTips = [
    "Use high contrast colors (yellow/red backgrounds work well)",
    "Include emotional facial expressions",
    "Add text overlay with key benefit (e.g., 'In 15 Minutes')",
    "Use the rule of thirds for text placement",
    "Include relevant icons or symbols",
    "Make text readable on mobile (minimum 30px font size)"
  ];

  const getRecommendationPriority = (type: string) => {
    switch (type) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Priority Recommendations */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-orange-100">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Zap className="w-6 h-6 mr-2 text-red-600" />
            Priority Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start p-3 bg-white/60 rounded-lg">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">Optimize Title Length</div>
                <div className="text-sm text-gray-600">Your title is {data.title.length} characters. Aim for 30-60 characters for better visibility.</div>
                <Badge className="mt-2 bg-red-100 text-red-700 border-red-200">High Priority</Badge>
              </div>
            </div>
            
            <div className="flex items-start p-3 bg-white/60 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3"></div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">Improve Engagement Rate</div>
                <div className="text-sm text-gray-600">Your {data.engagementRate}% engagement can be improved with better CTAs and community interaction.</div>
                <Badge className="mt-2 bg-yellow-100 text-yellow-700 border-yellow-200">Medium Priority</Badge>
              </div>
            </div>
            
            <div className="flex items-start p-3 bg-white/60 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">Add More Relevant Tags</div>
                <div className="text-sm text-gray-600">You have {data.tags.length} tags. Consider adding 2-3 more specific tags for better discoverability.</div>
                <Badge className="mt-2 bg-green-100 text-green-700 border-green-200">Low Priority</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Title Suggestions */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Lightbulb className="w-5 h-5 mr-2 text-blue-600" />
              AI Title Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {titleSuggestions.map((title, index) => (
                <div key={index} className="p-3 bg-white/60 rounded-lg hover:bg-white/80 transition-colors">
                  <div className="text-sm text-gray-800 mb-2">{title}</div>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="text-xs">
                      {title.length} chars
                    </Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(title)}
                      className="h-6 text-xs"
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      Copy
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tag Suggestions */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Target className="w-5 h-5 mr-2 text-green-600" />
              Recommended Tags
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {tagSuggestions.map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-green-200 transition-colors bg-white/60"
                  onClick={() => copyToClipboard(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="text-xs text-green-600 bg-green-200/50 rounded-lg p-3">
              <strong>Pro Tip:</strong> Mix broad tags (react, javascript) with specific ones (react-hooks, jsx) for better reach
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Description Suggestions */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
            Enhanced Descriptions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {descriptionSuggestions.map((desc, index) => (
              <div key={index} className="p-4 bg-white/60 rounded-lg">
                <div className="text-sm text-gray-800 mb-3">{desc}</div>
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="text-xs">
                    {desc.length} characters
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(desc)}
                    className="h-6 text-xs"
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Copy
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Thumbnail Optimization */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-orange-600" />
            Thumbnail Optimization Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {thumbnailTips.map((tip, index) => (
              <div key={index} className="flex items-start p-3 bg-white/60 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div className="text-sm text-gray-700">{tip}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-xs text-orange-600 bg-orange-200/50 rounded-lg p-3">
            <strong>A/B Test:</strong> Create 2-3 thumbnail variations and test which performs better
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
