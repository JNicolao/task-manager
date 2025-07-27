export interface Task {
  id: string;
  title: string;
  description: string;
  category: 'work' | 'personal' | 'health' | 'learning';
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: Date;
  completedAt?: Date;
  estimatedDuration: number; // in minutes
  actualDuration?: number; // in minutes
  dueDate?: Date;
}

export interface ProductivityMetrics {
  completionRate: number;
  averageTaskTime: number;
  productiveHours: { hour: number; count: number }[];
  categoryDistribution: { category: string; count: number; completed: number }[];
  weeklyTrend: { date: string; completed: number; created: number }[];
}

export interface AIInsight {
  id: string;
  type: 'optimization' | 'pattern' | 'suggestion';
  title: string;
  description: string;
  actionable: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
}