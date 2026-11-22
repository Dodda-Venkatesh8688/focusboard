import { RotateCcw } from "lucide-react";

const statusOptions = ["All", "To do", "In progress", "Completed"];
const priorityOptions = ["All", "High", "Medium", "Low"];

export default function FilterTabs({
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  counts,
  hasActiveFilters,
  onResetFilters,
}) {
  return (
    <div className="filters-bar">
      <div className="status-tabs" role="tablist" aria-label="Filter tasks by status">
        {statusOptions.map((status) => {
          const isActive = statusFilter === status;
          const count =
            status === "All"
              ? counts.total
              : status === "To do"
              ? counts.todo
              : status === "In progress"
              ? counts.inProgress
              : counts.completed;

          return (
            <button
              key={status}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`status-tab ${isActive ? "active" : ""}`}
              onClick={() => onStatusChange(status)}
            >
              <span>{status}</span>
              <span className="tab-count">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="filter-actions">
        <label htmlFor="priority-filter" className="sr-only">
          Filter by priority
        </label>
        <select
          id="priority-filter"
          value={priorityFilter}
          onChange={(e) => onPriorityChange(e.target.value)}
          className="priority-select"
          aria-label="Filter by priority"
        >
          {priorityOptions.map((priority) => (
            <option key={priority} value={priority}>
              {priority === "All" ? "Priority: All" : `Priority: ${priority}`}
            </option>
          ))}
        </select>

        {hasActiveFilters && (
          <button
            type="button"
            className="reset-filters-btn"
            onClick={onResetFilters}
            aria-label="Reset all search and filters"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
}