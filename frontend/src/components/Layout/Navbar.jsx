import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import Button from '../UI/Button';
import { LayoutList, LogOut } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="border-b-4 border-black bg-white p-4 flex justify-between items-center sticky top-0 z-50">
            <Link to="/" className="text-2xl font-black flex items-center gap-2">
                <LayoutList size={28} className="stroke-[3px]" />
                TASK MASTER
            </Link>
            <div className="flex items-center gap-4">
                <span className="font-bold hidden md:block">@{user?.username}</span>
                {user?.role === 'admin' && (
                    <Link to="/users">
                        <Button variant="secondary" className="py-1 px-3 text-sm">Users</Button>
                    </Link>
                )}
                <Button onClick={logout} variant="danger" className="py-1 px-3 flex items-center gap-2">
                    <LogOut size={18} /> Exit
                </Button>
            </div>
        </nav>
    );
};

export default Navbar;
