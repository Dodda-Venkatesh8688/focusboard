import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  FolderKanban,
  Settings,
  X,
  Sparkles,
} from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "tasks", label: "My Tasks", icon: CheckSquare },
  { id: "calendar", label: "Schedule", icon: Calendar },
  { id: "projects", label: "Categories", icon: FolderKanban },
  { id: "settings", label: "Preferences", icon: Settings },
];

export default function Sidebar({ activeNav, setActiveNav, isOpen, onClose, taskCount }) {
  const handleSelect = (id) => {
    setActiveNav(id);
    if (onClose) onClose();
  };

  return (
    <>
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} aria-hidden="true" />}
      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`} aria-label="Primary Navigation">
        <div className="sidebar-top">
          <div className="brand">
            <div className="brand-icon">
              <Sparkles size={18} />
            </div>
            <div className="brand-text">
              <span className="brand-name">FocusBoard</span>
              <span className="brand-tag">Task Workspace</span>
            </div>
          </div>
          <button
            type="button"
            className="mobile-close-btn"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`nav-item ${isActive ? "active" : ""}`}
                onClick={() => handleSelect(item.id)}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {item.id === "tasks" && <span className="nav-badge">{taskCount}</span>}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="workspace-card">
            <p className="workspace-title">Daily Focus Mode</p>
            <p className="workspace-desc">
              Keep priorities clear and track progress across every task stage.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}