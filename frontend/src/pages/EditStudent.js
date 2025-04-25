import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/EditStudent.css';

export default function EditStudent() {
  const [formData, setFormData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/students/${id}`)
      .then(res => setFormData(res.data));
  }, [id]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/students/${id}`, formData);
    alert('Student updated!');
    navigate('/students');
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <label>Student ID
        <input name="studentId" value={formData.studentId || ''} onChange={handleChange} />
      </label>
      <label>First Name
        <input name="firstName" value={formData.firstName || ''} onChange={handleChange} />
      </label>
      <label>Last Name
        <input name="lastName" value={formData.lastName || ''} onChange={handleChange} />
      </label>
      <label>Email
        <input name="email" value={formData.email || ''} onChange={handleChange} />
      </label>
      <label>Date of Birth
        <input name="dob" type="date" value={formData.dob?.substring(0, 10) || ''} onChange={handleChange} />
      </label>
      <label>Department
        <input name="department" value={formData.department || ''} onChange={handleChange} />
      </label>
      <label>Enrollment Year
        <input name="enrollmentYear" value={formData.enrollmentYear || ''} onChange={handleChange} />
      </label>
      <label>Active
        <input type="checkbox" name="isActive" checked={formData.isActive || false} onChange={handleChange} />
      </label>
      <button type="submit">Update Student</button>
    </form>
  );
}
