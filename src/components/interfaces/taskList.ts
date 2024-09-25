interface Task {
    id: string;
    title: string;
    description: string;
    userId: string;
    createdAt: Date;
  }
  
  export interface TaskListProps {
    tasks: Task[];
    taskLoading: boolean;
    filteredTasks: Task[];
    editTaskId: string | null;
    editTitle: string;
    editDescription: string;
    startEditTask: (task: Task) => void;
    setEditTaskId: (id: string | null) => void;
    setEditTitle: (title: string) => void;
    setEditDescription: (description: string) => void;
    handleEditTask: (taskId: string) => void;
    handleDeleteTask: (taskId: string) => void;
  }