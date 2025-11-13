import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminPage.css";

export default function AdminPage() {
  const navigate = useNavigate();
  const adminData = JSON.parse(localStorage.getItem("user")) || {};

  // Artist states
  const [category, setCategory] = useState("");
  const [artistForm, setArtistForm] = useState({
    name: "",
    songTitle: "",
    songType: "",
    file: null,
  });
  const [artistImage, setArtistImage] = useState(null);
  const [artistSongs, setArtistSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState("");

  // Movie states
  const [movieCategory, setMovieCategory] = useState("");
  const [movieForm, setMovieForm] = useState({
    title: "",
    director: "",
  });
  const [poster, setPoster] = useState(null);
  const [movieSongs, setMovieSongs] = useState([]);
  const [songForm, setSongForm] = useState({
    title: "",
    singer: "",
    type: "",
    duration: "",
    file: null,
  });

  // Fetch artists
  useEffect(() => {
    axios
      .get("http://localhost:7076/admin/artists")
      .then((res) => setArtists(res.data))
      .catch((err) => console.error("Error fetching artists:", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const uploadData = async (url, data) => {
    try {
      const res = await axios.post(url, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Uploaded successfully!");
      return res.data;
    } catch (err) {
      console.error("❌ Upload failed:", err);
      alert("Upload failed. Check console.");
    }
  };

  // ----------------- ARTIST -----------------
  const handleAddArtistSong = () => {
    if (!artistForm.songTitle || !artistForm.songType || !artistForm.file) {
      alert("Please fill song title, type, and choose a file!");
      return;
    }
    setArtistSongs([...artistSongs, artistForm]);
    setArtistForm({ ...artistForm, songTitle: "", songType: "", file: null });
  };

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
    setArtistForm({ name: "", songTitle: "", songType: "", file: null });
    setArtistImage(null);
    setArtistSongs([]);
  };

  const handleAddSongsToArtist = async (e) => {
    e.preventDefault();
    if (!selectedArtist) return alert("Select an artist first!");
    const formData = new FormData();
    formData.append("artistName", selectedArtist);
    artistSongs.forEach((song) => {
      formData.append("songTitles", song.songTitle);
      formData.append("songTypes", song.songType);
      formData.append("songFiles", song.file);
    });
    await uploadData("http://localhost:7076/admin/addSongsToArtist", formData);
    setArtistSongs([]);
  };

  // ----------------- MOVIE -----------------
  const handleAddMovieSong = () => {
    if (!songForm.title || !songForm.singer || !songForm.type || !songForm.file) {
      alert("Please fill all song fields!");
      return;
    }
    setMovieSongs([...movieSongs, songForm]);
    setSongForm({ title: "", singer: "", type: "", duration: "", file: null });
  };

  const handleMovieSubmit = async (e) => {
    e.preventDefault();
    if (!poster || !movieCategory) {
      alert("Upload a poster & select category!");
      return;
    }

    const formData = new FormData();
    formData.append("title", movieForm.title);
    formData.append("director", movieForm.director);
    formData.append("category", movieCategory);
    formData.append("poster", poster);

    movieSongs.forEach((song) => {
      formData.append("songTitles", song.title);
      formData.append("singers", song.singer);
      formData.append("songTypes", song.type);
      formData.append("durations", song.duration || "4:00");
      formData.append("songFiles", song.file);
    });

    await uploadData("http://localhost:7076/admin/addMovieWithSongs", formData);
    setMovieForm({ title: "", director: "" });
    setPoster(null);
    setMovieSongs([]);
  };

  // ----------------- RENDER -----------------
  return (
    <div className="admin-page">
      {/* HEADER */}
      <div className="admin-header">
        <h2>Welcome, {adminData.username || "Admin"}</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* GRID STRUCTURE */}
      <div className="admin-grid">
        {/* LEFT: CATEGORY PANEL */}
        <div className="left-panel">
          <div className="admin-category">
            <label>🎤 Artist Actions:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="category-dropdown"
            >
              <option value="">-- Select --</option>
              <option value="newArtist">Add New Artist</option>
              <option value="existingArtist">Add Songs to Existing Artist</option>
            </select>
          </div>

          <div className="admin-category">
            <label>🎬 Movie Category:</label>
            <select
              value={movieCategory}
              onChange={(e) => setMovieCategory(e.target.value)}
              className="category-dropdown"
            >
              <option value="">-- Select --</option>
              <option value="Tollywood">Tollywood</option>
              <option value="Bollywood">Bollywood</option>
              <option value="Hollywood">Hollywood</option>
            </select>
          </div>
        </div>

        {/* RIGHT: DYNAMIC FORM PANEL */}
        <div className="right-panel">
          {/* Add New Artist */}
          {category === "newArtist" && (
            <form className="admin-form" onSubmit={handleArtistSubmit}>
              <h3>Add New Artist</h3>
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
                onClick={handleAddArtistSong}
                className="add-song-btn"
              >
                ➕ Add Song
              </button>

              {artistSongs.length > 0 && (
                <ul className="song-list-preview">
                  {artistSongs.map((song, index) => (
                    <li key={index}>
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

          {/* Add Songs to Existing Artist */}
          {category === "existingArtist" && (
            <form className="admin-form" onSubmit={handleAddSongsToArtist}>
              <h3>Add Songs to Existing Artist</h3>
              <select
                value={selectedArtist}
                onChange={(e) => setSelectedArtist(e.target.value)}
                required
              >
                <option value="">-- Select Artist --</option>
                {artists.map((artist, i) => (
                  <option key={i} value={artist.name}>
                    {artist.name}
                  </option>
                ))}
              </select>
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
                onClick={handleAddArtistSong}
                className="add-song-btn"
              >
                ➕ Add Song
              </button>

              {artistSongs.length > 0 && (
                <ul className="song-list-preview">
                  {artistSongs.map((song, i) => (
                    <li key={i}>
                      {song.songTitle} ({song.songType})
                    </li>
                  ))}
                </ul>
              )}
              <button type="submit" className="submit-btn">
                ✅ Add Songs
              </button>
            </form>
          )}

          {/* Movie Form */}
          {movieCategory && (
            <form className="admin-form" onSubmit={handleMovieSubmit}>
              <h3>Add {movieCategory} Movie</h3>
              <input
                type="text"
                placeholder="Movie Title"
                value={movieForm.title}
                onChange={(e) =>
                  setMovieForm({ ...movieForm, title: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Director Name"
                value={movieForm.director}
                onChange={(e) =>
                  setMovieForm({ ...movieForm, director: e.target.value })
                }
                required
              />
              <label>Poster:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPoster(e.target.files[0])}
                required
              />
              <h4>Add Songs</h4>
              <input
                type="text"
                placeholder="Song Title"
                value={songForm.title}
                onChange={(e) =>
                  setSongForm({ ...songForm, title: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Singer"
                value={songForm.singer}
                onChange={(e) =>
                  setSongForm({ ...songForm, singer: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Type (mp3)"
                value={songForm.type}
                onChange={(e) =>
                  setSongForm({ ...songForm, type: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Duration"
                value={songForm.duration}
                onChange={(e) =>
                  setSongForm({ ...songForm, duration: e.target.value })
                }
              />
              <input
                type="file"
                accept="audio/*,video/*"
                onChange={(e) =>
                  setSongForm({ ...songForm, file: e.target.files[0] })
                }
              />
              <button
                type="button"
                onClick={handleAddMovieSong}
                className="add-song-btn"
              >
                ➕ Add Song
              </button>

              {movieSongs.length > 0 && (
                <ul className="song-list-preview">
                  {movieSongs.map((s, i) => (
                    <li key={i}>
                      {s.title} - {s.singer}
                    </li>
                  ))}
                </ul>
              )}
              <button type="submit" className="submit-btn">
                ✅ Add {movieCategory} Movie
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
