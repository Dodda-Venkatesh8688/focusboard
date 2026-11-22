import { useState, useEffect } from "react";
import { X } from "lucide-react";

const emptyForm = {
  title: "",
  description: "",
  category: "Development",
  status: "To do",
  priority: "Medium",
  dueDate: "",
};

export default function TaskForm({ isOpen, editingTask, onClose, onSave }) {
  const [formData, setFormData] = useState(emptyForm);
  const [titleError, setTitleError] = useState("");

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || "",
        description: editingTask.description || "",
        category: editingTask.category || "Development",
        status: editingTask.status || "To do",
        priority: editingTask.priority || "Medium",
        dueDate: editingTask.dueDate || "",
      });
    } else {
      setFormData(emptyForm);
    }
    setTitleError("");
  }, [editingTask, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "title" && titleError) {
      setTitleError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = formData.title.trim();

    if (!trimmedTitle) {
      setTitleError("Please enter a valid task title.");
      return;
    }

    onSave({
      ...formData,
      title: trimmedTitle,
      description: formData.description.trim(),
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="task-form-title">
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 id="task-form-title">{editingTask ? "Edit Task" : "Create New Task"}</h2>
          <button
            type="button"
            className="close-modal-btn"
            onClick={onClose}
            aria-label="Close task form"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="task-form" noValidate>
          <div className="form-group">
            <label htmlFor="task-title" className="form-label">
              Title <span className="required-star">*</span>
            </label>
            <input
              id="task-title"
              type="text"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Enter task title"
              className={`form-input ${titleError ? "input-error" : ""}`}
              autoFocus
            />
            {titleError && (
              <p className="error-text" role="alert">
                {titleError}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="task-description" className="form-label">
              Description
            </label>
            <textarea
              id="task-description"
              rows="3"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Add task details or notes..."
              className="form-textarea"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="task-status" className="form-label">
                Status
              </label>
              <select
                id="task-status"
                value={formData.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className="form-select"
              >
                <option value="To do">To do</option>
                <option value="In progress">In progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="task-priority" className="form-label">
                Priority
              </label>
              <select
                id="task-priority"
                value={formData.priority}
                onChange={(e) => handleChange("priority", e.target.value)}
                className="form-select"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="task-category" className="form-label">
                Category
              </label>
              <select
                id="task-category"
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="form-select"
              >
                <option value="Design">Design</option>
                <option value="Development">Development</option>
                <option value="Testing">Testing</option>
                <option value="Research">Research</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="task-due-date" className="form-label">
                Due Date
              </label>
              <input
                id="task-due-date"
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleChange("dueDate", e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="secondary-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-btn">
              {editingTask ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}