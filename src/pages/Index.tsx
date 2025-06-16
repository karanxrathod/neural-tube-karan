
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { VideoAnalysis } from '@/components/VideoAnalysis';
import { EngagementMetrics } from '@/components/EngagementMetrics';
import { SEOAnalysis } from '@/components/SEOAnalysis';
import { RecommendationsPanel } from '@/components/RecommendationsPanel';
import { TrendChart } from '@/components/TrendChart';
import { Search, Youtube, TrendingUp, Brain, Target } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);

  const handleAnalyze = async () => {
    if (!videoUrl) {
      toast.error('Please enter a YouTube URL');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call and analysis
    setTimeout(() => {
      const mockData = {
        title: "How to Build Amazing React Apps in 2024 | Complete Tutorial",
        description: "Learn React development with modern best practices, hooks, and performance optimization techniques. This comprehensive guide covers everything you need to know about building scalable React applications.",
        views: 125430,
        likes: 8420,
        comments: 342,
        publishedAt: "2024-01-15",
        duration: "PT15M30S",
        tags: ["react", "javascript", "tutorial", "web development", "programming"],
        channelTitle: "CodeMaster Pro",
        thumbnailUrl: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        engagementRate: 7.1,
        sentimentScore: 0.85,
        seoScore: 78,
        clickbaitScore: 45
      };
      
      setAnalysisData(mockData);
      setIsAnalyzing(false);
      toast.success('Analysis complete!');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Youtube className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  YouTube Content Analyzer
                </h1>
                <p className="text-sm text-gray-600">AI-powered insights for better content</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-purple-100 text-purple-700">
              <Brain className="w-3 h-3 mr-1" />
              AI Powered
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* URL Input Section */}
        <Card className="mb-8 border-0 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Analyze Your YouTube Content
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Enter a YouTube video or channel URL to get AI-powered insights and recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="https://youtube.com/watch?v=..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="pl-10 py-6 text-lg border-2 border-gray-200 focus:border-blue-500 transition-colors"
                />
              </div>
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Analyze
                  </>
                )}
              </Button>
            </div>
            
            {isAnalyzing && (
              <div className="mt-6 max-w-2xl mx-auto">
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600">Analyzing your content...</p>
                </div>
                <Progress value={65} className="h-2" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Extracting metadata
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    NLP analysis
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                    Calculating metrics
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
                    Generating insights
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {analysisData && !isAnalyzing && (
          <div className="space-y-8">
            {/* Video Overview */}
            <VideoAnalysis data={analysisData} />
            
            {/* Main Analysis Tabs */}
            <Tabs defaultValue="engagement" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm">
                <TabsTrigger value="engagement" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
                  Engagement
                </TabsTrigger>
                <TabsTrigger value="seo" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
                  SEO Analysis
                </TabsTrigger>
                <TabsTrigger value="trends" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
                  Trends
                </TabsTrigger>
                <TabsTrigger value="recommendations" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
                  AI Recommendations
                </TabsTrigger>
              </TabsList>

              <TabsContent value="engagement" className="mt-6">
                <EngagementMetrics data={analysisData} />
              </TabsContent>

              <TabsContent value="seo" className="mt-6">
                <SEOAnalysis data={analysisData} />
              </TabsContent>

              <TabsContent value="trends" className="mt-6">
                <TrendChart data={analysisData} />
              </TabsContent>

              <TabsContent value="recommendations" className="mt-6">
                <RecommendationsPanel data={analysisData} />
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Features Preview */}
        {!analysisData && !isAnalyzing && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <CardHeader>
                <TrendingUp className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle>Engagement Analysis</CardTitle>
                <CardDescription>
                  Track likes, comments, views and calculate engagement rates with detailed metrics
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
        )}
      </div>
    </div>
  );
};

export default Index;
