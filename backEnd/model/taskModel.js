const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    dueDay: {
        type: Date,
        enum: ['today', 'tomorrow', 'selectedDate'],
        default: 'today'
    },
    selectedDate: {
        type: Date
    },
    task: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel',
        required: true
    }
});

module.exports = mongoose.model('Task', taskSchema);
