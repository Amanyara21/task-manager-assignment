const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// In-memory storage for tasks
const tasks = {};

// Create a new task
router.post('/tasks', (req, res) => {
    try {
        const { title, description, dueDate, status } = req.body;
        if (!title || !description || !status || !dueDate) {
            return res.status(400).send({ error: "Title, Description, Status and Due date are required" });
        } else {
            const id = uuidv4();
            tasks[id] = { id, title, description, dueDate, status };
            res.status(201).send({ success: "Task added successfully", task: tasks[id] });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Task addition failed due to internal server error" });
    }
});

// Retrieve all tasks
router.get('/tasks', (req, res) => {
    try {
        res.status(200).send({ tasks: Object.values(tasks) });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

// Retrieve a single task by ID
router.get('/tasks/:id', (req, res) => {
    try {
        const id = req.params.id;
        const task = tasks[id];
        if (!task) {
            return res.status(404).send({ error: "Task not found" });
        }
        res.status(200).send({ task });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

// Update an existing task by ID
router.put('/tasks/:id', (req, res) => {
    try {
        const id = req.params.id;
        const { title, description, dueDate, status } = req.body;

        if (!title || !description || !status || !dueDate) {
            return res.status(400).send({ error: "Title, Description, Status and Due dueDate cannot be null" });
        }

        const task = tasks[id];
        if (!task) {
            return res.status(404).send({ error: "Task not found" });
        }

        tasks[id] = { ...task, title, description, dueDate, status };
        res.status(200).send({ success: "Task updated successfully", task: tasks[id] });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Task update failed due to internal server error" });
    }
});

// Delete a task by ID
router.delete('/tasks/:id', (req, res) => {
    try {
        const id = req.params.id;
        const task = tasks[id];
        if (!task) {
            return res.status(404).send({ error: "Task not found" });
        }
        delete tasks[id];
        res.status(200).send({ success: 'Task Deleted Successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Deletion failed due to server error" });
    }
});

module.exports = router;
