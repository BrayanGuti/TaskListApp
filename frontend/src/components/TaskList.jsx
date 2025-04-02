import React, { useEffect, useState } from 'react';
import { getTasks, completeTask, deleteTask, editTask } from '../api';
import './TaskList.css';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingText, setEditingText] = useState('');
    const [filter, setFilter] = useState('all');

    // Load tasks from LocalStorage on mount
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        console.log('TASKS RECUPERADAS DEL LOCALSTORAGE:', storedTasks);
        setTasks(storedTasks);
        fetchTasks();
    }, []);

    // Save tasks to LocalStorage whenever they change
    useEffect(() => {
        console.log('Tasks updated:', tasks);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const fetchTasks = async () => {
        try {
            const data = await getTasks();
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleComplete = async (id) => {
        await completeTask(id);
        fetchTasks();
    };

    const handleDelete = async (id) => {
        await deleteTask(id);
        fetchTasks();
    };

    const handleEdit = (task) => {
        setEditingTaskId(task.id);
        setEditingText(task.title);
    };

    const handleSaveEdit = async () => {
        if (editingText.trim() === '') return;

        try {
            await editTask(editingTaskId, editingText);
            setEditingTaskId(null);
            setEditingText('');
            fetchTasks();
        } catch (error) {
            console.error('Error saving task:', error);
            alert('No se pudo guardar la tarea. Intente de nuevo.');
        }
    };

    const handleCancelEdit = () => {
        setEditingTaskId(null);
        setEditingText('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSaveEdit();
        } else if (e.key === 'Escape') {
            handleCancelEdit();
        }
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'all') return true;
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
    });

    return (
        <div className="task-container">
            <div className="task-header">
                <h2>Lista de Tareas</h2>
                <div className="task-filters">
                    <button 
                        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        Todas
                    </button>
                    <button 
                        className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
                        onClick={() => setFilter('active')}
                    >
                        Pendientes
                    </button>
                    <button 
                        className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                        onClick={() => setFilter('completed')}
                    >
                        Completadas
                    </button>
                </div>
            </div>
            
            <ul>
                {filteredTasks.map((task) => (
                    <li key={task.id} className={`task-enter ${task.completed ? 'completed' : ''}`}>
                        {editingTaskId === task.id ? (
                            <div className="edit-form">
                                <input 
                                    type="text" 
                                    id={`edit-task-${task.id}`}
                                    name={`edit-task-${task.id}`}
                                    value={editingText} 
                                    onChange={(e) => setEditingText(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    autoFocus
                                />
                                <div className="form-buttons">
                                    <button 
                                        className="save-btn" 
                                        onClick={handleSaveEdit}
                                    >
                                        Guardar
                                    </button>
                                    <button 
                                        className="cancel-btn" 
                                        onClick={handleCancelEdit}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="task-item">
                                <span className={`task-title ${task.completed ? 'completed-text' : ''}`}>
                                    {task.title}
                                </span>
                                <div className="task-buttons">
                                    <button 
                                        className="complete-btn"
                                        onClick={() => handleComplete(task.id)}
                                        title={task.completed ? "Marcar como pendiente" : "Marcar como completada"}
                                    >
                                        {task.completed ? '↩️' : '✅'}
                                    </button>
                                    <button 
                                        className="edit-btn"
                                        onClick={() => handleEdit(task)}
                                        title="Editar tarea"
                                    >
                                        ✏️
                                    </button>
                                    <button 
                                        className="delete-btn"
                                        onClick={() => handleDelete(task.id)}
                                        title="Eliminar tarea"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;