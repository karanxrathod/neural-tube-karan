
import React, { useState } from 'react';
import { toast } from 'sonner';
import { fetchVideoData, calculateEngagementMetrics, extractVideoId } from '@/services/youtubeApi';
import { Header } from '@/components/Header';
import { URLInputSection } from '@/components/URLInputSection';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import { AnalysisResults } from '@/components/AnalysisResults';
import { FeaturesPreview } from '@/components/FeaturesPreview';

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
      <Header />

      <div className="container mx-auto px-4 py-8">
        <URLInputSection
          videoUrl={videoUrl}
          isAnalyzing={isAnalyzing}
          error={error}
          onUrlChange={handleUrlChange}
          onAnalyze={handleAnalyze}
        />

        {isAnalyzing && <LoadingIndicator />}

        {analysisData && !isAnalyzing && (
          <AnalysisResults analysisData={analysisData} />
        )}

        {!analysisData && !isAnalyzing && <FeaturesPreview />}
      </div>
    </div>
  );
};

export default Index;
