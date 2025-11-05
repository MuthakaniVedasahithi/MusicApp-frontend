import React, { useEffect, useState, useRef } from "react";
import "./YourLibrary.css";

const YourLibrary = () => {
  const [playlists, setPlaylists] = useState({});
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [likedSongs, setLikedSongs] = useState([]);
  const [showLikedSongs, setShowLikedSongs] = useState(false); // 👈 NEW toggle state
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // ✅ Load from localStorage
  useEffect(() => {
    const loadFromStorage = () => {
      const savedPlaylists = JSON.parse(localStorage.getItem("playlists")) || {};
      const liked = JSON.parse(localStorage.getItem("likedSongs")) || [];
      setPlaylists(savedPlaylists);
      setLikedSongs(liked);
    };

    loadFromStorage();

    window.addEventListener("storage", loadFromStorage);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") loadFromStorage();
    });

    return () => window.removeEventListener("storage", loadFromStorage);
  }, []);

  // ✅ Save playlists
  const savePlaylists = (updated) => {
    localStorage.setItem("playlists", JSON.stringify(updated));
    setPlaylists(updated);
  };

  // 🗑️ Delete playlist
  const handleDeletePlaylist = (playlistName) => {
    if (window.confirm(`Delete playlist "${playlistName}"?`)) {
      const updated = { ...playlists };
      delete updated[playlistName];
      savePlaylists(updated);
      if (selectedPlaylist === playlistName) setSelectedPlaylist(null);
    }
  };

  // ❌ Remove song from playlist
  const handleRemoveSong = (playlistName, songId) => {
    const updated = { ...playlists };
    updated[playlistName] = updated[playlistName].filter(
      (song) => song.id !== songId
    );
    savePlaylists(updated);
  };

  // 💔 Unlike a song
  const handleUnlike = (id) => {
    const updated = likedSongs.filter((song) => song.id !== id);
    localStorage.setItem("likedSongs", JSON.stringify(updated));
    setLikedSongs(updated);
  };

  // 🎧 Click a song to play it
  const handleSongClick = (song) => {
    const safeTitle = song.title?.trim();
    const songFile = song.file || song.filePath || "";
    const songPath =
      songFile ||
      `/trendingsongs/${safeTitle?.toLowerCase().replace(/\s+/g, "_")}.mp3`;

    if (currentSong === songPath && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    setCurrentSong(songPath);
    setIsPlaying(true);

    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.load();
        audioRef.current
          .play()
          .catch((err) => {
            console.error("Error playing audio:", err);
            alert(`⚠️ Couldn't play: ${song.title}`);
            setIsPlaying(false);
          });
      }
    }, 200);
  };

  // 🖼️ Helper to get correct image
  const getSongImage = (song) => {
    if (!song) return "/default-cover.jpg";
    return (
      song.img ||
      song.image ||
      (song.imageBase64 && `data:image/jpeg;base64,${song.imageBase64}`) ||
      (song.artistImg && song.artistImg) ||
      (song.artistBase64 && `data:image/jpeg;base64,${song.artistBase64}`) ||
      "/default-cover.jpg"
    );
  };

  return (
    <div className="library-page">
      <h2>Your Library</h2>

      {/* 💖 Liked Songs */}
      <div className="library-section">
        <h3
          className="clickable-header"
          onClick={() => setShowLikedSongs((prev) => !prev)}
        >
          💖 Liked Songs{" "}
          <span className="toggle-arrow">
            {showLikedSongs ? "▲" : "▼"}
          </span>
        </h3>
        <p className="liked-count">
          You have {likedSongs.length} liked{" "}
          {likedSongs.length === 1 ? "song" : "songs"}
        </p>

        {/* 👇 Only show liked songs when expanded */}
        {showLikedSongs && (
          <>
            {likedSongs.length === 0 ? (
              <p>You haven’t liked any songs yet.</p>
            ) : (
              <ul className="liked-list">
                {likedSongs.map((song) => (
                  <li
                    key={song.id}
                    className={`liked-item ${
                      currentSong?.includes(song.title) && isPlaying
                        ? "playing"
                        : ""
                    }`}
                    onClick={() => handleSongClick(song)}
                  >
                    <img
                      src={getSongImage(song)}
                      alt={song.title}
                      className="liked-img"
                    />
                    <div className="liked-details">
                      <p className="liked-title">{song.title}</p>
                      <p className="liked-artist">{song.artist}</p>
                    </div>
                    <button
                      className="unlike-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUnlike(song.id);
                      }}
                    >
                      ✖
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>

      {/* 🎧 Playlists */}
      <div className="library-section">
        <h3>Your Playlists</h3>
        {Object.keys(playlists).length === 0 ? (
          <p>No playlists yet. Go create one!</p>
        ) : (
          <ul className="playlist-list">
            {Object.keys(playlists).map((name) => (
              <li key={name} className="playlist-item">
                <div
                  className="playlist-header"
                  onClick={() => setSelectedPlaylist(name)}
                >
                  <p className="playlist-name">🎧 {name}</p>
                  <p className="playlist-count">
                    {playlists[name]?.length || 0} songs
                  </p>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => handleDeletePlaylist(name)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 🎵 Selected Playlist Songs */}
      {selectedPlaylist && (
        <div className="library-section">
          <h3>{selectedPlaylist} — Songs</h3>
          {playlists[selectedPlaylist]?.length === 0 ? (
            <p>No songs in this playlist yet.</p>
          ) : (
            <ul className="liked-list">
              {playlists[selectedPlaylist].map((song) => (
                <li
                  key={song.id}
                  className={`liked-item ${
                    currentSong?.includes(song.title) && isPlaying
                      ? "playing"
                      : ""
                  }`}
                  onClick={() => handleSongClick(song)}
                >
                  <img
                    src={getSongImage(song)}
                    alt={song.title}
                    className="liked-img"
                  />
                  <div className="liked-details">
                    <p className="liked-title">{song.title}</p>
                    <p className="liked-artist">{song.artist}</p>
                  </div>
                  <button
                    className="unlike-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveSong(selectedPlaylist, song.id);
                    }}
                  >
                    ✖
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <audio ref={audioRef} src={currentSong} onEnded={() => setIsPlaying(false)} />
    </div>
  );
};

export default YourLibrary;
