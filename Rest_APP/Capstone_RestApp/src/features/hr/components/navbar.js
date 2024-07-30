import { Link, useNavigate } from 'react-router-dom';
import '../../hr/components/navbar.css';
import logoImage from '../../../icons/incedo_logo.png'; 
import { useEffect, useState } from 'react';

function Navbar() {

  const navigate = useNavigate();
  const [username, setUsername] = useState(localStorage.getItem('username'));

  const logout = ()=>{
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
        <ul className="nav__menu">
          <li className="nav__item">
            <Link to="/hr" className="nav__link">
              HR Dashboard
            </Link>
          </li>
          <li className="nav__item">
            <Link to="/manageronboarding" className="nav__link">
              Manager Onboarding
            </Link>
          </li>
          <li className="nav__item">
            <Link to="/employeeonboarding" className="nav__link">
              Employee Onboarding
            </Link>
          </li>
        </ul>
      </div>
      <div className="nav-right">
        <span className="nav-username">Welcome {username}</span>
        <button className="btn btn-secondary" onClick={logout}>LogOut</button>
      </div>
    </nav>
  );
}

export default Navbar;
