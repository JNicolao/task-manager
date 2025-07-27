import React, { useState } from 'react';
import { Clock, Calendar, CheckCircle, Circle, Edit, Trash2, Play, Pause } from 'lucide-react';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, status: Task['status']) => void;
  onUpdateDuration: (id: string, duration: number) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  onEdit, 
  onDelete, 
  onToggleStatus, 
  onUpdateDuration 
}) => {
  const [isTracking, setIsTracking] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'work': return 'bg-blue-100 text-blue-800';
      case 'personal': return 'bg-purple-100 text-purple-800';
      case 'health': return 'bg-green-100 text-green-800';
      case 'learning': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleToggleComplete = () => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    onToggleStatus(task.id, newStatus);
    
    if (newStatus === 'completed' && isTracking && startTime) {
      const duration = Math.round((Date.now() - startTime.getTime()) / 60000);
      onUpdateDuration(task.id, duration);
      setIsTracking(false);
      setStartTime(null);
    }
  };

  const handleToggleTracking = () => {
    if (isTracking) {
      if (startTime) {
        const duration = Math.round((Date.now() - startTime.getTime()) / 60000);
        onUpdateDuration(task.id, (task.actualDuration || 0) + duration);
      }
      setIsTracking(false);
      setStartTime(null);
    } else {
      setIsTracking(true);
      setStartTime(new Date());
      onToggleStatus(task.id, 'in-progress');
    }
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <div className={`bg-white rounded-lg shadow-sm border transition-all duration-200 hover:shadow-md ${
      isOverdue ? 'border-red-200 bg-red-50' : 'border-gray-200'
    }`}>
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start space-x-3 flex-1">
            <button
              onClick={handleToggleComplete}
              className={`mt-1 transition-colors ${
                task.status === 'completed' 
                  ? 'text-green-600 hover:text-green-700' 
                  : 'text-gray-400 hover:text-green-600'
              }`}
            >
              {task.status === 'completed' ? <CheckCircle size={20} /> : <Circle size={20} />}
            </button>
            
            <div className="flex-1">
              <h3 className={`font-medium text-gray-900 ${
                task.status === 'completed' ? 'line-through text-gray-500' : ''
              }`}>
                {task.title}
              </h3>
              {task.description && (
                <p className="text-sm text-gray-600 mt-1">{task.description}</p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleToggleTracking}
              className={`p-1 rounded transition-colors ${
                isTracking 
                  ? 'text-red-600 hover:text-red-700' 
                  : 'text-blue-600 hover:text-blue-700'
              }`}
              disabled={task.status === 'completed'}
            >
              {isTracking ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button
              onClick={() => onEdit(task)}
              className="text-gray-400 hover:text-blue-600 transition-colors"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="text-gray-400 hover:text-red-600 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(task.category)}`}>
              {task.category}
            </span>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-500">
            {task.dueDate && (
              <div className={`flex items-center space-x-1 ${isOverdue ? 'text-red-600' : ''}`}>
                <Calendar size={14} />
                <span>{new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <Clock size={14} />
              <span>
                {task.actualDuration || 0}m / {task.estimatedDuration}m
              </span>
            </div>
          </div>
        </div>

        {isTracking && (
          <div className="mt-3 p-2 bg-blue-50 rounded-md">
            <div className="flex items-center space-x-2 text-sm text-blue-700">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              <span>Tracking time... Started at {startTime?.toLocaleTimeString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};