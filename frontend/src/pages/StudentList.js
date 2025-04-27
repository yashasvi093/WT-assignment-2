import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import '../css/StudentList.css';

export default function StudentList() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const res = await api.get('/students');
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const deleteStudent = async (id) => {
    await api.delete(`/students/${id}`);
    fetchStudents();
  };

  return (
    <div className="student-list-container">
      <h2>Students List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Department</th>
            <th>Enrollment Year</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td>{student.studentId}</td>
              <td>{student.firstName} {student.lastName}</td>
              <td>{student.email}</td>
              <td>{student.dob ? new Date(student.dob).toLocaleDateString() : ''}</td>
              <td>{student.department}</td>
              <td>{student.enrollmentYear}</td>
              <td>{student.isActive ? 'Yes' : 'No'}</td>
              <td>
                <Link to={`/edit-student/${student._id}`}>Edit</Link>
                <button onClick={() => deleteStudent(student._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
