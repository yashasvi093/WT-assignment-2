import { Link } from 'react-router-dom';
import '../css/Navbar.css';  // 👈 Import the CSS file

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/students">Student List</Link>
      <Link to="/add-student">Add Student</Link>
    </nav>
  );
}
