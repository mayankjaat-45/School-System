const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: String,
    content: String,
    studentId: mongoose.Schema.Types.ObjectId,
    teacherId: mongoose.Schema.Types.ObjectId,
    grade: {
        type: Number,
        default: null
    },
    status: {
        type: String,
        enum: ['Draft', 'Submitted'],
        default: 'Draft'
    }
});

module.exports = mongoose.model('Assignment', assignmentSchema);
