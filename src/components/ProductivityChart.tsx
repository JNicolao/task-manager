import React from 'react';
import { BarChart3, TrendingUp, Clock, Target } from 'lucide-react';
import { ProductivityMetrics } from '../types';

interface ProductivityChartProps {
  metrics: ProductivityMetrics;
}

export const ProductivityChart: React.FC<ProductivityChartProps> = ({ metrics }) => {
  const maxHourlyCount = Math.max(...metrics.productiveHours.map(h => h.count));
  const maxWeeklyCount = Math.max(...metrics.weeklyTrend.map(d => Math.max(d.completed, d.created)));

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Target className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Completion Rate</p>
              <p className="text-xl font-semibold text-gray-900">
                {metrics.completionRate.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg Task Time</p>
              <p className="text-xl font-semibold text-gray-900">
                {metrics.averageTaskTime.toFixed(0)}m
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="text-purple-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">This Week</p>
              <p className="text-xl font-semibold text-gray-900">
                {metrics.weeklyTrend.reduce((sum, day) => sum + day.completed, 0)} completed
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <BarChart3 className="text-orange-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Most Productive</p>
              <p className="text-xl font-semibold text-gray-900">
                {metrics.productiveHours.reduce((prev, current) => 
                  prev.count > current.count ? prev : current
                ).hour}:00
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Productive Hours Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Productive Hours</h3>
        <div className="flex items-end space-x-1 h-32">
          {metrics.productiveHours.map((hour) => (
            <div key={hour.hour} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600"
                style={{ 
                  height: `${maxHourlyCount > 0 ? (hour.count / maxHourlyCount) * 100 : 0}%`,
                  minHeight: hour.count > 0 ? '4px' : '0px'
                }}
              ></div>
              <span className="text-xs text-gray-600 mt-1">
                {hour.hour}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Trend Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Trend</h3>
        <div className="flex items-end space-x-2 h-32">
          {metrics.weeklyTrend.map((day, index) => (
            <div key={day.date} className="flex-1 flex flex-col items-center">
              <div className="w-full flex flex-col justify-end space-y-1" style={{ height: '100px' }}>
                <div 
                  className="w-full bg-green-500 rounded-t transition-all duration-300"
                  style={{ 
                    height: `${maxWeeklyCount > 0 ? (day.completed / maxWeeklyCount) * 80 : 0}%`,
                    minHeight: day.completed > 0 ? '2px' : '0px'
                  }}
                ></div>
                <div 
                  className="w-full bg-blue-300 rounded-t transition-all duration-300"
                  style={{ 
                    height: `${maxWeeklyCount > 0 ? (day.created / maxWeeklyCount) * 80 : 0}%`,
                    minHeight: day.created > 0 ? '2px' : '0px'
                  }}
                ></div>
              </div>
              <span className="text-xs text-gray-600 mt-1">
                {new Date(day.date).toLocaleDateString('en', { weekday: 'short' })}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center space-x-4 mt-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-gray-600">Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-300 rounded"></div>
            <span className="text-gray-600">Created</span>
          </div>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Distribution</h3>
        <div className="space-y-3">
          {metrics.categoryDistribution.map((category) => (
            <div key={category.category} className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1">
                <span className="capitalize text-sm font-medium text-gray-700 w-16">
                  {category.category}
                </span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${category.count > 0 ? (category.completed / category.count) * 100 : 0}%` 
                    }}
                  ></div>
                </div>
              </div>
              <span className="text-sm text-gray-600 ml-3">
                {category.completed}/{category.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};