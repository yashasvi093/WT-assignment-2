const express = require('express');
const Student = require('../models/modelStudent');
const router = express.Router();

// POST /students
router.post('/', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send(student);
  } catch (err) {
    res.status(400).send(err);
  }
});

// GET /students
router.get('/', async (req, res) => {
  const students = await Student.find();
  res.send(students);
});

// GET /students/:id
router.get('/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) return res.status(404).send('Student not found');
  res.send(student);
});

// PUT /students/:id
router.put('/:id', async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).send('Student not found');
    res.send(updated);
  } catch (err) {
    res.status(400).send(err);
  }
});

// DELETE /students/:id
router.delete('/:id', async (req, res) => {
  const deleted = await Student.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).send('Student not found');
  res.send({ message: 'Deleted successfully' });
});

module.exports = router;
