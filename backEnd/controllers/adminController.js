const USER = require('../model/userModel');
const taskModel = require('../model/taskModel');
const bcrypt = require('bcryptjs');


// GET USER 
const getUser = async (req, res) => {
    try {
        const user = await USER.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No user found with the given id",
            });
        }
        
        
        res.status(200).json({
            success: true,
            user,
        });
        console.log(`User: ${user.userName} is called`);
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching users.",
        });
    }
};

// LOGIN ADMIN 
const loginAdmin = async(req, res) => {
    const { userName, Password } = req.body;
  
    try {
        const user = await userModel.findOne({userName})
        if(!user){
            return res.status(404).json({
                success: 'false',
                message: "User is not found in the database"
            })
        }
        const hashedPassword = await bcrypt.hash(Password, 10);
        if (userModel.Password !== hashedPassword) {
            return res.status(401).json({ success: false, message: 'Invalid password.' });
          }

        return res.status(200).json({ success: true, message: 'Login successful.' });

    } catch (error) {
        console.error('ERROR:', error.message);
        return res.status(500).json({
            success: false,
            message: `An error occurred while creating the admin: ${userName}.`,
        });
    }
};

// CREATE A NEW USER
const createAdmin = async (req, res) => {
    try {
        console.log('Request to create an Admin received');
        const { userName, Password } = req.body;

        if (!userName || !Password) {
            return res.status(400).json({
                success: false,
                message: 'Username and Password mandatory',
            });
        }
        const userExists = await USER.findOne({ userName });
        if (userExists) {
            return res.status(409).json({
                success: false,
                message: 'Username is already in use. Please choose another one',
            });
        }
        const hashedPassword = await bcrypt.hash(Password, 10);
        const newUser = new USER({
            userName,
            Password: hashedPassword,
            role: 'admin'
        });
        await newUser.save();
        res.status(201).json({
            success: true,
            message: 'Admin registered successfully',
            newUser,
        });
        console.log(`Admin: ${userName} created Successfully`);
    } catch (error) {
        console.error('ERROR:', error.message);
        return res.status(500).json({
            success: false,
            message: `An error occurred while creating the admin: ${userName}.`,
        });
    }
};

// EDITING USER
const editAdmin = async (req, res) => {
    try {
        const { userName, Password } = req.body;
        const user = await USER.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: `${userName} not found in the Database`,
            });
        }

        // Only update the password if it has changed
        if (Password) {
            const hashedPassword = await bcrypt.hash(Password, 10);
            user.Password = hashedPassword;
            res.status(201).json({
                message: `Password changed for the user ${userName}`
            })
        }
        // Update the userName
        if (userName) {
            user.userName = userName;
            await user.save();
            res.status(200).json({
                success: true,
                message: "UserName changed successfully",
                user: user,
            });
            console.log(`User: ${userName} updated successfully`);   
        }
        
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(401).json({
            success: false,
            message: "An error occurred while updating the user.",
        });
    }
};

// DELETING USER
const deleteAdmin = async (req, res) => {
    const userIdToDelete = req.params.id;
    // user to delete its own id
    if (userIdToDelete !== req.params.id) {
        return res.status(403).json({
            success: false,
            message: "You are not authorized to delete this user.",
        });
    }
    try {
        const user = await USER.findByIdAndDelete(userIdToDelete);
        // if user is not there in the database
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        // delete all the tasks associated with the user
        await taskModel.deleteMany({ user_id: userIdToDelete });
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });

        console.log(`User: ${user.userName} deleted successfully`);
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(401).json({
            success: false,
            message: "An error occurred while deleting the user.",
        });
    }
};

// Middleware function to check if a user is an admin
const isAdmin = async (req, res, next) => {
    const user = await USER.findById(req.params.id);
    if (user && user.role === 'admin') {
        res.status(201).json({
            message: 'User is Admin',
            role: 'Admin'
        })
        next();
    } else {
        res.status(403).json({ success: false, message: "Access denied."});
    }
};

// GET USER 
const getUserById = async (req, res) => {
    try {
        const user = await USER.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No user found with the given id",
            });
        }
        
        
        res.status(200).json({
            success: true,
            user,
        });
        console.log(`User: ${user.userName} is called`);
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching users.",
        });
    }
};

const makeUserAdmin = async (userId) => {
    await USER.findByIdAndUpdate(userId, { role: "admin" });
};

// GET ALL USERS (Admin-only)
const getAllUsers = async (req, res) => {
    try {
        const users = await USER.find();

        if (!users) {
            return res.status(404).json({
                success: false,
                message: "No users found",
            });
        }

        res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching users.",
        });
    }
};

module.exports = {
    getUser,
    loginAdmin,
    createAdmin,
    editAdmin,
    makeUserAdmin,
    deleteAdmin,
    isAdmin,
    getUserById,
    getAllUsers
};
