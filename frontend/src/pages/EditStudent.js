import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import '../css/EditStudent.css';

export default function EditStudent() {
  const [formData, setFormData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/students/${id}`).then(res => setFormData(res.data));
  }, [id]);
  
  const handleSubmit = async e => {
    e.preventDefault();
    await api.put(`/students/${id}`, formData);
    alert('Student updated!');
    navigate('/students');
  };
  

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
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
      <button type="submit">Update Student</button>
    </form>
  );
}
