const express = require('express');
const userRoute = express.Router();

const {
    createUser,
    loginUser,
    editUser,
    deleteUser
} = require('../controllers/userController');

const {
    createTask,
    getAllTasks,
    editTask,
    deleteTask
} = require('../controllers/taskController');

// USER ROUTES;
userRoute.post('/createUser', createUser);
userRoute.post('/userLogin', loginUser);
userRoute.put('/editUser/:id', editUser);
userRoute.delete('/deleteUser/:id', deleteUser);

// TASK ROUTES;
userRoute.post('/createTask', createTask);
userRoute.get('/getTasks/:id', getAllTasks);
userRoute.put('/editTask/:id', editTask);
userRoute.delete('/deleteTask/:id', deleteTask);

module.exports = userRoute;