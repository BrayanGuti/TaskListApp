import React, { useEffect, useState } from 'react';
import { getTasks, completeTask, deleteTask } from '../api';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const data = await getTasks();
        setTasks(data);
    };

    const handleComplete = async (id) => {
        await completeTask(id);
        fetchTasks();
    };

    const handleDelete = async (id) => {
        await deleteTask(id);
        fetchTasks();
    };

    return (
        <div>
            <h2>Lista de Tareas</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                            {task.title}
                        </span>
                        <button onClick={() => handleComplete(task.id)}>✅</button>
                        <button onClick={() => handleDelete(task.id)}>❌</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
