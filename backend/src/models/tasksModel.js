const connection = require('./connection');

const getAll = async () => {
    const [tasks] = await connection.execute('SELECT * FROM tasks');
    return tasks;
};

const createTask = async (task, description) => {
    const { title } = task;
    const { description } = description;
    const dateUTC = new Date(Date.now()).toUTCString();
    const query = 'INSERT INTO tasks(title, description, status, created_at) VALUES (?,?,?,?)';
    const createdTask = await connection.execute(query, [title, description, 'pending', dateUTC]);
    return {insertId: createdTask.insertId}
};

const deleteTask = async (id) => {
    const [removedTask] = await connection.execute('DELETE FROM tasks WHERE id = ?', [id]);
    return removedTask;
};

const updateTask = async (id, task) => {
    const { title, description, status } = task;
    const query = 'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?';
    const [updatedTask] = await connection.execute(query, [title, description, status, id]);
    return updatedTask;
};

module.exports = {
    getAll,
    createTask,
    deleteTask,
    updateTask
};