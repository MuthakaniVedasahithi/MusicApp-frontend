<<<<<<< Updated upstream
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { artists } from "./Artists";
=======
import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHeart, FaPlay, FaPlus, FaPause } from "react-icons/fa";
>>>>>>> Stashed changes
import "./ArtistDetail.css";

const ArtistDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
<<<<<<< Updated upstream

  const artist = state || artists.find((a) => a.id === parseInt(id));
  const [likedSongs, setLikedSongs] = useState({});
  const [playingSong, setPlayingSong] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!artist) return <p style={{ color: "white" }}>Artist not found.</p>;

 const toggleHeart = (idx) => {
  const uniqueId = `${artist.id}-${idx}`;

  const song = {
    id: uniqueId,
    title: artist.songs[idx].title,
    artist: artist.name,
    img: artist.img,
    duration: artist.songs[idx].duration,
  };

  const stored = JSON.parse(localStorage.getItem("likedSongs")) || [];
  const exists = stored.some((s) => s.id === uniqueId);

  let updated;
  if (exists) {
    updated = stored.filter((s) => s.id !== uniqueId);
  } else {
    updated = [...stored, song];
  }

  localStorage.setItem("likedSongs", JSON.stringify(updated));

  // Update local state
  setLikedSongs((prev) => ({
    ...prev,
    [idx]: !prev[idx],
  }));
};


  const togglePlay = (idx) => {
    if (playingSong === idx) {
      setIsPlaying(!isPlaying);
=======
  const [selectedSong, setSelectedSong] = useState(null);
  const [likedSongs, setLikedSongs] = useState([]); // stores titles of liked songs
  const [playing, setPlaying] = useState(false);
  const [playlists, setPlaylists] = useState({});
  const [activeDropdown, setActiveDropdown] = useState(null);
  const audioRef = useRef(null);

  // ✅ Load playlists and liked songs
  useEffect(() => {
    const storedPlaylists = JSON.parse(localStorage.getItem("playlists")) || {};
    const storedLikedSongs = JSON.parse(localStorage.getItem("likedSongs")) || [];

    // store only song titles for quick check
    const likedTitles = storedLikedSongs.map((s) => s.title);
    setLikedSongs(likedTitles);
    setPlaylists(storedPlaylists);
  }, []);

  if (!artist) return <p style={{ color: "white" }}>Artist data not found</p>;

  // ❤️ Like / Unlike songs (persistent)
  const toggleLike = (song) => {
    const likedList = JSON.parse(localStorage.getItem("likedSongs")) || [];

    const exists = likedList.some(
      (s) => s.title === song.title && s.artist === artist.name
    );

    if (exists) {
      // 💔 Unlike — remove from storage
      const updated = likedList.filter(
        (s) => !(s.title === song.title && s.artist === artist.name)
      );
      localStorage.setItem("likedSongs", JSON.stringify(updated));
      setLikedSongs((prev) => prev.filter((title) => title !== song.title));
    } else {
      // ❤️ Like — add song to likedSongs
      const imgSrc =
        artist.imageBase64
          ? `data:image/jpeg;base64,${artist.imageBase64}`
          : artist.image || "/default-song.png";

      const newLikedSong = {
        id: song.id || Date.now(),
        title: song.title,
        artist: artist.name,
        img: imgSrc,
        file: song.file || "",
        type: song.type || "mp3",
      };

      likedList.push(newLikedSong);
      localStorage.setItem("likedSongs", JSON.stringify(likedList));
      setLikedSongs((prev) => [...prev, song.title]);
    }
  };

  // ▶️ Play / Pause logic
  const handlePlay = (song) => {
    if (selectedSong?.title === song.title && playing) {
      audioRef.current.pause();
      setPlaying(false);
>>>>>>> Stashed changes
    } else {
      setPlayingSong(idx);
      setProgress(0);
      setIsPlaying(true);
    }
  };

<<<<<<< Updated upstream
  const handleProgressChange = (e) => {
    setProgress(e.target.value);
  };

  // Simulate song playing progress
  useEffect(() => {
    if (!isPlaying || playingSong === null) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsPlaying(false);
          return 100;
        }
        return prev + 1;
      });
    }, 500); // speed of progress (adjust as needed)

    return () => clearInterval(interval);
  }, [isPlaying, playingSong]);

  useEffect(() => {
  // Get liked songs from localStorage
  const savedLikes = JSON.parse(localStorage.getItem("likedSongs")) || [];

  // Create an object to mark which song indices are liked
  const newLikedSongs = {};

  artist.songs.forEach((song, idx) => {
    const uniqueId = `${artist.id}-${idx}`;
    if (savedLikes.some((s) => s.id === uniqueId)) {
      newLikedSongs[idx] = true;
    }
  });

  setLikedSongs(newLikedSongs);
}, [artist]);


  return (
    <div className="artist-detail-container">
      {/* Top Banner */}
      <div className="artist-banner">
        <div className="banner-overlay">
          <h1 className="artist-name-detail">{artist.name}</h1>
          <img src={artist.img} alt={artist.name} className="artist-center-img" />
        </div>
=======
  // 🎵 Add song to playlist
  const handleAddToPlaylist = (playlistName, song) => {
    const updatedPlaylists = { ...playlists };
    if (!updatedPlaylists[playlistName]) updatedPlaylists[playlistName] = [];

    const normalize = (str) =>
      (str || "").toString().trim().toLowerCase().replace(/\s+/g, " ");

    const artistName = normalize(artist.name);
    const songTitle = normalize(song.title);
    const uniqueId = `${artistName}-${songTitle}`.replace(/\s+/g, "_");

    const alreadyExists = updatedPlaylists[playlistName].some((s) => {
      const sArtist = normalize(s.artist);
      const sTitle = normalize(s.title);
      return (
        s.uniqueId === uniqueId ||
        (sArtist === artistName && sTitle === songTitle)
      );
    });

    if (alreadyExists) {
      alert(`⚠️ "${song.title}" is already in "${playlistName}"`);
      setActiveDropdown(null);
      return;
    }

    const imgSrc =
      artist.imageBase64
        ? `data:image/jpeg;base64,${artist.imageBase64}`
        : artist.image || "/default-song.png";

    const newSong = {
      id: song.id || Date.now(),
      title: song.title,
      artist: artist.name,
      uniqueId,
      img: imgSrc,
      filePath: song.file || "",
      type: song.type || "mp3",
    };

    updatedPlaylists[playlistName].push(newSong);
    localStorage.setItem("playlists", JSON.stringify(updatedPlaylists));
    setPlaylists(updatedPlaylists);

    alert(`🎶 Added "${song.title}" to "${playlistName}"`);
    setActiveDropdown(null);
  };

  return (
    <div className="artist-detail-container">
      <div className="artist-header">
        <button onClick={() => navigate("/home")} className="back-btn">
          <FaArrowLeft /> Back
        </button>
        <h2>{artist.name}</h2>
      </div>

      <div className="artist-info">
        <img
          src={
            artist.imageBase64
              ? `data:image/jpeg;base64,${artist.imageBase64}`
              : artist.image || "/default-song.png"
          }
          alt={artist.name}
          className="artist-image"
        />
>>>>>>> Stashed changes
      </div>

      {/* Songs List */}
      <div className="artist-songs-list">
<<<<<<< Updated upstream
        {artist.songs.length > 0 ? (
=======
        <h3>Songs by {artist.name}</h3>

        {artist.songs && artist.songs.length > 0 ? (
>>>>>>> Stashed changes
          artist.songs.map((song, idx) => (
            <div key={idx} className="song-row">
              <div className="song-info">
                <span className="song-title">{song.title}</span>
                <span className="song-singer">({song.duration})</span>
              </div>

              <div className="song-actions">
                {/* ❤️ Like Button */}
                <button
<<<<<<< Updated upstream
                  className={`play ${playingSong === idx && isPlaying ? "active" : ""}`}
                  onClick={() => togglePlay(idx)}
=======
                  className={`heart ${
                    likedSongs.includes(song.title) ? "active" : ""
                  }`}
                  onClick={() => toggleLike(song)}
>>>>>>> Stashed changes
                >
                  {playingSong === idx && isPlaying ? "⏸" : "▶"}
                </button>
<<<<<<< Updated upstream
=======

                {/* ▶️ Play Button */}
>>>>>>> Stashed changes
                <button
                  className={`heart ${likedSongs[idx] ? "active" : ""}`}
                  onClick={() => toggleHeart(idx)}
                >
<<<<<<< Updated upstream
                  ♥
                </button>
                <button className="add">+</button>
=======
                  {selectedSong?.title === song.title && playing ? (
                    <FaPause />
                  ) : (
                    <FaPlay />
                  )}
                </button>

                {/* ➕ Playlist Dropdown */}
                <div className="dropdown-container">
                  <button
                    className="add"
                    onClick={() =>
                      setActiveDropdown(activeDropdown === idx ? null : idx)
                    }
                  >
                    <FaPlus />
                  </button>

                  {activeDropdown === idx && (
                    <div className="playlist-dropdown">
                      {Object.keys(playlists).length === 0 ? (
                        <p className="no-playlist">No playlists yet</p>
                      ) : (
                        Object.keys(playlists).map((name) => (
                          <button
                            key={name}
                            onClick={() => handleAddToPlaylist(name, song)}
                          >
                            {name}
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
>>>>>>> Stashed changes
              </div>
            </div>
          ))
        ) : (
<<<<<<< Updated upstream
          <p>No songs available.</p>
=======
          <p style={{ color: "white" }}>No songs available</p>
        )}

        {/* 🎧 Player Section */}
        {selectedSong && (
          <div className="song-player">
            <h4 style={{ color: "white" }}>
              Now Playing: 🎧 {selectedSong.title}
            </h4>
            <audio
              ref={audioRef}
              key={selectedSong.title}
              controls
              autoPlay
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
            >
              <source
                src={`data:audio/${
                  selectedSong.type || "mp3"
                };base64,${selectedSong.dataBase64 || ""}`}
                type={`audio/${selectedSong.type || "mp3"}`}
              />
            </audio>
          </div>
>>>>>>> Stashed changes
        )}
      </div>

      {/* Bottom Player */}
      {playingSong !== null && (
        <div className="bottom-player">
          <div className="player-controls">
            <span className="time">0:00</span>
            <div className="progress-wrapper">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleProgressChange}
                className="progress-bar"
              />
            </div>
            <span className="time">{artist.songs[playingSong].duration}</span>
          </div>

          <div className="main-buttons">
            <button>⏮</button>
            <button className="play-big" onClick={() => togglePlay(playingSong)}>
              {playingSong !== null && isPlaying ? "⏸" : "▶"}
            </button>
            <button>⏭</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistDetail;
