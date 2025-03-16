import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import UserForm from "./components/UserForm";
import Navbar from "./components/Navbar";
import FamilyMemberForm from "./components/FamilyMemberForm";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      try {
        const response = await axios.get(`${API_BASE_URL}/api/auth/validate`);
        if (response.status === 200) {
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem("authToken");
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Invalid token, logging out");
        localStorage.removeItem("authToken");
        setIsLoggedIn(false);
      } finally {
        setLoading(false); // Authentication check completed
      }
    };

    checkAuth();
  }, []);

  const handleLogin = async (userCredentials) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, userCredentials);
      const { token } = response.data;

      localStorage.setItem("authToken", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("authToken");
    delete axios.defaults.headers.common["Authorization"];
  };

  if (loading) {
    return <div>Loading...</div>; // Prevents redirects before auth check
  }

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Login handleLogin={handleLogin} />} />
        <Route path="/home" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Home /></ProtectedRoute>} />
        <Route path="/add-main-family-member" element={<ProtectedRoute isLoggedIn={isLoggedIn}><UserForm /></ProtectedRoute>} />
        <Route path="/add-family-member/:id" element={<ProtectedRoute isLoggedIn={isLoggedIn}><FamilyMemberForm /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
