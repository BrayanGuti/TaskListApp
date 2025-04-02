import React from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './app.css';

const App = () => {
    return (
        <div className="app-container">
            <h1 className="app-title">Gestor de Tareas</h1>
            <p className="app-subtitle">Organiza tus actividades de manera sencilla y efectiva</p>
            
            <TaskForm onTaskAdded={() => window.location.reload()} />
            
            <hr className="component-divider" />
            
            <TaskList />
        </div>
    );
};

export default App;
