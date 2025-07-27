import React from 'react';
import { Brain, Lightbulb, TrendingUp, AlertTriangle } from 'lucide-react';
import { AIInsight } from '../types';

interface AIInsightsProps {
  insights: AIInsight[];
}

export const AIInsights: React.FC<AIInsightsProps> = ({ insights }) => {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'optimization': return <TrendingUp size={20} />;
      case 'pattern': return <Brain size={20} />;
      case 'suggestion': return <Lightbulb size={20} />;
      default: return <AlertTriangle size={20} />;
    }
  };

  const getInsightColor = (priority: string, type: string) => {
    if (priority === 'high') {
      return 'border-red-200 bg-red-50 text-red-800';
    } else if (priority === 'medium') {
      return 'border-yellow-200 bg-yellow-50 text-yellow-800';
    } else {
      return 'border-blue-200 bg-blue-50 text-blue-800';
    }
  };

  const getIconColor = (priority: string) => {
    if (priority === 'high') return 'text-red-600';
    if (priority === 'medium') return 'text-yellow-600';
    return 'text-blue-600';
  };

  if (insights.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="text-center py-8">
          <Brain className="mx-auto text-gray-400 mb-3" size={48} />
          <p className="text-gray-600">
            Complete more tasks to get AI-powered insights and recommendations.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Brain className="text-purple-600" size={24} />
        <h2 className="text-xl font-semibold text-gray-900">AI Insights</h2>
      </div>

      {insights.map((insight) => (
        <div 
          key={insight.id} 
          className={`p-4 rounded-lg border ${getInsightColor(insight.priority, insight.type)} transition-all duration-200 hover:shadow-md`}
        >
          <div className="flex items-start space-x-3">
            <div className={`${getIconColor(insight.priority)} mt-1`}>
              {getInsightIcon(insight.type)}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">{insight.title}</h3>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    insight.priority === 'high' 
                      ? 'bg-red-100 text-red-800' 
                      : insight.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {insight.priority}
                  </span>
                  <span className="text-xs text-gray-500 capitalize">
                    {insight.type}
                  </span>
                </div>
              </div>
              <p className="text-gray-700">{insight.description}</p>
              {insight.actionable && (
                <div className="mt-3">
                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                    ✓ Actionable
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};