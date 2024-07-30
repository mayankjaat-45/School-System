const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    role: {
        type: String,
        enum: ['Principal', 'Student', 'Teacher'],
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);
