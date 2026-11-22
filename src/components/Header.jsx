import { Menu, Plus, Bell } from "lucide-react";

export default function Header({ onOpenMenu, onOpenCreateForm, activeNav }) {
  const titles = {
    dashboard: "Task Overview",
    tasks: "All Tasks",
    calendar: "Upcoming Schedule",
    projects: "Task Categories",
    settings: "Workspace Preferences",
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="top-header">
      <div className="header-left">
        <button
          type="button"
          className="menu-toggle-btn"
          onClick={onOpenMenu}
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>
        <div>
          <p className="header-date">{today}</p>
          <h1 className="header-title">{titles[activeNav] || "Task Overview"}</h1>
        </div>
      </div>

      <div className="header-right">
        <button
          type="button"
          className="icon-btn"
          aria-label="Notifications"
          title="All tasks synced locally"
        >
          <Bell size={18} />
          <span className="status-dot" />
        </button>

        <button type="button" className="primary-btn" onClick={onOpenCreateForm}>
          <Plus size={18} />
          <span>Add Task</span>
        </button>
      </div>
    </header>
  );
}