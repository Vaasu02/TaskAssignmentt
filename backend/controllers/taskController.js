const Task = require('../models/Task');


const getTasks = async (req, res) => {
    try {
        const pageSize = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 1;

        
        let query = {};

        if (req.user.role !== 'admin') {
            query.assignedTo = req.user.id;
        }

        const count = await Task.countDocuments(query);
        const tasks = await Task.find(query)
            .populate('assignedTo', 'username email')
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .sort({ createdAt: -1 }); // Newest first

        res.json({
            tasks,
            page,
            pages: Math.ceil(count / pageSize),
            total: count
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('assignedTo', 'username');

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Check access
        if (req.user.role !== 'admin' && task.assignedTo._id.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const createTask = async (req, res) => {
    try {
        const { title, description, dueDate, priority, assignedTo } = req.body;

        if (!title || !description || !dueDate || !priority) {
            return res.status(400).json({ message: 'Please add all required fields' });
        }


        let assignee = req.user.id;
        if (req.user.role === 'admin' && assignedTo) {
            assignee = assignedTo;
        }

        const task = await Task.create({
            title,
            description,
            dueDate,
            priority,
            assignedTo: assignee,
            createdBy: req.user.id
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Check access
        if (req.user.role !== 'admin' && task.assignedTo.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } 
        );

        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        
        if (req.user.role !== 'admin' && task.assignedTo.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await task.deleteOne();
        res.json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
};
