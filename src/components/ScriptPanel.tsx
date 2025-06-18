
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Loader2, Copy, Download, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface ScriptPanelProps {
  videoData: {
    title: string;
    channelTitle: string;
    duration: string;
  };
  videoUrl: string;
}

export const ScriptPanel: React.FC<ScriptPanelProps> = ({ videoData, videoUrl }) => {
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedScript, setExtractedScript] = useState<string | null>(null);
  const [scriptLanguage, setScriptLanguage] = useState('en');

  // Mock script data for demonstration
  const mockScript = `[00:00] Welcome to today's tutorial on building React applications in 2024.

[00:15] In this comprehensive guide, we'll cover everything you need to know about modern React development, including hooks, state management, and performance optimization.

[00:45] First, let's start with the fundamentals. React is a JavaScript library for building user interfaces, particularly web applications.

[01:20] We'll begin by setting up our development environment. Make sure you have Node.js installed on your system.

[02:00] Now, let's create our first React component. Components are the building blocks of any React application.

[02:30] Here's how we can use React hooks to manage state in our functional components. The useState hook is one of the most commonly used hooks.

[03:15] Next, we'll explore the useEffect hook, which allows us to perform side effects in our components.

[04:00] Performance optimization is crucial for any React application. Let's discuss some best practices.

[04:30] That concludes our tutorial. Thank you for watching, and don't forget to subscribe for more React content!`;

  const handleExtractScript = async () => {
    setIsExtracting(true);
    
    try {
      // Simulate script extraction process
      toast.info('Extracting video script...');
      
      // In a real implementation, you would:
      // 1. Use YouTube's transcript API or a third-party service
      // 2. Process the audio to extract speech
      // 3. Convert speech to text with timestamps
      
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setExtractedScript(mockScript);
      toast.success('Script extracted successfully!');
    } catch (error) {
      toast.error('Failed to extract script');
    } finally {
      setIsExtracting(false);
    }
  };

  const copyToClipboard = () => {
    if (extractedScript) {
      navigator.clipboard.writeText(extractedScript);
      toast.success('Script copied to clipboard!');
    }
  };

  const downloadScript = () => {
    if (extractedScript) {
      const blob = new Blob([extractedScript], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${videoData.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_script.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Script downloaded!');
    }
  };

  const formatScript = (script: string) => {
    return script.split('\n').map((line, index) => {
      if (line.trim().startsWith('[') && line.includes(']')) {
        const timestampMatch = line.match(/\[([^\]]+)\]/);
        const text = line.replace(/\[[^\]]+\]\s*/, '');
        
        return (
          <div key={index} className="mb-3 p-3 bg-white/40 rounded-lg">
            <div className="flex items-start space-x-3">
              <Badge variant="outline" className="text-xs bg-blue-100 text-blue-700 border-blue-200">
                {timestampMatch ? timestampMatch[1] : '00:00'}
              </Badge>
              <div className="text-sm text-gray-800 flex-1">{text}</div>
            </div>
          </div>
        );
      }
      
      if (line.trim()) {
        return (
          <div key={index} className="mb-2 p-2 text-sm text-gray-700">
            {line}
          </div>
        );
      }
      
      return null;
    }).filter(Boolean);
  };

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-teal-50 to-teal-100">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <FileText className="w-6 h-6 mr-2 text-teal-600" />
          Video Script Extraction
        </CardTitle>
        <div className="text-sm text-gray-600">
          <div className="font-medium truncate">{videoData.title}</div>
          <div className="text-xs">by {videoData.channelTitle} • {videoData.duration}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {!extractedScript ? (
            <div className="text-center py-8">
              <FileText className="w-16 h-16 text-teal-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Extract Video Script</h3>
              <p className="text-sm text-gray-600 mb-4">
                Get the full transcript of this video with timestamps for easy reference and analysis.
              </p>
              
              <Button
                onClick={handleExtractScript}
                disabled={isExtracting}
                className="bg-teal-600 hover:bg-teal-700"
              >
                {isExtracting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Extracting Script...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 mr-2" />
                    Extract Script
                  </>
                )}
              </Button>
              
              <div className="mt-4 text-xs text-teal-600 bg-teal-200/50 rounded-lg p-3">
                <strong>Features:</strong> Automatic timestamps, speaker detection, and formatted output
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={copyToClipboard}
                  className="text-xs"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copy Script
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={downloadScript}
                  className="text-xs"
                >
                  <Download className="w-3 h-3 mr-1" />
                  Download TXT
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleExtractScript}
                  className="text-xs"
                >
                  <FileText className="w-3 h-3 mr-1" />
                  Re-extract
                </Button>
              </div>

              {/* Script Content */}
              <div className="bg-white/60 rounded-lg p-4 max-h-96 overflow-y-auto">
                <div className="flex items-center mb-4">
                  <Eye className="w-4 h-4 mr-2 text-teal-600" />
                  <span className="text-sm font-medium text-gray-900">Extracted Script</span>
                  <Badge className="ml-2 bg-teal-100 text-teal-700 border-0 text-xs">
                    {extractedScript.split('\n').filter(line => line.includes('[')).length} segments
                  </Badge>
                </div>
                
                <div>{formatScript(extractedScript)}</div>
              </div>

              {/* Script Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-white/40 rounded-lg p-3">
                  <div className="text-lg font-bold text-teal-700">
                    {extractedScript.split(' ').length}
                  </div>
                  <div className="text-xs text-gray-600">Words</div>
                </div>
                <div className="bg-white/40 rounded-lg p-3">
                  <div className="text-lg font-bold text-teal-700">
                    {extractedScript.split('\n').filter(line => line.includes('[')).length}
                  </div>
                  <div className="text-xs text-gray-600">Segments</div>
                </div>
                <div className="bg-white/40 rounded-lg p-3">
                  <div className="text-lg font-bold text-teal-700">
                    {Math.ceil(extractedScript.split(' ').length / 200)}
                  </div>
                  <div className="text-xs text-gray-600">Pages</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
