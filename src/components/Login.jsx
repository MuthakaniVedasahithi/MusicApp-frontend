import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function LoginPage() {
  const [role, setRole] = useState("user");
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url =
      role === "user"
        ? "http://localhost:7076/api/auth/user/login"
        : "http://localhost:7076/api/auth/admin/login";

    try {
      const res = await axios.post(url, form, { validateStatus: () => true });

      if (res.status === 200) {
        console.log("Login response:", res.data);
        setMessage("Login successful!");

        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("role", role);

        navigate("/home");
      } else {
        setMessage("Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setMessage("Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2>🎵 Login to VibeNest</h2>
      <div className="login-box">
        <label className="role-label">
          Role:
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="role-select"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>

        {/* ✅ Signup button */}
        <button
          type="button"
          className="signup-btn"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>

        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  );
}
