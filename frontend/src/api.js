const API_URL = 'http://localhost:3000/api';

export const getTasks = async () => {
    const response = await fetch(`${API_URL}/tasks`);
    return response.json();
};

export const addTask = async (title) => {
    await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
    });
};

export const completeTask = async (id) => {
    await fetch(`${API_URL}/tasks/${id}/complete`, { method: 'PUT' });
};

export const deleteTask = async (id) => {
    await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
};
