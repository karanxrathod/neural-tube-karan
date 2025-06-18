
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoAnalysis } from '@/components/VideoAnalysis';
import { EngagementMetrics } from '@/components/EngagementMetrics';
import { SEOAnalysis } from '@/components/SEOAnalysis';
import { RecommendationsPanel } from '@/components/RecommendationsPanel';
import { TrendChart } from '@/components/TrendChart';
import { DownloadPanel } from '@/components/DownloadPanel';
import { ScriptPanel } from '@/components/ScriptPanel';

interface AnalysisResultsProps {
  analysisData: any;
  videoUrl?: string;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analysisData, videoUrl = '' }) => {
  return (
    <div className="space-y-8">
      {/* Video Overview */}
      <VideoAnalysis data={analysisData} />
      
      {/* Main Analysis Tabs */}
      <Tabs defaultValue="engagement" className="w-full">
        <TabsList className="grid w-full grid-cols-6 bg-white/80 backdrop-blur-sm">
          <TabsTrigger value="engagement" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white text-xs">
            Engagement
          </TabsTrigger>
          <TabsTrigger value="seo" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white text-xs">
            SEO Analysis
          </TabsTrigger>
          <TabsTrigger value="trends" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white text-xs">
            Trends
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white text-xs">
            AI Recommendations
          </TabsTrigger>
          <TabsTrigger value="download" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white text-xs">
            Download
          </TabsTrigger>
          <TabsTrigger value="script" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white text-xs">
            Script
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

        <TabsContent value="download" className="mt-6">
          <DownloadPanel 
            videoData={{
              title: analysisData.title,
              channelTitle: analysisData.channelTitle,
              duration: analysisData.duration
            }}
            videoUrl={videoUrl}
          />
        </TabsContent>

        <TabsContent value="script" className="mt-6">
          <ScriptPanel 
            videoData={{
              title: analysisData.title,
              channelTitle: analysisData.channelTitle,
              duration: analysisData.duration
            }}
            videoUrl={videoUrl}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
