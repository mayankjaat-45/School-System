const express = require('express');
const router = express.Router();
const Assignment = require('../models/assignment');
const User = require('../models/user');

// Create a draft assignment
router.post('/assignments', async (req, res) => {
    const { title, content } = req.body;
    const studentId = req.user._id;

    try {
        const assignment = new Assignment({
            title,
            content,
            studentId
        });
        await assignment.save();
        res.json(assignment);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// List all created assignments
router.get('/assignments', async (req, res) => {
    const studentId = req.user._id;

    try {
        const assignments = await Assignment.find({ studentId });
        res.json(assignments);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Submit an assignment
router.post('/assignments/:id/submit', async (req, res) => {
    const { id } = req.params;
    const teacherId = req.body.teacherId;

    try {
        const assignment = await Assignment.findById(id);
        if (!assignment) {
            res.status(404);
            throw new Error("Assignment Is Not Submitted");
        }

        assignment.status = 'Submitted';
        assignment.teacherId = teacherId;
        await assignment.save();
        res.json(assignment);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
