import { useState, useEffect } from 'react';
import API from '../services/api';
import Navbar from '../components/Layout/Navbar';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import Card from '../components/UI/Card';
import { Trash2, UserPlus, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminUserList = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ username: '', email: '', password: '', role: 'user' });

    const fetchUsers = async () => {
        try {
            const { data } = await API.get('/users');
            setUsers(data);
        } catch (error) {
            toast.error('Failed to load users');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            await API.post('/users', newUser);
            toast.success('User created');
            setNewUser({ username: '', email: '', password: '', role: 'user' });
            fetchUsers();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create user');
        }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm('Delete this user?')) return;
        try {
            await API.delete(`/users/${id}`);
            setUsers(users.filter(u => u._id !== id));
            toast.success('User removed');
        } catch (error) {
            toast.error('Failed to delete');
        }
    };

    return (
        <div className="min-h-screen bg-[#F0F0F0]">
            <Navbar />
            <div className="max-w-5xl mx-auto p-4 mt-8">
                <h1 className="text-4xl font-black uppercase mb-8 flex items-center gap-3">
                    <ShieldAlert size={40} className="text-red-500" /> Admin Panel: Users
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Create User Form */}
                    <Card className="h-fit">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <UserPlus /> Add New User
                        </h2>
                        <form onSubmit={handleAddUser} className="flex flex-col gap-4">
                            <Input
                                label="Username"
                                value={newUser.username}
                                onChange={e => setNewUser({ ...newUser, username: e.target.value })}
                                required
                            />
                            <Input
                                label="Email"
                                type="email"
                                value={newUser.email}
                                onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                                required
                            />
                            <Input
                                label="Password"
                                type="password"
                                value={newUser.password}
                                onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                                required
                            />
                            <div className="flex flex-col gap-1">
                                <label className="font-bold border-l-4 border-black pl-2">Role</label>
                                <select
                                    className="w-full p-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white focus:outline-none"
                                    value={newUser.role}
                                    onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <Button type="submit" variant="secondary" className="mt-2">Create User</Button>
                        </form>
                    </Card>

                    {/* User List */}
                    <div className="lg:col-span-2 grid gap-4">
                        {users.map(user => (
                            <Card key={user._id} className="flex justify-between items-center p-4">
                                <div>
                                    <div className="font-black text-xl">{user.username}</div>
                                    <div className="text-sm font-bold opacity-60">{user.email}</div>
                                    <span className={`text-xs uppercase font-bold px-2 py-0.5 border-2 border-black ${user.role === 'admin' ? 'bg-red-300' : 'bg-gray-200'}`}>
                                        {user.role}
                                    </span>
                                </div>
                                <Button variant="danger" onClick={() => handleDeleteUser(user._id)} className="px-3">
                                    <Trash2 size={18} />
                                </Button>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminUserList;
