import React, { useState } from 'react';
import { TaskFormProps } from '../interfaces/taskForm';

const TaskForm: React.FC<TaskFormProps> = ({
  title,
  description,
  setTitle,
  setDescription,
  handleAddTask,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setErrors({}); // Reset errors when modal closes
  };

  const validateFields = () => {
    const newErrors: { title?: string; description?: string } = {};
    if (!title) {
      newErrors.title = "Task title is required";
    }
    if (!description) {
      newErrors.description = "Task description is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = () => {
    if (validateFields()) {
      handleAddTask(); // Call the add task function if validation passes
      closeModal(); // Close the modal only if validation passes
    }
  };

  return (
    <div>
      {/* Open Modal Button */}
      <button className="btn btn-primary d-flex align-items-center" onClick={openModal}>
        <i className="fa fa-plus me-2"></i>
        Add Task
      </button>

      {/* Modal */}
      <div
        className={`modal fade ${isModalOpen ? 'show' : ''}`}
        style={{ display: isModalOpen ? 'block' : 'none' }}
        tabIndex={-1}
        role="dialog"
        aria-hidden={!isModalOpen}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content task-modal">
            {/* Modal Header */}
            <div className="modal-header task-modal-header">
              <h5 className="modal-title text-primary">
                <i className="fa fa-tasks me-2"></i> Add a New Task
              </h5>
              <button type="button" className="close" onClick={closeModal}>
                <span aria-hidden="true" className="h3 text-danger close-icon">&times;</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="task-title" className="form-label">Task Title</label>
                <input
                  type="text"
                  id="task-title"
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  placeholder="Enter task title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="task-desc" className="form-label">Task Description</label>
                <textarea
                  id="task-desc"
                  className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  placeholder="Enter task description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                ></textarea>
                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer task-modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>
                <i className="fa fa-times me-2"></i> Close
              </button>
              <button className="btn btn-primary d-flex align-items-center" onClick={handleSubmit}>
                <i className="fa fa-check me-2"></i> Add Task
              </button>
            </div>
          </div>
        </div>
      </div>

    
      {isModalOpen && (
        <div className="modal-backdrop" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }} onClick={closeModal}></div>
      )}
    </div>
  );
};

export default TaskForm;
