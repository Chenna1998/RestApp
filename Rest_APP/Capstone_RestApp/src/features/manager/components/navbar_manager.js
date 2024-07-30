import { Link, useNavigate } from 'react-router-dom';
import '../components/navbar_manager.css';
import logoImage from '../../../icons/incedo_logo.png'; 
import { useEffect, useState } from 'react';

function Navbar() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(localStorage.getItem('username'));

  const logout = () => {
    localStorage.clear();
    navigate('/?msg=logged_out')
  }

  useEffect(() => {
    const handleStorageChange = () => {
      setUsername(localStorage.getItem('username'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <nav className="nav">
      <div className="nav-left">
        <img src={logoImage} alt="Logo" className="logo" />
        <Link to="/manager" className="nav__brand">ManagerDashboard</Link>
      </div>
      <div className="nav-right">
        <span className="nav-username">Welcome {username} &nbsp;&nbsp;</span>
        <button className="btn btn-secondary" onClick={logout}>LogOut</button>
      </div>
    </nav>
  );
}

export default Navbar;
