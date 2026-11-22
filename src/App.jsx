import { useState, useMemo, useEffect } from "react";
import { ListTodo, Clock3, CheckCircle2, TrendingUp, AlertTriangle } from "lucide-react";
import { initialTasks } from "./data/sampleTasks";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import FocusNotes from "./components/FocusNotes";
import SearchBar from "./components/SearchBar";
import FilterTabs from "./components/FilterTabs";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

export default function App() {
  const [tasks, setTasks] = useLocalStorage("focusboard_tasks", initialTasks);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    if (!taskToDelete) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setTaskToDelete(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [taskToDelete]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const todo = tasks.filter((t) => t.status === "To do").length;
    const inProgress = tasks.filter((t) => t.status === "In progress").length;
    const completed = tasks.filter((t) => t.status === "Completed").length;
    const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

    return {
      total,
      todo,
      inProgress,
      completed,
      completionRate,
    };
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch =
        normalizedQuery === "" || task.title.toLowerCase().includes(normalizedQuery);
      const matchesStatus = statusFilter === "All" || task.status === statusFilter;
      const matchesPriority = priorityFilter === "All" || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, searchQuery, statusFilter, priorityFilter]);

  const hasActiveFilters =
    searchQuery.trim() !== "" || statusFilter !== "All" || priorityFilter !== "All";

  const handleResetFilters = () => {
    setSearchQuery("");
    setStatusFilter("All");
    setPriorityFilter("All");
  };

  const handleOpenCreateForm = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((item) =>
          item.id === editingTask.id ? { ...item, ...taskData, id: editingTask.id } : item
        )
      );
    } else {
      const nextId =
        tasks.length > 0 ? Math.max(...tasks.map((t) => Number(t.id) || 0)) + 1 : 101;
      const newTask = {
        id: nextId,
        ...taskData,
      };
      setTasks((prev) => [newTask, ...prev]);
    }
    handleCloseForm();
  };

  const handleStatusChange = (taskId, nextStatus) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, status: nextStatus } : task))
    );
  };

  const handleConfirmDelete = () => {
    if (!taskToDelete) return;
    setTasks((prev) => prev.filter((task) => task.id !== taskToDelete.id));
    setTaskToDelete(null);
  };

  return (
    <div className="app-shell">
      <Sidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        taskCount={stats.total}
      />

      <div className="main-area">
        <Header
          onOpenMenu={() => setIsSidebarOpen(true)}
          onOpenCreateForm={handleOpenCreateForm}
          activeNav={activeNav}
        />

        <main className="dashboard-content">
          <section className="stats-grid" aria-label="Task Overview Statistics">
            <StatCard
              title="Total Tasks"
              value={stats.total}
              subtitle={`${stats.todo} waiting in To do`}
              icon={ListTodo}
              accent="blue"
            />
            <StatCard
              title="In Progress"
              value={stats.inProgress}
              subtitle="Currently active items"
              icon={Clock3}
              accent="amber"
            />
            <StatCard
              title="Completed"
              value={stats.completed}
              subtitle="Finished deliverables"
              icon={CheckCircle2}
              accent="green"
            />
            <StatCard
              title="Completion"
              value={`${stats.completionRate}%`}
              subtitle="Overall board progress"
              icon={TrendingUp}
              accent="purple"
            />
          </section>

          <FocusNotes />

          <section className="tasks-section" aria-label="Tasks Management">
            <div className="tasks-toolbar">
              <div className="toolbar-top">
                <div>
                  <h2 className="section-title">Tasks</h2>
                  <p className="section-subtitle">
                    Showing {filteredTasks.length} of {stats.total} tasks
                  </p>
                </div>
                <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
              </div>

              <FilterTabs
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                priorityFilter={priorityFilter}
                onPriorityChange={setPriorityFilter}
                counts={stats}
                hasActiveFilters={hasActiveFilters}
                onResetFilters={handleResetFilters}
              />
            </div>

            <TaskList
              tasks={filteredTasks}
              onEdit={handleOpenEditForm}
              onDelete={(task) => setTaskToDelete(task)}
              onStatusChange={handleStatusChange}
              hasActiveFilters={hasActiveFilters}
              onResetFilters={handleResetFilters}
            />
          </section>
        </main>
      </div>

      <TaskForm
        isOpen={isFormOpen}
        editingTask={editingTask}
        onClose={handleCloseForm}
        onSave={handleSaveTask}
      />

      {taskToDelete && (
        <div
          className="modal-backdrop"
          onClick={() => setTaskToDelete(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
        >
          <div className="confirm-panel" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-icon">
              <AlertTriangle size={24} />
            </div>
            <h2 id="delete-dialog-title">Delete Task?</h2>
            <p className="confirm-text">
              Are you sure you want to delete <strong>"{taskToDelete.title}"</strong>? This action
              cannot be undone.
            </p>
            <div className="confirm-actions">
              <button
                type="button"
                className="secondary-btn"
                onClick={() => setTaskToDelete(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="danger-btn"
                onClick={handleConfirmDelete}
                autoFocus
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}