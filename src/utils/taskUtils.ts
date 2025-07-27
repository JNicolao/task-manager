import { Task, ProductivityMetrics, AIInsight } from '../types';

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const calculateProductivityMetrics = (tasks: Task[]): ProductivityMetrics => {
  const completedTasks = tasks.filter(task => task.status === 'completed');
  const totalTasks = tasks.length;
  
  const completionRate = totalTasks > 0 ? (completedTasks.length / totalTasks) * 100 : 0;
  
  const averageTaskTime = completedTasks.length > 0 
    ? completedTasks.reduce((sum, task) => sum + (task.actualDuration || 0), 0) / completedTasks.length
    : 0;

  // Analyze productive hours
  const productiveHours = Array.from({ length: 24 }, (_, hour) => ({
    hour,
    count: completedTasks.filter(task => 
      task.completedAt && new Date(task.completedAt).getHours() === hour
    ).length
  }));

  // Category distribution
  const categories = ['work', 'personal', 'health', 'learning'] as const;
  const categoryDistribution = categories.map(category => ({
    category,
    count: tasks.filter(task => task.category === category).length,
    completed: completedTasks.filter(task => task.category === category).length
  }));

  // Weekly trend (last 7 days)
  const weeklyTrend = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    return {
      date: dateStr,
      completed: completedTasks.filter(task => 
        task.completedAt && new Date(task.completedAt).toISOString().split('T')[0] === dateStr
      ).length,
      created: tasks.filter(task => 
        new Date(task.createdAt).toISOString().split('T')[0] === dateStr
      ).length
    };
  }).reverse();

  return {
    completionRate,
    averageTaskTime,
    productiveHours,
    categoryDistribution,
    weeklyTrend
  };
};

export const generateAIInsights = (tasks: Task[], metrics: ProductivityMetrics): AIInsight[] => {
  const insights: AIInsight[] = [];
  const now = new Date();

  // Completion rate insights
  if (metrics.completionRate < 70) {
    insights.push({
      id: generateId(),
      type: 'suggestion',
      title: 'Improve Task Completion Rate',
      description: `Your completion rate is ${metrics.completionRate.toFixed(1)}%. Consider breaking large tasks into smaller, manageable chunks.`,
      actionable: true,
      priority: 'high',
      createdAt: now
    });
  }

  // Productive hours pattern
  const mostProductiveHour = metrics.productiveHours.reduce((prev, current) => 
    prev.count > current.count ? prev : current
  );
  
  if (mostProductiveHour.count > 0) {
    insights.push({
      id: generateId(),
      type: 'pattern',
      title: 'Peak Productivity Hours Identified',
      description: `You're most productive around ${mostProductiveHour.hour}:00. Schedule important tasks during this time.`,
      actionable: true,
      priority: 'medium',
      createdAt: now
    });
  }

  // Overdue tasks warning
  const overdueTasks = tasks.filter(task => 
    task.status !== 'completed' && 
    task.dueDate && 
    new Date(task.dueDate) < now
  );

  if (overdueTasks.length > 0) {
    insights.push({
      id: generateId(),
      type: 'optimization',
      title: 'Overdue Tasks Detected',
      description: `You have ${overdueTasks.length} overdue task(s). Consider rescheduling or breaking them down.`,
      actionable: true,
      priority: 'high',
      createdAt: now
    });
  }

  // Category balance
  const workTasks = metrics.categoryDistribution.find(c => c.category === 'work');
  const personalTasks = metrics.categoryDistribution.find(c => c.category === 'personal');
  
  if (workTasks && personalTasks && workTasks.count > personalTasks.count * 3) {
    insights.push({
      id: generateId(),
      type: 'suggestion',
      title: 'Work-Life Balance',
      description: 'You have significantly more work tasks than personal ones. Consider adding some personal goals.',
      actionable: true,
      priority: 'medium',
      createdAt: now
    });
  }

  // Time estimation accuracy
  const tasksWithBothDurations = tasks.filter(task => 
    task.estimatedDuration && task.actualDuration
  );
  
  if (tasksWithBothDurations.length >= 3) {
    const avgEstimation = tasksWithBothDurations.reduce((sum, task) => 
      sum + task.estimatedDuration, 0) / tasksWithBothDurations.length;
    const avgActual = tasksWithBothDurations.reduce((sum, task) => 
      sum + (task.actualDuration || 0), 0) / tasksWithBothDurations.length;
    
    if (avgActual > avgEstimation * 1.5) {
      insights.push({
        id: generateId(),
        type: 'optimization',
        title: 'Time Estimation Improvement',
        description: `Your tasks typically take ${((avgActual / avgEstimation - 1) * 100).toFixed(0)}% longer than estimated. Consider adding buffer time.`,
        actionable: true,
        priority: 'medium',
        createdAt: now
      });
    }
  }

  return insights;
};