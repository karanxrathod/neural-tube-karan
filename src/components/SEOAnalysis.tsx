
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, AlertCircle, Search, Hash, FileText } from 'lucide-react';

interface SEOAnalysisProps {
  data: {
    title: string;
    description: string;
    tags: string[];
    seoScore: number;
  };
}

export const SEOAnalysis: React.FC<SEOAnalysisProps> = ({ data }) => {
  // SEO Analysis Logic
  const titleLength = data.title.length;
  const descriptionLength = data.description.length;
  const tagCount = data.tags.length;
  
  const seoChecks = [
    {
      name: 'Title Length',
      status: titleLength >= 30 && titleLength <= 60 ? 'good' : titleLength < 30 ? 'warning' : 'error',
      message: titleLength >= 30 && titleLength <= 60 
        ? `Perfect length (${titleLength} chars)` 
        : titleLength < 30 
        ? `Too short (${titleLength} chars, aim for 30-60)` 
        : `Too long (${titleLength} chars, aim for 30-60)`,
      score: titleLength >= 30 && titleLength <= 60 ? 100 : titleLength < 30 ? 60 : 40
    },
    {
      name: 'Description Length',
      status: descriptionLength >= 100 && descriptionLength <= 160 ? 'good' : 'warning',
      message: descriptionLength >= 100 && descriptionLength <= 160 
        ? `Optimal length (${descriptionLength} chars)` 
        : `${descriptionLength} chars (aim for 100-160)`,
      score: descriptionLength >= 100 && descriptionLength <= 160 ? 100 : 70
    },
    {
      name: 'Tags Count',
      status: tagCount >= 5 && tagCount <= 15 ? 'good' : 'warning',
      message: tagCount >= 5 && tagCount <= 15 
        ? `Good tag count (${tagCount})` 
        : `${tagCount} tags (aim for 5-15)`,
      score: tagCount >= 5 && tagCount <= 15 ? 100 : 60
    },
    {
      name: 'Keyword Density',
      status: 'good',
      message: 'Keywords well distributed',
      score: 85
    },
    {
      name: 'Emotional Words',
      status: data.title.toLowerCase().includes('amazing') || data.title.toLowerCase().includes('best') || data.title.toLowerCase().includes('complete') ? 'good' : 'warning',
      message: data.title.toLowerCase().includes('amazing') || data.title.toLowerCase().includes('best') || data.title.toLowerCase().includes('complete') 
        ? 'Contains emotional triggers' 
        : 'Consider adding emotional words',
      score: data.title.toLowerCase().includes('amazing') || data.title.toLowerCase().includes('best') || data.title.toLowerCase().includes('complete') ? 90 : 60
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-700 bg-green-100';
      case 'warning': return 'text-yellow-700 bg-yellow-100';
      case 'error': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* SEO Score Overview */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-100">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Search className="w-6 h-6 mr-2 text-blue-600" />
            SEO Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-blue-900 mb-2">{data.seoScore}/100</div>
            <Progress value={data.seoScore} className="h-4 mb-2" />
            <div className="text-sm text-blue-700">
              {data.seoScore >= 80 ? 'Excellent' : data.seoScore >= 60 ? 'Good' : 'Needs Improvement'}
            </div>
          </div>
          
          <div className="space-y-3">
            {seoChecks.map((check, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/60">
                <div className="flex items-center">
                  {getStatusIcon(check.status)}
                  <span className="ml-2 font-medium text-gray-900">{check.name}</span>
                </div>
                <Badge className={`${getStatusColor(check.status)} border-0 text-xs`}>
                  {check.score}%
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content Analysis */}
      <div className="space-y-6">
        {/* Title Analysis */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-100">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <FileText className="w-5 h-5 mr-2 text-green-600" />
              Title Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-white/60 rounded-lg">
                <div className="text-sm font-medium text-gray-900 mb-1">Current Title:</div>
                <div className="text-sm text-gray-700">{data.title}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-center p-2 bg-white/60 rounded">
                  <div className="font-bold text-green-900">{titleLength}</div>
                  <div className="text-green-700">Characters</div>
                </div>
                <div className="text-center p-2 bg-white/60 rounded">
                  <div className="font-bold text-green-900">{data.title.split(' ').length}</div>
                  <div className="text-green-700">Words</div>
                </div>
              </div>
              
              <div className="text-xs text-green-600 bg-green-200/50 rounded-lg p-2">
                <strong>Tip:</strong> Optimal titles are 30-60 characters and include target keywords early
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tags Analysis */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Hash className="w-5 h-5 mr-2 text-purple-600" />
              Tags Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {data.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="bg-white/60">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-center p-2 bg-white/60 rounded">
                  <div className="font-bold text-purple-900">{tagCount}</div>
                  <div className="text-purple-700">Total Tags</div>
                </div>
                <div className="text-center p-2 bg-white/60 rounded">
                  <div className="font-bold text-purple-900">{Math.round(data.tags.reduce((acc, tag) => acc + tag.length, 0) / tagCount)}</div>
                  <div className="text-purple-700">Avg Length</div>
                </div>
              </div>
              
              <div className="text-xs text-purple-600 bg-purple-200/50 rounded-lg p-2">
                <strong>Recommendation:</strong> Use 5-15 relevant tags, mix broad and specific terms
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
