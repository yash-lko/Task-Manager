import React from 'react';
import { TaskListProps } from '../interfaces/taskList';

const TaskList: React.FC<TaskListProps> = ({
  taskLoading,
  filteredTasks,
  editTaskId,
  editTitle,
  editDescription,
  startEditTask,
  setEditTaskId,
  setEditTitle,
  setEditDescription,
  handleEditTask,
  handleDeleteTask,
}) => {
  return (
    <div className="container p-0">

      <div className="row">
        {taskLoading ? (
          <div className="col-12 loading-text">
            <div className="d-inline-block py-3 px-4 main">

              <strong className="text-danger">Loading Tasks...</strong>
            </div>
          </div>
        ) : (
          <>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task, index) => (
                <div key={task.id} className="col-md-3 mb-3">
                  <div className="task-card card shadow-sm">
                    <div className="card-body">
                      {editTaskId === task.id ? (
                        <div className="d-flex flex-column mb-2">
                          <input
                            type="text"
                            className="form-control mb-2"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                          />
                          <textarea
                            className="form-control mb-2"
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            rows={2}
                          ></textarea>
                          <div className="d-flex justify-content-between">
                            <i
                              className="fas fa-check text-success"
                              onClick={() => handleEditTask(task.id)}
                              style={{ cursor: 'pointer', marginRight: '10px' }}
                            ></i>
                            <i
                              className="fas fa-times text-secondary"
                              onClick={() => setEditTaskId(null)}
                              style={{ cursor: 'pointer' }}
                            ></i>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h5 className="card-title">{task.title}</h5>
                          <p className="card-text">{task.description}</p>
                          <div className="d-flex justify-content-between">
                            <i
                              className="fas fa-edit text-warning me-2"
                              onClick={() => startEditTask(task)}
                              style={{ cursor: 'pointer' }}
                            ></i>
                            <i
                              className="fas fa-trash text-danger"
                              onClick={() => handleDeleteTask(task.id)}
                              style={{ cursor: 'pointer' }}
                            ></i>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 task-not-found">
                <div className="d-inline-block py-3 px-4 main">
                  <i className="fas fa-exclamation-triangle me-2 text-danger"></i>
                  <strong className="text-danger">No tasks found!</strong> Start adding new tasks to see them here.
                </div>
              </div>




            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TaskList;
