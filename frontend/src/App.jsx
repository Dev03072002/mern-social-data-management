import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import UserForm from "./components/UserForm";
import Navbar from "./components/Navbar";
import FamilyMemberForm from "./components/FamilyMemberForm";
import ProtectedRoute from "./components/ProtectedRoutes";
import MarriedDaughterForm from "./components/MarriedDaughterForm";
import MarriedDaughterFamilyForm from "./components/MarriedDaughterFamilyForm";
import UserList from "./components/UserList";
import FamilyMemberList from "./components/FamilyMemberList";
import EditUser from "./components/EditUser";
import EditFamilyMember from "./components/EditFamilyMember";
import AddAdmin from "./components/AddAdmin";
import SignUp from "./components/SignUp";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setIsLoggedIn(false);
        setUserRole(null);
        setLoading(false);
        return;
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      try {
        const response = await axios.get(`${API_BASE_URL}/api/auth/validate`);
        if (response.status === 200) {
          setIsLoggedIn(true);
          setUserRole(response.data.role);
        } else {
          localStorage.removeItem("authToken");
          setIsLoggedIn(false);
          setUserRole(null);
        }
      } catch (error) {
        console.error("Invalid token, logging out");
        localStorage.removeItem("authToken");
        setIsLoggedIn(false);
        setUserRole(null);
      } finally {
        setLoading(false); // Authentication check completed
      }
    };

    checkAuth();
  }, []);

  const handleLogin = async (userCredentials) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, userCredentials);
      const { token, role } = response.data;

      localStorage.setItem("authToken", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setIsLoggedIn(true);
      setUserRole(role);
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    localStorage.removeItem("authToken");
    delete axios.defaults.headers.common["Authorization"];
  };

  if (loading) {
    return <div>Loading...</div>; // Prevents redirects before auth check
  }

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} userRole={userRole} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Login handleLogin={handleLogin} />} />
        <Route path="/home" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Home userRole={userRole} /></ProtectedRoute>} />
        <Route path="/add-main-family-member" element={<ProtectedRoute isLoggedIn={isLoggedIn} requiredRole="admin" currentRole={userRole}><UserForm /></ProtectedRoute>} />
        <Route path="/add-family-member/:id" element={<ProtectedRoute isLoggedIn={isLoggedIn} requiredRole="admin" currentRole={userRole}><FamilyMemberForm /></ProtectedRoute>} />
        <Route path="/add-daughter-detail/:id" element={<ProtectedRoute isLoggedIn={isLoggedIn} requiredRole="admin" currentRole={userRole}><MarriedDaughterForm /></ProtectedRoute>} />
        <Route path="/add-daughter-family-member/:id" element={<ProtectedRoute isLoggedIn={isLoggedIn} requiredRole="admin" currentRole={userRole}><MarriedDaughterFamilyForm /></ProtectedRoute>} />
        <Route path="/user-list" element={<ProtectedRoute isLoggedIn={isLoggedIn}><UserList userRole={userRole} /></ProtectedRoute>} />
        <Route path="/edit-user/:id" element={<ProtectedRoute isLoggedIn={isLoggedIn} requiredRole="admin" currentRole={userRole}><EditUser /></ProtectedRoute>} />
        <Route path="/family-members/:id" element={<ProtectedRoute isLoggedIn={isLoggedIn}><FamilyMemberList userRole={userRole} /></ProtectedRoute>} />
        <Route path="/edit-family-member/:id" element={<ProtectedRoute isLoggedIn={isLoggedIn} requiredRole="admin" currentRole={userRole}><EditFamilyMember /></ProtectedRoute>} />
        <Route path="/add-admin" element={<ProtectedRoute isLoggedIn={isLoggedIn} requiredRole="admin" currentRole={userRole}><AddAdmin /></ProtectedRoute>} />
        <Route path="/sign-up" element={<SignUp />} />
        
        <Route path="*" element={<Navigate to={isLoggedIn ? "/home" : "/"} />} />
      </Routes>
    </Router>
  );
}

export default App;
