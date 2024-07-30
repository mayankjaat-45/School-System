const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Assignment = require('../models/assignment');

// View all teachers
router.get('/teachers', async (req, res) => {
    try {
        const teachers = await User.find({ role: 'Teacher' });
        res.json(teachers);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// View all assignments
router.get('/assignments', async (req, res) => {
    try {
        const assignments = await Assignment.find({});
        res.json(assignments);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Re-grade an assignment
router.post('/assignments/:id/regrade', async (req, res) => {
    const { id } = req.params;
    const { grade } = req.body;

    try {
        const assignment = await Assignment.findById(id);
        if (!assignment) {
            res.status(404);
            throw new Error("Assignment Is Not found");
        }

        assignment.grade = grade;
        await assignment.save();
        res.json(assignment);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
