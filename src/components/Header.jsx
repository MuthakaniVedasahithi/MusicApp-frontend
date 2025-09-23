// src/components/Header.jsx
import React, { useState } from "react";
import { songs } from "../components/TrendingSongs";
import { artists } from "../components/Artists";
import "./Header.css";
import logo from "../assets/logo.png";
import { FaSearch } from "react-icons/fa"; // search icon


const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  

  // Combine songs and artists into one searchable list
  const combinedData = [...songs, ...artists];

  // Filter based on search input
  const filteredResults = combinedData.filter((item) =>
    (item.title || item.name).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <header className="header">
      <div className="left-header">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="title">VibeNest</h1>

        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="search-bar"
            placeholder="Songs, artists, podcasts"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {searchTerm && (
            <div className="search-dropdown">
              {filteredResults.length > 0 ? (
                filteredResults.map((item, index) => (
                  <div key={index} className="search-result">
                    {(item.title || item.name)}
                  </div>
                ))
              ) : (
                <div className="search-result no-match">No matches found</div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="auth-buttons">
        <button className="login-btn">Login</button>
        <button className="signup-btn">Sign Up</button>
      </div>
    </header>
  );
};

export default Header;
