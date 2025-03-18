import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ isLoggedIn, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate("/");
  };

  const navigateToHome = () => {
    navigate(`/home`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        <div className="navbar-logo main-head" onClick={navigateToHome}>
          <img src="/logo.jpg" alt="Logo 1" className="logo main-logo" />
          <h2 className="text-2xl font-bold text-center text-blue-700">Char Gam Darji Samaj</h2>
        </div>

        <div className="navbar-logo">
          <img src="/matajiPic.jpg" alt="Logo 1" className="logo second-logo" />
        </div>

        
        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          <Link to={isLoggedIn ? "/home" : "/"} className="nav-link">
            {isLoggedIn ? "Dashboard" : "Login"}
          </Link>
          {isLoggedIn && (
            <button className="nav-link logout-btn" onClick={handleLogoutClick}>
              Logout
            </button>
          )}
        </div>

        {/* Hamburger Menu */}
        <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
