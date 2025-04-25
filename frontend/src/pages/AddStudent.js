import { useState } from 'react';
import axios from 'axios';
import '../css/AddStudent.css';

export default function AddStudent() {
  const [formData, setFormData] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    department: '',
    enrollmentYear: '',
    isActive: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      studentId: Number(formData.studentId),
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      dob: formData.dob,
      department: formData.department.trim(),
      enrollmentYear: Number(formData.enrollmentYear),
      isActive: formData.isActive
    };

    try {
      const response = await axios.post('http://localhost:5000/students', payload);
      alert('Student added!');
      console.log(response.data);
    } catch (error) {
      console.error("AxiosError:", error.response?.data || error.message);
      alert(`Error adding student: ${error.response?.data?.message || 'Check console for details.'}`);
    }
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <label>Student ID
        <input name="studentId" onChange={handleChange} value={formData.studentId} />
      </label>
      <label>First Name
        <input name="firstName" onChange={handleChange} value={formData.firstName} />
      </label>
      <label>Last Name
        <input name="lastName" onChange={handleChange} value={formData.lastName} />
      </label>
      <label>Email
        <input name="email" onChange={handleChange} value={formData.email} />
      </label>
      <label>Date of Birth
        <input name="dob" type="date" onChange={handleChange} value={formData.dob} />
      </label>
      <label>Department
        <input name="department" onChange={handleChange} value={formData.department} />
      </label>
      <label>Enrollment Year
        <input name="enrollmentYear" onChange={handleChange} value={formData.enrollmentYear} />
      </label>
      <label>Active
        <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} />
      </label>
      <button type="submit">Add Student</button>
    </form>
  );
}
