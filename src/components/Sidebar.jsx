// src/components/Sidebar.jsx
import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li>Home</li>
          <li>Your Library</li>
          <li>Create Playlist</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
