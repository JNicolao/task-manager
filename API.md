# API Documentation

This document describes the internal APIs, interfaces, and functions used in the AI-Powered Task Manager.

## Table of Contents

- [Core Types](#core-types)
- [Utility Functions](#utility-functions)
- [React Hooks](#react-hooks)
- [Component APIs](#component-apis)
- [AI Algorithm APIs](#ai-algorithm-apis)

## Core Types

### Task Interface

The main task entity used throughout the application.

```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  category: "work" | "personal" | "health" | "learning";
  priority: "low" | "medium" | "high";
  status: "pending" | "in-progress" | "completed";
  createdAt: Date;
  completedAt?: Date;
  estimatedDuration: number;
  actualDuration?: number;
  dueDate?: Date;
}
```

### ProductivityMetrics Interface

Analytics data structure for productivity insights.

```typescript
interface ProductivityMetrics {
  completionRate: number;
  averageTaskTime: number;
  productiveHours: Array<{
    hour: number;
    count: number;
  }>;
  categoryDistribution: Array<{
    category: string;
    count: number;
    completed: number;
  }>;
  weeklyTrend: Array<{
    date: string;
    completed: number;
    created: number;
  }>;
}
```

### AIInsight Interface

AI-generated insights and recommendations.

```typescript
interface AIInsight {
  id: string;
  type: "optimization" | "pattern" | "suggestion";
  title: string;
  description: string;
  actionable: boolean;
  priority: "low" | "medium" | "high";
  createdAt: Date;
}
```

## Utility Functions

### generateId()

Generates a unique identifier for tasks and insights.

```typescript
function generateId(): string;
```

**Returns**: A random string suitable for use as an ID.

**Example**:

```typescript
const taskId = generateId();
```

### calculateProductivityMetrics()

Analyzes task data to generate productivity metrics.

```typescript
function calculateProductivityMetrics(tasks: Task[]): ProductivityMetrics;
```

**Parameters**:

- `tasks`: Array of tasks to analyze

**Returns**: ProductivityMetrics object with calculated analytics

**Example**:

```typescript
const metrics = calculateProductivityMetrics(allTasks);
console.log(`Completion rate: ${metrics.completionRate}%`);
```

### generateAIInsights()

Generates AI-powered insights based on task data and metrics.

```typescript
function generateAIInsights(
  tasks: Task[],
  metrics: ProductivityMetrics
): AIInsight[];
```

**Parameters**:

- `tasks`: Array of tasks to analyze
- `metrics`: Calculated productivity metrics

**Returns**: Array of AI-generated insights

**Example**:

```typescript
const insights = generateAIInsights(tasks, metrics);
insights.forEach((insight) => {
  console.log(`${insight.type}: ${insight.title}`);
});
```

## React Hooks

### useLocalStorage()

Custom hook for persistent state management using localStorage.

```typescript
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void];
```

**Parameters**:

- `key`: localStorage key for data persistence
- `initialValue`: Default value if no stored data exists

**Returns**: Tuple of [storedValue, setValue] similar to useState

**Example**:

```typescript
const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);

// Add a new task
setTasks((prevTasks) => [...prevTasks, newTask]);

// Update existing task
setTasks((prevTasks) =>
  prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
);
```

## Component APIs

### TaskForm Component

Modal form for creating and editing tasks.

```typescript
interface TaskFormProps {
  onSubmit: (task: Omit<Task, "id" | "createdAt">) => void;
  onCancel: () => void;
  initialTask?: Partial<Task>;
}
```

**Props**:

- `onSubmit`: Callback when form is submitted
- `onCancel`: Callback when form is cancelled
- `initialTask`: Optional initial values for editing

**Example**:

```typescript
<TaskForm
  onSubmit={handleCreateTask}
  onCancel={() => setShowForm(false)}
  initialTask={editingTask}
/>
```

### TaskCard Component

Individual task display with actions.

```typescript
interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, status: Task["status"]) => void;
  onUpdateDuration: (id: string, duration: number) => void;
}
```

**Props**:

- `task`: Task object to display
- `onEdit`: Callback for editing task
- `onDelete`: Callback for deleting task
- `onToggleStatus`: Callback for status changes
- `onUpdateDuration`: Callback for time tracking updates

**Example**:

```typescript
<TaskCard
  task={task}
  onEdit={setEditingTask}
  onDelete={handleDeleteTask}
  onToggleStatus={handleToggleStatus}
  onUpdateDuration={handleUpdateDuration}
/>
```

### ProductivityChart Component

Analytics dashboard with visual charts.

```typescript
interface ProductivityChartProps {
  metrics: ProductivityMetrics;
}
```

**Props**:

- `metrics`: Productivity metrics to visualize

**Example**:

```typescript
<ProductivityChart metrics={calculatedMetrics} />
```

### AIInsights Component

Display AI-generated insights and recommendations.

```typescript
interface AIInsightsProps {
  insights: AIInsight[];
}
```

**Props**:

- `insights`: Array of AI insights to display

**Example**:

```typescript
<AIInsights insights={generatedInsights} />
```

### TaskFilters Component

Search and filter controls for task lists.

```typescript
interface TaskFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  categoryFilter: string;
  onCategoryFilterChange: (category: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  priorityFilter: string;
  onPriorityFilterChange: (priority: string) => void;
}
```

**Props**:

- `searchTerm`: Current search term
- `onSearchChange`: Search term change handler
- `categoryFilter`: Current category filter
- `onCategoryFilterChange`: Category filter change handler
- `statusFilter`: Current status filter
- `onStatusFilterChange`: Status filter change handler
- `priorityFilter`: Current priority filter
- `onPriorityFilterChange`: Priority filter change handler

**Example**:

```typescript
<TaskFilters
  searchTerm={searchTerm}
  onSearchChange={setSearchTerm}
  categoryFilter={categoryFilter}
  onCategoryFilterChange={setCategoryFilter}
  statusFilter={statusFilter}
  onStatusFilterChange={setStatusFilter}
  priorityFilter={priorityFilter}
  onPriorityFilterChange={setPriorityFilter}
/>
```

## AI Algorithm APIs

### Completion Rate Analysis

Analyzes task completion patterns and generates insights.

**Algorithm**:

```typescript
if (metrics.completionRate < 70) {
}
```

**Triggers**:

- Completion rate below 70%
- Consistent pattern of incomplete tasks

**Generated Insights**:

- Task breakdown suggestions
- Time management recommendations
- Priority adjustment advice

### Productive Hours Detection

Identifies peak productivity periods based on task completion times.

**Algorithm**:

```typescript
const mostProductiveHour = metrics.productiveHours.reduce((prev, current) =>
  prev.count > current.count ? prev : current
);
```

**Triggers**:

- Sufficient task completion data (>5 completed tasks)
- Clear productivity patterns emerge

**Generated Insights**:

- Optimal scheduling recommendations
- Focus time suggestions
- Break time optimization

### Time Estimation Analysis

Compares estimated vs. actual task durations to improve planning accuracy.

**Algorithm**:

```typescript
const avgEstimation =
  tasksWithBothDurations.reduce(
    (sum, task) => sum + task.estimatedDuration,
    0
  ) / tasksWithBothDurations.length;

const avgActual =
  tasksWithBothDurations.reduce(
    (sum, task) => sum + (task.actualDuration || 0),
    0
  ) / tasksWithBothDurations.length;

if (avgActual > avgEstimation * 1.5) {
}
```

**Triggers**:

- Minimum 3 tasks with both estimated and actual durations
- Consistent underestimation pattern (>50% longer than estimated)

**Generated Insights**:

- Buffer time recommendations
- Estimation improvement tips
- Task complexity analysis

### Work-Life Balance Monitoring

Analyzes task category distribution to ensure balanced productivity.

**Algorithm**:

```typescript
const workTasks = categoryDistribution.find((c) => c.category === "work");
const personalTasks = categoryDistribution.find(
  (c) => c.category === "personal"
);

if (workTasks && personalTasks && workTasks.count > personalTasks.count * 3) {
}
```

**Triggers**:

- Work tasks significantly outnumber personal tasks (3:1 ratio)
- Lack of health or learning tasks
- Extended periods without personal time

**Generated Insights**:

- Work-life balance recommendations
- Personal goal suggestions
- Health and wellness reminders

### Overdue Task Detection

Identifies and provides recommendations for overdue tasks.

**Algorithm**:

```typescript
const overdueTasks = tasks.filter(
  (task) =>
    task.status !== "completed" &&
    task.dueDate &&
    new Date(task.dueDate) < new Date()
);
```

**Triggers**:

- Tasks past their due date
- Accumulation of overdue items
- Pattern of missing deadlines

**Generated Insights**:

- Rescheduling suggestions
- Priority reassessment
- Task breakdown recommendations

## Data Flow

### Task Management Flow

1. **Task Creation**: User creates task → Validation → Storage
2. **Task Updates**: User modifies task → Validation → Storage → Metrics recalculation
3. **Task Completion**: User completes task → Status update → Duration recording → Analytics update

### Analytics Flow

1. **Data Collection**: Tasks stored in localStorage
2. **Metrics Calculation**: Real-time calculation of productivity metrics
3. **Insight Generation**: AI analysis of patterns and trends
4. **Visualization**: Charts and graphs updated automatically

### AI Processing Flow

1. **Data Analysis**: Process task history and metrics
2. **Pattern Recognition**: Identify productivity patterns
3. **Insight Generation**: Create actionable recommendations
4. **Priority Assignment**: Rank insights by importance
5. **Display**: Present insights to user with clear actions

## Configuration Options

### AI Thresholds

Customize AI insight generation by modifying these values:

```typescript
const AI_CONFIG = {
  LOW_COMPLETION_THRESHOLD: 70,
  ESTIMATION_ACCURACY_THRESHOLD: 1.5,
  WORK_LIFE_BALANCE_RATIO: 3,
  MIN_TASKS_FOR_INSIGHTS: 3,
  PRODUCTIVE_HOURS_MIN_COUNT: 1,
};
```

### Chart Configuration

Customize chart appearance and behavior:

```typescript
const CHART_CONFIG = {
  MAX_CHART_HEIGHT: 100,
  ANIMATION_DURATION: 300,
  COLOR_SCHEME: {
    primary: "#3B82F6",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
  },
};
```

---

This API documentation provides comprehensive information about the internal structure and functionality of the AI-Powered Task Manager. For usage examples and implementation details, refer to the main README.md file.
