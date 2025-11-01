import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminPage.css";

export default function AdminPage() {
  const navigate = useNavigate();
  const adminData = JSON.parse(localStorage.getItem("user")) || {};

  const [category, setCategory] = useState("");
  const [artistForm, setArtistForm] = useState({
    name: "",
    songTitle: "",
    songType: "",
  });
  const [artistImage, setArtistImage] = useState(null);
  const [artistSongs, setArtistSongs] = useState([]);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const uploadData = async (url, data) => {
    try {
      const response = await axios.post(url, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Data uploaded successfully!");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload data.");
    }
  };

  // ✅ Submit multiple songs with artist
  const handleArtistSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", artistForm.name);
    formData.append("image", artistImage);

    artistSongs.forEach((song) => {
      formData.append("songTitles", song.songTitle);
      formData.append("songTypes", song.songType);
      formData.append("songFiles", song.file);
    });

    await uploadData("http://localhost:7076/admin/addArtistWithSongs", formData);

    setArtistForm({ name: "", songTitle: "", songType: "" });
    setArtistImage(null);
    setArtistSongs([]);
  };

  const handleAddSong = () => {
    if (!artistForm.songTitle || !artistForm.songType || !artistForm.file) {
      alert("Please fill song title, type and choose a file before adding.");
      return;
    }
    setArtistSongs([...artistSongs, artistForm]);
    setArtistForm({ ...artistForm, songTitle: "", songType: "", file: null });
  };

  return (
    <div className="admin-page">
      {/* ✅ Header with logout */}
      <div className="admin-header">
        <h2>Welcome, {adminData.username || "Admin"}</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="admin-category">
        <label>Select Category: </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="category-dropdown"
        >
          <option value="">-- Select --</option>
          <option value="artist">Artist</option>
        </select>
      </div>

      {category === "artist" && (
        <form className="admin-form" onSubmit={handleArtistSubmit}>
          <h3>Add Artist (with multiple songs)</h3>

          <input
            type="text"
            placeholder="Artist Name"
            value={artistForm.name}
            onChange={(e) =>
              setArtistForm({ ...artistForm, name: e.target.value })
            }
            required
          />

          <label>Artist Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setArtistImage(e.target.files[0])}
            required
          />

          <hr />

          <h4>Add Songs</h4>
          <input
            type="text"
            placeholder="Song Title"
            value={artistForm.songTitle}
            onChange={(e) =>
              setArtistForm({ ...artistForm, songTitle: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Song Type (e.g. mp3)"
            value={artistForm.songType}
            onChange={(e) =>
              setArtistForm({ ...artistForm, songType: e.target.value })
            }
          />
          <input
            type="file"
            accept="audio/*,video/*"
            onChange={(e) =>
              setArtistForm({ ...artistForm, file: e.target.files[0] })
            }
          />

          <button
            type="button"
            onClick={handleAddSong}
            className="add-song-btn"
          >
            ➕ Add Song
          </button>

          <p style={{ color: "white" }}>
            {artistSongs.length} song(s) added
          </p>

          {artistSongs.length > 0 && (
            <ul className="song-list-preview">
              {artistSongs.map((song, index) => (
                <li key={index} style={{ color: "white" }}>
                  {song.songTitle} ({song.songType})
                </li>
              ))}
            </ul>
          )}

          <button type="submit" className="submit-btn">
            ✅ Add Artist
          </button>
        </form>
      )}
    </div>
  );
}
