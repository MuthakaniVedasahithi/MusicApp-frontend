import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminPage.css";

export default function AdminPage() {
  const navigate = useNavigate();
  const adminData = JSON.parse(localStorage.getItem("user")) || {};

  const handleLogout = () => {
    
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    
    navigate("/login");
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>🎶 Welcome Admin!</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <p>Here you can manage the songs, add new ones, or remove existing tracks.</p>

      <div className="admin-info">
        <p><strong>Name:</strong> {adminData.name || "Admin"}</p>
        <p><strong>Email:</strong> {adminData.email || "Not available"}</p>
      </div>
    </div>
  );
}
