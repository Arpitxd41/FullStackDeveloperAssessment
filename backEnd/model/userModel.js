// MODEL

const mongoose = require('mongoose');
const {schema} = mongoose;
const todoSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin'],
    }
});
module.exports = mongoose.model("User", todoSchema);