import { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../services/api';
import Navbar from '../components/Layout/Navbar';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const TaskForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext); 
    const isEdit = !!id;

    const [users, setUsers] = useState([]); 
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        priority: 'Medium',
        assignedTo: '' 
    });

    useEffect(() => {
        if (user?.role === 'admin') {
            API.get('/users')
                .then(res => setUsers(res.data))
                .catch(err => console.error(err));
        }

        if (isEdit) {
            API.get(`/tasks/${id}`)
                .then(res => {
                    const task = res.data;
                    setFormData({
                        title: task.title,
                        description: task.description,
                        dueDate: task.dueDate.split('T')[0],
                        priority: task.priority,
                        assignedTo: task.assignedTo?._id || task.assignedTo // Handle populated or raw ID
                    });
                })
                .catch(err => console.error(err));
        }
    }, [id, isEdit, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await API.put(`/tasks/${id}`, formData);
                toast.success('Task Updated!');
            } else {
                await API.post('/tasks', formData);
                toast.success('Task Created!');
            }
            navigate('/');
        } catch (error) {
            toast.error('Operation failed');
        }
    };

    return (
        <div className="min-h-screen bg-[#F0F0F0]">
            <Navbar />
            <div className="max-w-2xl mx-auto p-4 mt-8">
                <Button variant="neutral" onClick={() => navigate(-1)} className="mb-4 flex items-center gap-2 border-0 shadow-none hover:shadow-none hover:bg-transparent px-0">
                    <ArrowLeft /> Back
                </Button>

                <Card>
                    <h1 className="text-3xl font-black mb-6 uppercase">{isEdit ? 'Edit Task' : 'New Task'}</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        {/* Admin: Assign To User */}
                        {user?.role === 'admin' && (
                            <div className="flex flex-col gap-1">
                                <label className="font-bold border-l-4 border-black pl-2">Assign To</label>
                                <select
                                    className="w-full p-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white focus:outline-none"
                                    value={formData.assignedTo}
                                    onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                                >
                                    <option value="">-- Assign to Self --</option>
                                    {users.map(u => (
                                        <option key={u._id} value={u._id}>{u.username} ({u.email})</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <Input
                            label="Task Title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />

                        <div className="flex flex-col gap-1">
                            <label className="font-bold border-l-4 border-black pl-2">Description</label>
                            <textarea
                                className="w-full p-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:bg-yellow-50 min-h-[120px]"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Due Date"
                                type="date"
                                value={formData.dueDate}
                                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                required
                            />

                            <div className="flex flex-col gap-1">
                                <label className="font-bold border-l-4 border-black pl-2">Priority</label>
                                <select
                                    className="w-full p-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white focus:outline-none"
                                    value={formData.priority}
                                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                >
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            </div>
                        </div>

                        <Button type="submit" className="mt-4 text-lg py-3">
                            {isEdit ? 'SAVE CHANGES' : 'CREATE TASK'}
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default TaskForm;
