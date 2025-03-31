import React, { useState } from 'react';
import { addTask } from '../api';

const TaskForm = ({ onTaskAdded }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        await addTask(title);
        setTitle('');
        onTaskAdded();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Nueva tarea..." 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
            />
            <button type="submit">Agregar</button>
        </form>
    );
};

export default TaskForm;
