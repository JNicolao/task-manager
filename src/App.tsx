import { useState, useMemo } from 'react';
import { Plus, CheckSquare, BarChart3, Brain, Target } from 'lucide-react';
import { Task } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { generateId, calculateProductivityMetrics, generateAIInsights } from './utils/taskUtils';
import { TaskForm } from './components/TaskForm';
import { TaskCard } from './components/TaskCard';
import { ProductivityChart } from './components/ProductivityChart';
import { AIInsights } from './components/AIInsights';
import { TaskFilters } from './components/TaskFilters';

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('ai-task-manager-tasks', []);
  const [activeTab, setActiveTab] = useState<'tasks' | 'analytics' | 'insights'>('tasks');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  const metrics = useMemo(() => calculateProductivityMetrics(tasks), [tasks]);
  const insights = useMemo(() => generateAIInsights(tasks, metrics), [tasks, metrics]);

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           task.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !categoryFilter || task.category === categoryFilter;
      const matchesStatus = !statusFilter || task.status === statusFilter;
      const matchesPriority = !priorityFilter || task.priority === priorityFilter;
      
      return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
    });
  }, [tasks, searchTerm, categoryFilter, statusFilter, priorityFilter]);

  const handleCreateTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: generateId(),
      createdAt: new Date()
    };
    setTasks(prev => [...prev, newTask]);
    setShowTaskForm(false);
  };

  const handleEditTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (!editingTask) return;
    
    setTasks(prev => prev.map(task => 
      task.id === editingTask.id 
        ? { ...task, ...taskData }
        : task
    ));
    setEditingTask(null);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const handleToggleStatus = (id: string, status: Task['status']) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { 
            ...task, 
            status,
            completedAt: status === 'completed' ? new Date() : undefined
          }
        : task
    ));
  };

  const handleUpdateDuration = (id: string, duration: number) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, actualDuration: duration }
        : task
    ));
  };

  const pendingTasks = filteredTasks.filter(task => task.status !== 'completed');
  const completedTasks = filteredTasks.filter(task => task.status === 'completed');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Target className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AI Task Manager</h1>
                <p className="text-sm text-gray-600">Smart productivity insights</p>
              </div>
            </div>
            
            <button
              onClick={() => setShowTaskForm(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={16} />
              <span>New Task</span>
            </button>
          </div>
        </div>
      </header>

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'tasks', label: 'Tasks', icon: CheckSquare },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'insights', label: 'AI Insights', icon: Brain }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'tasks' && (
          <div className="space-y-6">
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

            {/* Tasks Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Tasks</p>
                    <p className="text-2xl font-bold text-gray-900">{filteredTasks.length}</p>
                  </div>
                  <CheckSquare className="text-blue-600" size={24} />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-orange-600">{pendingTasks.length}</p>
                  </div>
                  <div className="w-6 h-6 bg-orange-600 rounded-full"></div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-green-600">{completedTasks.length}</p>
                  </div>
                  <div className="w-6 h-6 bg-green-600 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Task Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pending Tasks */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Pending Tasks ({pendingTasks.length})
                </h2>
                <div className="space-y-3">
                  {pendingTasks.length === 0 ? (
                    <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
                      <CheckSquare className="mx-auto text-gray-400 mb-3" size={48} />
                      <p className="text-gray-600">No pending tasks. Great job!</p>
                    </div>
                  ) : (
                    pendingTasks.map(task => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={setEditingTask}
                        onDelete={handleDeleteTask}
                        onToggleStatus={handleToggleStatus}
                        onUpdateDuration={handleUpdateDuration}
                      />
                    ))
                  )}
                </div>
              </div>

              {/* Completed Tasks */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Completed Tasks ({completedTasks.length})
                </h2>
                <div className="space-y-3">
                  {completedTasks.length === 0 ? (
                    <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
                      <CheckSquare className="mx-auto text-gray-400 mb-3" size={48} />
                      <p className="text-gray-600">No completed tasks yet.</p>
                    </div>
                  ) : (
                    completedTasks.map(task => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={setEditingTask}
                        onDelete={handleDeleteTask}
                        onToggleStatus={handleToggleStatus}
                        onUpdateDuration={handleUpdateDuration}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <ProductivityChart metrics={metrics} />
        )}

        {activeTab === 'insights' && (
          <AIInsights insights={insights} />
        )}
      </main>

      {/* Task Form Modal */}
      {(showTaskForm || editingTask) && (
        <TaskForm
          onSubmit={editingTask ? handleEditTask : handleCreateTask}
          onCancel={() => {
            setShowTaskForm(false);
            setEditingTask(null);
          }}
          initialTask={editingTask || undefined}
        />
      )}
    </div>
  );
}

export default App;