import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';

const RegisterPage = () => {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await register(formData);
        if (success) navigate('/');
    };

    return (
        <div className="min-h-screen bg-[#88AAEE] flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-white">
                <h1 className="text-3xl font-black mb-6 text-center">JOIN THE SQUAD</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        label="Username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
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
                    <Button type="submit" variant="secondary" className="mt-4">REGISTER</Button>
                </form>
                <div className="mt-4 text-center font-bold">
                    Already have an account? <Link to="/login" className="underline decoration-2">Log in</Link>
                </div>
            </Card>
        </div>
    );
};

export default RegisterPage;
