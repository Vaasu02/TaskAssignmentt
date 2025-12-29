import { useState, useEffect } from 'react';
import API from '../services/api';
import Navbar from '../components/Layout/Navbar';
import TaskCard from '../components/Tasks/TaskCard';
import Button from '../components/UI/Button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    const fetchTasks = async (pageNum) => {
        try {
            const { data } = await API.get(`/tasks?page=${pageNum}&limit=6`);
            setTasks(data.tasks);
            setPage(data.page);
            setTotalPages(data.pages);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTasks(page);
    }, [page]);

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const { data } = await API.put(`/tasks/${id}`, { status: newStatus });
            setTasks(tasks.map(t => t._id === id ? data : t));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA]">
            <Navbar />

            <main className="p-4 max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8 mt-4">
                    <h1 className="text-4xl font-black uppercase">Your Tasks</h1>
                    <div className="flex gap-4">
                        <Button onClick={() => navigate('/board')} variant='secondary' className="flex items-center gap-2">
                            Priority Board
                        </Button>
                        <Button onClick={() => navigate('/create-task')} className="flex items-center gap-2">
                            <Plus size={20} className="stroke-[3px]" /> New Task
                        </Button>
                    </div>
                </div>

                {tasks.length === 0 ? (
                    <div className="text-center py-20 opacity-50 font-bold text-2xl">
                        NO TASKS YET. GO MAKE SOME!
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tasks.map(task => (
                            <TaskCard key={task._id} task={task} onStatusChange={handleStatusUpdate} />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                <div className="flex justify-center gap-4 mt-12">
                    <Button
                        disabled={page === 1}
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        variant="neutral"
                        className="disabled:opacity-50"
                    >
                        PREV
                    </Button>
                    <span className="flex items-center font-black text-xl border-2 border-black px-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        {page} / {totalPages}
                    </span>
                    <Button
                        disabled={page === totalPages}
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        variant="neutral"
                        className="disabled:opacity-50"
                    >
                        NEXT
                    </Button>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
