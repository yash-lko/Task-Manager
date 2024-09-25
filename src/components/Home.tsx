import React, { useEffect, useState, useMemo } from 'react';
import { signOut, getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
} from 'firebase/firestore';
import { db } from './firebase';
import Loader from './Loader';
import Navbar from './homeComponents/Navbar';
import TaskForm from './homeComponents/TaskForm';
import TaskList from './homeComponents/TaskList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Task } from './interfaces/home';
const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [taskLoading, setTaskLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      } else {
        fetchUserName(user.uid);
        fetchTasks(user.uid);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const fetchUserName = async (userId: string) => {
    const userDoc = doc(db, 'Users', userId);
    const userSnapshot = await getDoc(userDoc);
    if (userSnapshot.exists()) {
      setUserName(userSnapshot.data().name);
    }
  };

  const fetchTasks = (userId: string) => {
    setTaskLoading(true);
    const q = query(collection(db, 'tasks'), where('userId', '==', userId));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedTasks = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Task[];
        setTasks(fetchedTasks);
        setTaskLoading(false);
      },
      (error) => {
        console.error('Error fetching tasks:', error);
        setTaskLoading(false);
      }
    );
    return () => unsubscribe();
  };

  const handleAddTask = async () => {
    if (title.trim() === '' || description.trim() === '') {
      toast.error('Title and description cannot be empty!', {
        position: 'bottom-right',
      });
      return;
    }

    const isDuplicate = tasks.some(
      (task) => task.title === title && task.description === description
    );

    if (isDuplicate) {
      toast.error('This task already exists!', {
        position: 'bottom-right',
      });
      return;
    }

    const user = auth.currentUser;
    if (user) {
      try {
        await addDoc(collection(db, 'tasks'), {
          userId: user.uid,
          title,
          description,
          createdAt: new Date(),
        });
        setTitle('');
        setDescription('');
        toast.success('Task added successfully!', {
          position: 'bottom-right',
        });
      } catch (error) {
        console.error('Error adding task:', error);
        toast.error('Failed to add task!', { position: 'bottom-right' });
      }
    }
  };

  const handleEditTask = async (taskId: string) => {
    if (editTitle.trim() === '' || editDescription.trim() === '') {
      toast.error('Title and description cannot be empty!', {
        position: 'bottom-right',
      });
      return;
    }
    const taskDocRef = doc(db, 'tasks', taskId);
    try {
      await updateDoc(taskDocRef, {
        title: editTitle,
        description: editDescription,
      });
      setEditTaskId(null);
      setEditTitle('');
      setEditDescription('');
      toast.success('Task updated successfully!', {
        position: 'bottom-right',
      });
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task!', { position: 'bottom-right' });
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    const taskDocRef = doc(db, 'tasks', taskId);
    try {
      await deleteDoc(taskDocRef);
      toast.success('Task deleted successfully!', {
        position: 'bottom-right',
      });
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task!', { position: 'bottom-right' });
    }
  };
  const handleLogout = () => {
    signOut(auth)
      .then(() => {

        toast.success('Logged out successfully!', {
          position: 'bottom-right',
        });


        return new Promise((resolve) => {
          setTimeout(resolve, 2000);
        });
      })
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error('Signout Failed!', error);
        toast.error('Failed to log out!', { position: 'bottom-right' });
      });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tasks, searchTerm]);

  const startEditTask = (task: Task) => {
    setEditTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container-fluid">
      <Navbar
        userName={userName}
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        handleLogout={handleLogout}
      />

      <div className="row">
        <div className="col-lg-2 mb-4">
          <TaskForm
            title={title}
            description={description}
            setTitle={setTitle}
            setDescription={setDescription}
            handleAddTask={handleAddTask}
          />
        </div>

        <div className="col-lg-10 mb-4">
          <TaskList
            tasks={tasks}
            taskLoading={taskLoading}
            filteredTasks={filteredTasks}
            editTaskId={editTaskId}
            editTitle={editTitle}
            editDescription={editDescription}
            startEditTask={startEditTask}
            setEditTaskId={setEditTaskId}
            setEditTitle={setEditTitle}
            setEditDescription={setEditDescription}
            handleEditTask={handleEditTask}
            handleDeleteTask={handleDeleteTask}
          />
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Home;
