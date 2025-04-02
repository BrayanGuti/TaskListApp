const API_URL = 'http://localhost:3000/api';

// Agregar estas líneas para debugging
function logRequest(method, url, body) {
  console.log(`${method} ${url}`, body || '');
}

export const getTasks = async () => {
  logRequest('GET', `${API_URL}/tasks`);
  try {
    const response = await fetch(`${API_URL}/tasks`);
    if (!response.ok) {
      throw new Error('Error al obtener las tareas');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const completeTask = async (id) => {
  logRequest('PUT', `${API_URL}/tasks/${id}/complete`);
  try {
    const response = await fetch(`${API_URL}/tasks/${id}/complete`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) {
      throw new Error('Error al completar la tarea');
    }
    return await response.json();
  } catch (error) {
    console.error('Error completing task:', error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  logRequest('DELETE', `${API_URL}/tasks/${id}`);
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error al eliminar la tarea');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

export const addTask = async (title) => {
  logRequest('POST', `${API_URL}/tasks`, { title });
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });
    if (!response.ok) {
      throw new Error('Error al añadir la tarea');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

// Add this function to your existing api.js file
export const editTask = async (id, title) => {
  logRequest('PUT', `${API_URL}/tasks/${id}`, { title });
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });
    
    if (!response.ok) {
      throw new Error('Error al editar la tarea');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error editing task:', error);
    throw error; // ¡Importante! Relanza el error para que handleSaveEdit lo capture
  }
};