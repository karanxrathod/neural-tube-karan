
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Clock, Calendar } from 'lucide-react';

interface TrendChartProps {
  data: any;
}

export const TrendChart: React.FC<TrendChartProps> = ({ data }) => {
  // Mock trend data
  const viewsTrendData = [
    { day: 'Day 1', views: 1200, likes: 45, comments: 8 },
    { day: 'Day 2', views: 2800, likes: 120, comments: 18 },
    { day: 'Day 3', views: 4500, likes: 200, comments: 32 },
    { day: 'Day 4', views: 8200, likes: 380, comments: 55 },
    { day: 'Day 5', views: 15600, likes: 720, comments: 98 },
    { day: 'Day 6', views: 28900, likes: 1200, comments: 142 },
    { day: 'Day 7', views: 45300, likes: 1850, comments: 188 },
    { day: 'Day 8', views: 67800, likes: 2950, comments: 245 },
    { day: 'Day 9', views: 89200, likes: 4100, comments: 298 },
    { day: 'Day 10', views: 125430, likes: 8420, comments: 342 },
  ];

  const hourlyData = [
    { hour: '00:00', engagement: 2.1 },
    { hour: '02:00', engagement: 1.8 },
    { hour: '04:00', engagement: 1.5 },
    { hour: '06:00', engagement: 2.8 },
    { hour: '08:00', engagement: 4.2 },
    { hour: '10:00', engagement: 5.8 },
    { hour: '12:00', engagement: 7.2 },
    { hour: '14:00', engagement: 6.8 },
    { hour: '16:00', engagement: 8.1 },
    { hour: '18:00', engagement: 9.2 },
    { hour: '20:00', engagement: 8.8 },
    { hour: '22:00', engagement: 6.5 },
  ];

  const competitorData = [
    { metric: 'Views', yours: 125430, average: 89200, top: 250000 },
    { metric: 'Likes', yours: 8420, average: 6200, top: 18500 },
    { metric: 'Comments', yours: 342, average: 280, top: 750 },
    { metric: 'Engagement', yours: 7.1, average: 5.2, top: 12.3 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Views Trend */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
            Performance Trend (10 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={viewsTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
              <XAxis dataKey="day" stroke="#6366f1" />
              <YAxis stroke="#6366f1" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e0e7ff',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area type="monotone" dataKey="views" stroke="#3b82f6" fill="#60a5fa" fillOpacity={0.3} strokeWidth={3} />
              <Line type="monotone" dataKey="likes" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="comments" stroke="#f59e0b" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Best Posting Times */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Clock className="w-5 h-5 mr-2 text-green-600" />
            Best Posting Times
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
              <XAxis dataKey="hour" stroke="#059669" fontSize={12} />
              <YAxis stroke="#059669" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #d1fae5',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="engagement" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 text-sm text-green-700 bg-green-200/50 rounded-lg p-3">
            <strong>Peak hours:</strong> 6-8 PM shows highest engagement rates for your content type
          </div>
        </CardContent>
      </Card>

      {/* Competitive Analysis */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-purple-600" />
            Competitive Benchmarks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {competitorData.map((item, index) => (
              <div key={index} className="bg-white/60 rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-900">{item.metric}</span>
                  <span className="text-xs text-gray-600">vs Industry</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center">
                    <div className="font-bold text-purple-900">{typeof item.yours === 'number' && item.yours > 1000 ? (item.yours / 1000).toFixed(1) + 'K' : item.yours}</div>
                    <div className="text-purple-600">You</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-gray-700">{typeof item.average === 'number' && item.average > 1000 ? (item.average / 1000).toFixed(1) + 'K' : item.average}</div>
                    <div className="text-gray-600">Average</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-orange-700">{typeof item.top === 'number' && item.top > 1000 ? (item.top / 1000).toFixed(1) + 'K' : item.top}</div>
                    <div className="text-orange-600">Top 10%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-xs text-purple-600 bg-purple-200/50 rounded-lg p-3">
            <strong>Insight:</strong> Your engagement rate is above average but there's room to reach top performers
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
