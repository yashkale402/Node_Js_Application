const { Task } = require('../models');

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({ where: { userId: req.user.id }, order: [['createdAt', 'DESC']] });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.createTask = async (req, res) => {
    try {
        const { title, description, priority, dueDate } = req.body;
        const task = await Task.create({
            title,
            description,
            priority,
            dueDate,
            userId: req.user.id,
        });

        // Real-time update
        global.io.emit('taskCreated', task);

        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOne({ where: { id, userId: req.user.id } });

        if (!task) return res.status(404).json({ error: 'Task not found' });

        await task.update(req.body);

        // Real-time update
        global.io.emit('taskUpdated', task);

        res.json(task);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOne({ where: { id, userId: req.user.id } });

        if (!task) return res.status(404).json({ error: 'Task not found' });

        await task.destroy();

        // Real-time update
        global.io.emit('taskDeleted', id);

        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};
