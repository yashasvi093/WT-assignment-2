const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: { type: Number, required: true },
  firstName: { type: String, required: true },
  lastName: String,
  email: { type: String, required: true },
  dob: { type: Date, required: true },
  department: String,
  enrollmentYear: { type: Number, required: true },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Student', studentSchema);
