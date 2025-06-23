
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Download, Loader2, AlertTriangle, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

export const YouTubeDownloader: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);

  // YouTube URL validation regex
  const youtubeUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;

  const isValidUrl = youtubeUrlRegex.test(url);
  const canDownload = isValidUrl && hasPermission && !isLoading;

  const triggerDownload = (downloadUrl: string, filename: string = 'video.mp4') => {
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadVideo = async () => {
    if (!canDownload) return;

    setIsLoading(true);
    
    try {
      // Replace with your deployed backend URL
      const API_URL = process.env.REACT_APP_API_URL || 'https://your-backend-service.com';
      
      toast.info('Starting download...');
      
      const response = await fetch(`${API_URL}/download`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || data.error || 'Download failed');
      }
      
      // Trigger real file download
      const fullDownloadUrl = `${API_URL}${data.downloadUrl}`;
      triggerDownload(fullDownloadUrl, `youtube_video_${Date.now()}.mp4`);
      
      toast.success('Download started! Check your downloads folder.');
      
    } catch (error) {
      console.error('Download error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Download failed';
      toast.error(`Failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100">
      <CardHeader>
        <CardTitle className="text-xl flex items-center text-red-700">
          <Download className="w-6 h-6 mr-2" />
          YouTube Video Downloader
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* URL Input */}
        <div className="space-y-2">
          <Label htmlFor="youtube-url" className="text-sm font-medium">
            YouTube Video URL
          </Label>
          <Input
            id="youtube-url"
            type="url"
            placeholder="https://www.youtube.com/watch?v=..."
            value={url}
            onChange={handleUrlChange}
            className={`transition-colors ${
              url && !isValidUrl 
                ? 'border-red-300 focus:border-red-500' 
                : 'border-gray-200 focus:border-red-500'
            }`}
          />
          {url && !isValidUrl && (
            <p className="text-xs text-red-600 flex items-center">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Please enter a valid YouTube URL
            </p>
          )}
        </div>

        {/* Legal Disclaimer and Checkbox */}
        <div className="space-y-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="permission-checkbox"
              checked={hasPermission}
              onCheckedChange={(checked) => setHasPermission(checked === true)}
              className="mt-0.5"
            />
            <div className="space-y-2">
              <Label 
                htmlFor="permission-checkbox" 
                className="text-sm text-gray-800 cursor-pointer leading-relaxed"
              >
                I confirm I have permission to use this content and accept all copyright responsibility
              </Label>
              <p className="text-xs text-gray-600">
                <strong>Disclaimer:</strong> Downloading YouTube videos may violate their Terms of Service unless you have permission. 
                This feature is for educational or demo use only.{' '}
                <a 
                  href="https://www.youtube.com/t/terms" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline inline-flex items-center"
                >
                  View YouTube ToS <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <Button
          onClick={downloadVideo}
          disabled={!canDownload}
          className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Downloading...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Download MP4
            </>
          )}
        </Button>

        {/* Test URL Suggestion */}
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-2">Test with this URL:</p>
          <button
            onClick={() => setUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')}
            className="text-xs text-blue-600 hover:underline bg-blue-50 px-2 py-1 rounded"
          >
            https://www.youtube.com/watch?v=dQw4w9WgXcQ
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
