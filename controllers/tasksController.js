const db = require('../database/db');

// Obtener todas las tareas
const getTasks = (req, res) => {
    db.all('SELECT * FROM tasks', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

// Agregar una nueva tarea
const addTask = (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });
    
    console.log('Adding task:', title); // Debugging line
    db.run('INSERT INTO tasks (title) VALUES (?)', [title], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, title, completed: 0 });
    });
};

// Marcar tarea como completada
const completeTask = (req, res) => {
    const { id } = req.params;
    db.run('UPDATE tasks SET completed = 1 WHERE id = ?', [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Task marked as completed' });
    });
};

// Eliminar una tarea
const deleteTask = (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM tasks WHERE id = ?', [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Task deleted' });
    });
};

module.exports = { getTasks, addTask, completeTask, deleteTask };
