const express = require('express');

const adminRouter = express.Router();

// admin controller
const {
    getUser,
    loginAdmin,
    createAdmin,
    editAdmin,
    deleteAdmin,
    isAdmin,
    getUserById,
    makeUserAdmin,
    getAllUsers
} = require('../controllers/adminController');

// task controller 
const {
    createTask,
    getAllTasks,
    editTask,
    deleteTask
} = require('../controllers/taskController');

adminRouter.post('/getUser', getUser);
adminRouter.post('/createAdmin', createAdmin);
adminRouter.post('/adminLogin', loginAdmin);
adminRouter.put('/editAdmin/:id', editAdmin);
adminRouter.delete('/deleteAdmin/:id', deleteAdmin);
adminRouter.get('/isAdmin/:id', isAdmin);
adminRouter.get('/getAllUsers', getAllUsers);
adminRouter.get('/getUserById/:id', getUserById);

adminRouter.post('/createTask', createTask);
adminRouter.put('/editTask/:id', editTask);
adminRouter.put('/makeUserAdmin/:id', makeUserAdmin);
adminRouter.get('/getTasks/:id', getAllTasks);
adminRouter.delete('/deleteTask/:id', deleteTask);

module.exports = adminRouter;
