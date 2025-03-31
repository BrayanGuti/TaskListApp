import React from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App = () => {
    return (
        <div>
            <h1>Gestor de Tareas</h1>
            <TaskForm onTaskAdded={() => window.location.reload()} />
            <TaskList />
        </div>
    );
};

export default App;
