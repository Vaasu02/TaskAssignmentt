const Task = require('../models/Task');

// @desc    Get tasks with pagination
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
    try {
        const pageSize = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 1;

        // Filter: Admin can see all, User sees assigned.
        // Or if query 'assignedTo' is present, filter by that.
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

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
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

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
    try {
        const { title, description, dueDate, priority, assignedTo } = req.body;

        if (!title || !description || !dueDate || !priority) {
            return res.status(400).json({ message: 'Please add all required fields' });
        }

        // Logic: Who is this assigned to?
        // If Admin: can assign to anyone (passed in body).
        // If User: only to self? Or maybe users can assign to themselves.
        // Default to self if not provided or if not admin?
        // Requirement says "assign tasks to the user", implies Admin assigns.
        // Let's allow users to create tasks for themselves.

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

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
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
            { new: true } // Return new
        );

        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Check access
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
