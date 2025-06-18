
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Youtube, Brain } from 'lucide-react';

export const Header: React.FC = () => {
  return (
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
  );
};
