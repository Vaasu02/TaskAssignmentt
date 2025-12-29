import { useState, useCallback } from 'react';
import API from '../services/api';
import toast from 'react-hot-toast';

const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTasks = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await API.get('/tasks?limit=100'); // Fetch all for board view
            setTasks(data.tasks);
        } catch (error) {
            toast.error('Failed to load tasks');
        } finally {
            setLoading(false);
        }
    }, []);

    const updateTaskStatus = async (id, status) => {
        try {
            const { data } = await API.put(`/tasks/${id}`, { status });
            setTasks(prev => prev.map(t => t._id === id ? data : t));
            return data;
        } catch (error) {
            toast.error('Update failed');
        }
    };

    const updateTaskPriority = async (id, priority) => {
        try {
            const { data } = await API.put(`/tasks/${id}`, { priority });
            setTasks(prev => prev.map(t => t._id === id ? data : t));
            return data;
        } catch (error) {
            toast.error('Priority update failed');
        }
    };

    return { tasks, loading, fetchTasks, updateTaskStatus, updateTaskPriority, setTasks };
};

export default useTasks;
