import { useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import useTasks from '../../hooks/useTasks';
import TaskCard from './TaskCard';
import clsx from 'clsx';
import Navbar from '../Layout/Navbar';
import Button from '../UI/Button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PriorityBoard = () => {
    const { tasks, fetchTasks, updateTaskPriority, updateTaskStatus } = useTasks();
    const navigate = useNavigate();

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        const newPriority = destination.droppableId;

        
        updateTaskPriority(draggableId, newPriority);
    };

    const columns = ['High', 'Medium', 'Low'];
    const colColors = {
        High: 'bg-red-50 border-red-500',
        Medium: 'bg-yellow-50 border-yellow-500',
        Low: 'bg-green-50 border-green-500'
    };

    return (
        <div className="min-h-screen bg-[#F0F0F0]">
            <Navbar />
            <div className="p-4 overflow-x-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-black uppercase">Priority Board</h1>
                    <Button variant="neutral" onClick={() => navigate('/')} className="flex items-center gap-2">
                        <ArrowLeft /> Back to List
                    </Button>
                </div>

                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="flex gap-6 min-w-[1000px]">
                        {columns.map(priority => (
                            <Droppable key={priority} droppableId={priority}>
                                {(provided) => (
                                    <div
                                        className={clsx("flex-1 bg-white border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]", colColors[priority])}
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        <h2 className="text-2xl font-black mb-4 uppercase border-b-4 border-black pb-2">{priority} Priority</h2>

                                        <div className="flex flex-col gap-4">
                                            {tasks
                                                .filter(t => t.priority === priority)
                                                .map((task, index) => (
                                                    <Draggable key={task._id} draggableId={task._id} index={index}>
                                                        {(provided) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <TaskCard task={task} onStatusChange={(id, status) => updateTaskStatus(id, status)} />
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                            {provided.placeholder}
                                        </div>
                                    </div>
                                )}
                            </Droppable>
                        ))}
                    </div>
                </DragDropContext>
            </div>
        </div>
    );
};

export default PriorityBoard;
