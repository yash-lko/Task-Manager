export interface TaskFormProps {
    title: string;
    description: string;
    setTitle: (title: string) => void;
    setDescription: (description: string) => void;
    handleAddTask: () => void;
  }
  