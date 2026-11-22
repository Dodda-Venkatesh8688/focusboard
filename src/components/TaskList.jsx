import { ClipboardList } from "lucide-react";
import TaskCard from "./TaskCard";

export default function TaskList({
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
  hasActiveFilters,
  onResetFilters,
}) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <ClipboardList size={28} />
        </div>
        <h3>No matching tasks found</h3>
        <p>
          {hasActiveFilters
            ? "Try adjusting your search keyword or clearing active status and priority filters."
            : "Create your first task to start tracking progress on FocusBoard."}
        </p>
        {hasActiveFilters && (
          <button type="button" className="secondary-btn" onClick={onResetFilters}>
            Clear Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="task-list" role="region" aria-label="Task list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}