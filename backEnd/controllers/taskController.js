const taskModel = require('../model/taskModel');

// CREATE TASK
const createTask = async(req, res) => {
    try {
        console.log("User Creation Request");
        const {title, dueDay, selectedDate, task, user} = req.body;
        if(!title) {
            return res.status(400).json({
                success: false,
                message: "Cannot save an empty task"
            });
        }
        if(!task) {
            return res.status(400).json({
                success: false,
                message: "Title is required"
            });
        }
        const newTask = new taskModel({
            title,
            dueDay,
            selectedDate,
            task,
            user
        });
        await newTask.save();
        res.status(201).json({ 
            success: true, 
            task: newTask 
        });
        console.log("new task created !");
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message
        });
    }
};
// GET ALL TASKS ASSOCIATED WITH THE USER ??????????????
const getAllTasks = async (req, res) => {
    try {
        const userId = req.params.id;  // Corrected to use req.params.user
        const tasks = await taskModel.find({ user: userId });

        res.status(200).json({
            success: true,
            tasks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// EDIT TASK
const editTask = async (req, res) => {
    try {
        const { title, task, dueDay, selectedDate } = req.body;
        const updatedFields = {};

        if (title) updatedFields.title = title;
        if (task) updatedFields.task = task;
        if (dueDay) updatedFields.dueDay = dueDay;
        if (selectedDate) updatedFields.selectedDate = selectedDate;

        const taskToUpdate = await taskModel.findByIdAndUpdate(req.params.id, updatedFields, { new: true });

        if (!taskToUpdate) {
            return res.status(404).json({
                success: false,
                message: "Task not found.",
            });
        }
        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            updatedTask: taskToUpdate,
        });
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the task.",
            error: error.message,  // Include the error message for debugging
        });
    }
};


// DELETE TASK 
const deleteTask = async(req, res) => {
    const taskToDelete = req.params.id;
    try {
        const task = await taskModel.findByIdAndDelete(taskToDelete);
        if (!task) {
            return res.status(404).json({
              success: false,
              message: "Task not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Task Successfully Deleted"
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Task was not deleted"
        });
    }
};

module.exports = {
    createTask,
    getAllTasks,
    editTask,
    deleteTask
}