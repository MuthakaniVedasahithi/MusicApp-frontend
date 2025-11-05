// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Header.css";
import logo from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";

const Header = () => { 
  const [searchTerm, setSearchTerm] = useState("");
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch both songs and artists from backend when the page loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [songsRes, artistsRes] = await Promise.all([
  axios.get("http://localhost:7076/admin/songs"),
  axios.get("http://localhost:7076/admin/artists"),
]);

        setSongs(songsRes.data);
        setArtists(artistsRes.data);
      } catch (error) {
        console.error("Error fetching songs or artists:", error);
      }
    };
    fetchData();
  }, []);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/login");
  };

  // ✅ Combine both fetched arrays for searching
  const combinedData = [...songs, ...artists];

  // ✅ Filter based on name or title
  const filteredResults = combinedData.filter((item) =>
    (item.title || item.name)?.toLowerCase().includes(searchTerm.toLowerCase())
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
                    {item.title || item.name}
                  </div>
                ))
              ) : (
                <div className="search-result no-match">No matches found</div>
              )}
            </div>
          )}
        </div>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

export default Header;
 