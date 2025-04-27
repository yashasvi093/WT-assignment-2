import { useState } from 'react';
import api from '../api';
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
      console.log(api.defaults.baseURL);
      const response = await api.post('/students', payload);
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
        <input name="studentId" value={formData.studentId} onChange={handleChange} />
      </label>
      <label>First Name
        <input name="firstName" value={formData.firstName} onChange={handleChange} />
      </label>
      <label>Last Name
        <input name="lastName" value={formData.lastName} onChange={handleChange} />
      </label>
      <label>Email
        <input name="email" value={formData.email} onChange={handleChange} />
      </label>
      <label>Date of Birth
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
      </label>
      <label>Department
        <input name="department" value={formData.department} onChange={handleChange} />
      </label>
      <label>Enrollment Year
        <input name="enrollmentYear" value={formData.enrollmentYear} onChange={handleChange} />
      </label>
      <label>Active
        <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} />
      </label>
      <button type="submit">Add Student</button>
    </form>
  );
}
