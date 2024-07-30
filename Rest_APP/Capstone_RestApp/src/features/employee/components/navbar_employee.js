import { Link, useNavigate } from 'react-router-dom';
import '../../employee/components/navbar_employee.css';
import logoImage from '../../../icons/incedo_logo.png'; 
import { useEffect, useState } from 'react';

function Navbar() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(localStorage.getItem('username'));

  const logout = () => {
    localStorage.clear();
    navigate('/?msg=logged_out');
  }

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUsername = localStorage.getItem('username');
      console.log('Username from local storage:', storedUsername); // Debugging line
      setUsername(storedUsername);
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    console.log('Current username state:', username); 
  }, [username]);

  return (
    <nav className="nav">
      <div className="nav-left">
        <img src={logoImage} alt="Logo" className="logo" />
        <Link to="/employee" className="nav__link nav__brand">
          EmployeeDashboard
        </Link>
      </div>
      <div className="nav-right">
        <span className="nav-username">Welcome {username}</span>
        <button className="btn btn-secondary" onClick={logout}>LogOut</button>
      </div>
    </nav>
  );
}

export default Navbar;
