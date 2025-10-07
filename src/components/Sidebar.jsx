// src/components/Sidebar.jsx
import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/library">Your Library</Link></li>
          <li><Link to="/create-playlist">Create Playlist</Link></li>
          <li><Link to="/movies">Popular Movies</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;