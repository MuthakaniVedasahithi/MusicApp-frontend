import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

export default function SignupForm() {
  const [role, setRole] = useState("user");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url =
        role === "user"
          ? "http://localhost:7076/api/auth/user/signup"
          : "http://localhost:7076/api/auth/admin/signup";

      const res = await axios.post(url, form);
      console.log(res.data);
      setMessage("Signup successful!");

      // ✅ After 1.5 seconds, navigate back to login
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error(err);
      setMessage("Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <h2>🎶 Create Your VibeNest Account</h2>

      <label>
        Role:
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </label>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>

      {message && <p className="signup-message">{message}</p>}

      {/* ✅ Back to login button */}
      <button className="back-login-btn" onClick={() => navigate("/login")}>
        Back to Login
      </button>
    </div>
  );
}
