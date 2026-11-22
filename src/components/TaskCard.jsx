import { Calendar, Pencil, Trash2, Tag } from "lucide-react";

const statusStyles = {
  "To do": "badge-todo",
  "In progress": "badge-progress",
  Completed: "badge-completed",
};

const priorityStyles = {
  High: "priority-high",
  Medium: "priority-medium",
  Low: "priority-low",
};

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  return (
    <article className="task-card">
      <div className="task-card-main">
        <div className="task-top-meta">
          <span className={`status-badge ${statusStyles[task.status] || "badge-todo"}`}>
            {task.status}
          </span>
          <span className={`priority-pill ${priorityStyles[task.priority] || "priority-medium"}`}>
            {task.priority} Priority
          </span>
          <span className="category-chip">
            <Tag size={13} aria-hidden="true" />
            <span>{task.category}</span>
          </span>
        </div>

        <h3 className="task-title">{task.title}</h3>
        {task.description && <p className="task-desc">{task.description}</p>}

        <div className="task-footer-meta">
          <span className="due-date">
            <Calendar size={14} aria-hidden="true" />
            <span>Due: {task.dueDate || "No due date"}</span>
          </span>
        </div>
      </div>

      <div className="task-card-actions">
        <label htmlFor={`status-${task.id}`} className="sr-only">
          Change status for {task.title}
        </label>
        <select
          id={`status-${task.id}`}
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
          className="status-select"
          aria-label={`Change status for ${task.title}`}
        >
          <option value="To do">To do</option>
          <option value="In progress">In progress</option>
          <option value="Completed">Completed</option>
        </select>

        <button
          type="button"
          className="action-icon-btn edit-btn"
          onClick={() => onEdit(task)}
          aria-label={`Edit task ${task.title}`}
          title="Edit task"
        >
          <Pencil size={16} />
        </button>

        <button
          type="button"
          className="action-icon-btn delete-btn"
          onClick={() => onDelete(task)}
          aria-label={`Delete task ${task.title}`}
          title="Delete task"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </article>
  );
}