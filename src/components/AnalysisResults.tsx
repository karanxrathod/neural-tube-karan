
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoAnalysis } from '@/components/VideoAnalysis';
import { EngagementMetrics } from '@/components/EngagementMetrics';
import { SEOAnalysis } from '@/components/SEOAnalysis';
import { RecommendationsPanel } from '@/components/RecommendationsPanel';
import { TrendChart } from '@/components/TrendChart';

interface AnalysisResultsProps {
  analysisData: any;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analysisData }) => {
  return (
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
  );
};
