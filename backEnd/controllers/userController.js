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

// LOGIN USER 
const loginUser = async(req, res) => {
    const { userName, Password } = req.body;
  
    try {
        const user = await userModel.findOne({userName})
        if(!user){
            return res.status(404).json({
                success: 'false',
                message: "User is not found in the database"
            })
        }

        if (user && (await bcrypt.compare(Password, user.Password))) {
            return res.status(200).json({ success: true, message: 'Login successful.' });
          } else {
            return res.status(401).json({ success: false, message: 'Invalid username or password.' });
        }

    } catch (error) {
        console.error('ERROR:', error.message);
        return res.status(500).json({
            success: false,
            message: `An error occurred while creating the admin: ${userName}.`,
        });
    }
};

// CREATE A NEW USER
const createUser = async (req, res) => {
    try {
        console.log("Request to create a user received");
        const { userName, Password } = req.body;
        // In case username or password field is empty
        if (!userName || !Password) {
            return res.status(400).json({
                success: false,
                message: "Both username and password are required.",
            });
        }
        // Check if the user already exists in database
        const userExists = await USER.findOne({ userName });
        if (userExists) {
            return res.status(409).json({
                success: false,
                message: "Username is already in use. Please choose another one.",
            });
        }
        // Hashing Password
        const hashedPassword = await bcrypt.hash(Password, 10);
        const newUser = new USER({
            userName,
            Password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            newUser,
        });

        console.log(`User: ${userName} created Successfully`);
        
    } catch (error) {
        console.error("ERROR:", error.message);
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating the user.",
        });
    }
};

// EDITING USER
const editUser = async (req, res) => {
    try {
        const { userName, Password } = req.body;
        const user = await USER.findById(req.params.id);

        // if the user doesn't exist
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Only update the password if it has been changed
        if (Password) {
            const hashedPassword = await bcrypt.hash(Password, 10);
            user.Password = hashedPassword;
        }

        user.userName = userName;

        await user.save();

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user,
        });

        console.log(`User: ${userName} updated successfully`);

    } catch (error) {
        console.error("Error:", error.message);
        return res.status(401).json({
            success: false,
            message: "An error occurred while updating the user.",
        });
    }
};

// DELETING USER
const deleteUser = async (req, res) => {
    const userIdToDelete = req.params.id;
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
        console.error("Error:", error.message);
        return res.status(401).json({
            success: false,
            message: "An error occurred while deleting the user.",
        });
    }
};

module.exports = {
    getUser,
    loginUser,
    createUser,
    editUser,
    deleteUser 
};
