import { Calendar, CheckCircle } from 'lucide-react';
import Card from '../UI/Card';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

const TaskCard = ({ task, onStatusChange }) => {
    const priorityColors = {
        High: 'bg-[#FF6B6B]',
        Medium: 'bg-[#FFD93D]',
        Low: 'bg-[#6BCB77]'
    };

    return (
        <Card className={clsx("relative transition-all hover:-translate-y-1", task.status === 'Completed' && 'opacity-60 bg-gray-100')}>
            <div className="flex justify-between items-start mb-2">
                <span className={clsx("text-xs font-black border-2 border-black px-2 py-0.5 uppercase", priorityColors[task.priority])}>
                    {task.priority}
                </span>
                <div className="flex items-center gap-2">
                    <button onClick={() => onStatusChange(task._id, task.status === 'Pending' ? 'Completed' : 'Pending')}>
                        <CheckCircle size={24} className={clsx("transition-colors", task.status === 'Completed' ? 'fill-black text-white' : 'text-gray-300 hover:text-black')} />
                    </button>
                </div>
            </div>

            <Link to={`/task/${task._id}`}>
                <h3 className={clsx("text-xl font-bold mb-2", task.status === 'Completed' && 'line-through decoration-4')}>{task.title}</h3>
                <p className="text-sm font-medium text-gray-600 line-clamp-2 mb-4">{task.description}</p>
            </Link>

            <div className="border-t-2 border-black pt-2 flex items-center gap-2 text-xs font-bold">
                <Calendar size={14} />
                {new Date(task.dueDate).toLocaleDateString()}
            </div>
        </Card>
    );
};

export default TaskCard;
