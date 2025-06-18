
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface DownloadPanelProps {
  videoData: {
    title: string;
    channelTitle: string;
    duration: string;
  };
  videoUrl: string;
}

interface DownloadOption {
  quality: string;
  format: string;
  size: string;
  type: 'video' | 'audio';
}

export const DownloadPanel: React.FC<DownloadPanelProps> = ({ videoData, videoUrl }) => {
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  const [downloadedItems, setDownloadedItems] = useState<Set<string>>(new Set());

  const downloadOptions: DownloadOption[] = [
    { quality: '144p', format: 'MP4', size: '~5MB', type: 'video' },
    { quality: '240p', format: 'MP4', size: '~10MB', type: 'video' },
    { quality: '360p', format: 'MP4', size: '~20MB', type: 'video' },
    { quality: '480p', format: 'MP4', size: '~35MB', type: 'video' },
    { quality: '720p HD', format: 'MP4', size: '~60MB', type: 'video' },
    { quality: '1080p FHD', format: 'MP4', size: '~120MB', type: 'video' },
    { quality: '1440p 2K', format: 'MP4', size: '~200MB', type: 'video' },
    { quality: '2160p 4K', format: 'MP4', size: '~400MB', type: 'video' },
    { quality: 'Audio Only', format: 'MP3', size: '~4MB', type: 'audio' },
    { quality: 'Audio HQ', format: 'MP3', size: '~8MB', type: 'audio' },
  ];

  const handleDownload = async (option: DownloadOption) => {
    const downloadId = `${option.quality}-${option.format}`;
    setIsDownloading(downloadId);

    try {
      // Simulate download process
      toast.info(`Starting download: ${option.quality} ${option.format}`);
      
      // In a real implementation, you would:
      // 1. Use a YouTube downloader service/API
      // 2. Handle the actual file download
      // 3. Provide progress updates
      
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setDownloadedItems(prev => new Set([...prev, downloadId]));
      toast.success(`Downloaded: ${videoData.title} (${option.quality})`);
    } catch (error) {
      toast.error(`Download failed: ${option.quality} ${option.format}`);
    } finally {
      setIsDownloading(null);
    }
  };

  const getQualityColor = (quality: string) => {
    if (quality.includes('4K') || quality.includes('2K')) return 'bg-purple-100 text-purple-700';
    if (quality.includes('1080p') || quality.includes('720p')) return 'bg-blue-100 text-blue-700';
    if (quality.includes('480p') || quality.includes('360p')) return 'bg-green-100 text-green-700';
    if (quality.includes('Audio')) return 'bg-orange-100 text-orange-700';
    return 'bg-gray-100 text-gray-700';
  };

  const getTypeIcon = (type: 'video' | 'audio') => {
    return type === 'video' ? '🎥' : '🎵';
  };

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-indigo-100">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Download className="w-6 h-6 mr-2 text-indigo-600" />
          Download Video
        </CardTitle>
        <div className="text-sm text-gray-600">
          <div className="font-medium truncate">{videoData.title}</div>
          <div className="text-xs">by {videoData.channelTitle} • {videoData.duration}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Video Quality Options */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 flex items-center">
              🎥 Video Quality Options
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {downloadOptions.filter(opt => opt.type === 'video').map((option, index) => {
                const downloadId = `${option.quality}-${option.format}`;
                const isCurrentlyDownloading = isDownloading === downloadId;
                const isDownloaded = downloadedItems.has(downloadId);
                
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/60 rounded-lg hover:bg-white/80 transition-colors">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{getTypeIcon(option.type)}</span>
                      <div>
                        <div className="flex items-center space-x-2">
                          <Badge className={`${getQualityColor(option.quality)} border-0 text-xs`}>
                            {option.quality}
                          </Badge>
                          <span className="text-xs text-gray-500">{option.format}</span>
                        </div>
                        <div className="text-xs text-gray-500">{option.size}</div>
                      </div>
                    </div>
                    
                    <Button
                      size="sm"
                      variant={isDownloaded ? "secondary" : "default"}
                      onClick={() => handleDownload(option)}
                      disabled={isCurrentlyDownloading || isDownloaded}
                      className="h-8 text-xs"
                    >
                      {isCurrentlyDownloading ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : isDownloaded ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <Download className="w-3 h-3" />
                      )}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Audio Quality Options */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 flex items-center">
              🎵 Audio Only Options
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {downloadOptions.filter(opt => opt.type === 'audio').map((option, index) => {
                const downloadId = `${option.quality}-${option.format}`;
                const isCurrentlyDownloading = isDownloading === downloadId;
                const isDownloaded = downloadedItems.has(downloadId);
                
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/60 rounded-lg hover:bg-white/80 transition-colors">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{getTypeIcon(option.type)}</span>
                      <div>
                        <div className="flex items-center space-x-2">
                          <Badge className={`${getQualityColor(option.quality)} border-0 text-xs`}>
                            {option.quality}
                          </Badge>
                          <span className="text-xs text-gray-500">{option.format}</span>
                        </div>
                        <div className="text-xs text-gray-500">{option.size}</div>
                      </div>
                    </div>
                    
                    <Button
                      size="sm"
                      variant={isDownloaded ? "secondary" : "default"}
                      onClick={() => handleDownload(option)}
                      disabled={isCurrentlyDownloading || isDownloaded}
                      className="h-8 text-xs"
                    >
                      {isCurrentlyDownloading ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : isDownloaded ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <Download className="w-3 h-3" />
                      )}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-4 text-xs text-indigo-600 bg-indigo-200/50 rounded-lg p-3 flex items-start">
            <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <strong>Note:</strong> This is a demo feature. In a real implementation, you would need to integrate with a YouTube downloader service and ensure compliance with YouTube's Terms of Service.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
