
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, AlertCircle } from 'lucide-react';

interface URLInputSectionProps {
  videoUrl: string;
  isAnalyzing: boolean;
  error: string;
  onUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAnalyze: () => void;
}

export const URLInputSection: React.FC<URLInputSectionProps> = ({
  videoUrl,
  isAnalyzing,
  error,
  onUrlChange,
  onAnalyze
}) => {
  return (
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
              onChange={onUrlChange}
              className={`pl-10 py-6 text-lg border-2 transition-colors ${
                error ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
              }`}
            />
          </div>
          <Button
            onClick={onAnalyze}
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

        {/* API Key Notice */}
        <div className="mt-6 max-w-2xl mx-auto">
          <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3 border">
            <strong>Note:</strong> To fetch real YouTube data, you need to configure a YouTube API key in the code. 
            Currently using enhanced mock data that varies based on the video URL you provide.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
