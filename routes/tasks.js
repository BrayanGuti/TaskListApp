const express = require('express');
const { getTasks, addTask, completeTask, deleteTask } = require('../controllers/tasksController');

const router = express.Router();

router.get('/tasks', getTasks);
router.post('/tasks', addTask);
router.put('/tasks/:id/complete', completeTask);
router.delete('/tasks/:id', deleteTask);

module.exports = router;
  