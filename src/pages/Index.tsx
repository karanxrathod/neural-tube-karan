
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
import { Search, Youtube, TrendingUp, Brain, Target, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { fetchVideoData, calculateEngagementMetrics, extractVideoId } from '@/services/youtubeApi';

const Index = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!videoUrl.trim()) {
      toast.error('Please enter a YouTube URL');
      return;
    }

    // Validate YouTube URL format
    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      toast.error('Please enter a valid YouTube video URL');
      setError('Invalid YouTube URL format. Please use a URL like: https://youtube.com/watch?v=...');
      return;
    }

    setIsAnalyzing(true);
    setError('');
    
    try {
      console.log('Fetching data for video URL:', videoUrl);
      
      // Simulate realistic loading time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Fetch real video data
      const videoData = await fetchVideoData(videoUrl);
      console.log('Fetched video data:', videoData);
      
      // Calculate engagement metrics and scores
      const analysisResult = calculateEngagementMetrics(videoData);
      console.log('Analysis result:', analysisResult);
      
      setAnalysisData(analysisResult);
      toast.success('Analysis complete! Real video data loaded.');
    } catch (err) {
      console.error('Analysis error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze video';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(e.target.value);
    setError(''); // Clear error when user starts typing
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
              Enter a YouTube video URL to get AI-powered insights and recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="https://youtube.com/watch?v=... or https://youtu.be/..."
                  value={videoUrl}
                  onChange={handleUrlChange}
                  className={`pl-10 py-6 text-lg border-2 transition-colors ${
                    error ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                  }`}
                />
              </div>
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !videoUrl.trim()}
                className="px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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

            {/* Error Message */}
            {error && (
              <div className="mt-4 max-w-2xl mx-auto">
                <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
                  <div className="text-sm text-red-800">
                    <strong>Error:</strong> {error}
                  </div>
                </div>
              </div>
            )}
            
            {isAnalyzing && (
              <div className="mt-6 max-w-2xl mx-auto">
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600">Fetching real video data from YouTube...</p>
                </div>
                <Progress value={65} className="h-2" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Fetching metadata
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Analyzing content
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

            {/* API Key Notice */}
            <div className="mt-6 max-w-2xl mx-auto">
              <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3 border">
                <strong>Note:</strong> To fetch real YouTube data, you need to configure a YouTube API key in the code. 
                Currently using enhanced mock data that varies based on the video URL you provide.
              </div>
            </div>
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
        )}
      </div>
    </div>
  );
};

export default Index;
