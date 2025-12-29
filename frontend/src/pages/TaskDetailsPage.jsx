import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import Navbar from '../components/Layout/Navbar';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import ConfirmDialog from '../components/UI/ConfirmDialog';
import { ArrowLeft, Calendar, Trash2, Edit } from 'lucide-react';
import toast from 'react-hot-toast';

const TaskDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        API.get(`/tasks/${id}`)
            .then(res => setTask(res.data))
            .catch(() => navigate('/'));
    }, [id, navigate]);

    const handleDelete = async () => {
        try {
            await API.delete(`/tasks/${id}`);
            toast.success('Task deleted');
            navigate('/');
        } catch (error) {
            toast.error('Could not delete');
        }
    };

    if (!task) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-[#F0F0F0]">
            <Navbar />
            <div className="max-w-3xl mx-auto p-4 mt-8">
                <Button variant="neutral" onClick={() => navigate(-1)} className="mb-4 flex items-center gap-2 border-0 shadow-none hover:shadow-none hover:bg-transparent px-0">
                    <ArrowLeft /> Back
                </Button>

                <Card className="min-h-[400px] flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <span className="text-sm font-black border-2 border-black px-3 py-1 bg-yellow-300 uppercase">
                            {task.priority} Priority
                        </span>
                        <div className="text-sm font-bold opacity-60">
                            Status: {task.status}
                        </div>
                    </div>

                    <h1 className="text-4xl font-black mb-4 leading-tight">{task.title}</h1>

                    <div className="flex items-center gap-2 font-bold mb-8 border-b-2 border-gray-200 pb-4">
                        <Calendar size={20} />
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                    </div>

                    <p className="text-lg leading-relaxed whitespace-pre-wrap flex-grow">
                        {task.description}
                    </p>

                    <div className="flex gap-4 mt-8 pt-6 border-t-4 border-black">
                        <Link to={`/edit-task/${id}`} className="flex-1">
                            <Button variant="primary" className="w-full flex justify-center items-center gap-2">
                                <Edit size={20} /> Edit Task
                            </Button>
                        </Link>
                        <Button variant="danger" onClick={() => setShowDeleteConfirm(true)} className="flex-1 flex justify-center items-center gap-2">
                            <Trash2 size={20} /> Delete
                        </Button>
                    </div>
                </Card>
            </div>

            <ConfirmDialog
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={handleDelete}
                title="Delete Task?"
                message="This action cannot be undone. Are you sure you want to proceed?"
            />
        </div>
    );
};

export default TaskDetailsPage;
