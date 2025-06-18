
import React from 'react';
import { Progress } from "@/components/ui/progress";

export const LoadingIndicator: React.FC = () => {
  return (
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
  );
};
