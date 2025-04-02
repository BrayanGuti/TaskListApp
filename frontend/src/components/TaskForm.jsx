import React, { useState } from 'react';
import { addTask } from '../api';
import './TaskForm.css';

const TaskForm = ({ onTaskAdded }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        try {
            const newTask = await addTask(title);
            const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
            localStorage.setItem('tasks', JSON.stringify([...storedTasks, newTask]));
            setTitle('');
            onTaskAdded();
        } catch (error) {
            console.error('Error al añadir tarea:', error);
            alert('No se pudo añadir la tarea. Inténtalo de nuevo.');
        }
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input 
                type="text" 
                className="task-input"
                id="new-task"
                name="new-task"
                placeholder="Añadir nueva tarea..." 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                autoComplete="off"
            />
            <button 
                type="submit" 
                className="add-btn"
                disabled={!title.trim()}
            >
                Agregar
            </button>
        </form>
    );
};

export default TaskForm;