// src/components/Sidebar.jsx
import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
            </li>
          <li>Your Library</li>
          <li>Create Playlist</li>
          <li>
            <Link to="/movies">Popular Movies</Link>
            </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
