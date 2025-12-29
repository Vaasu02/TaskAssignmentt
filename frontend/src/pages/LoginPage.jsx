import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';

const LoginPage = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(formData);
        if (success) navigate('/');
    };

    return (
        <div className="min-h-screen bg-[#F0F0F0] flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <h1 className="text-3xl font-black mb-6 text-center">TASK MANAGER</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <Input
                        label="Password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <Button type="submit" className="mt-4">LOG IN</Button>
                </form>
                <div className="mt-4 text-center font-bold">
                    Don't have an account? <Link to="/register" className="underline decoration-2">Sign up</Link>
                </div>
            </Card>
        </div>
    );
};

export default LoginPage;
