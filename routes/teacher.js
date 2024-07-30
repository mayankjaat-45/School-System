const express = require('express');
const router = express.Router();
const Assignment = require('../models/assignment');

// List all assignments submitted to the teacher
router.get('/assignments', async (req, res) => {
    const teacherId = req.user._id;

    try {
        const assignments = await Assignment.find({ teacherId });
        res.json(assignments);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Grade an assignment
router.post('/assignments/:id/grade', async (req, res) => {
    const { id } = req.params;
    const { grade } = req.body;

    try {
        const assignment = await Assignment.findById(id);
        if (!assignment) {
            res.status(404);
            throw new Error("Assignment Is Not Found");
        }

        if (assignment.teacherId.toString() !== req.user._id.toString()) {
             res.status(403);
            throw new Error('Not authorized to grade this assignment');
        }

        assignment.grade = grade;
        await assignment.save();
        res.json(assignment);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
