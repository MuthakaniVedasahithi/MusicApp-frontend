import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHeart, FaPlay, FaPlus, FaPause } from "react-icons/fa";
import "./ArtistDetail.css";

const ArtistDetail = () => {
  const { state: artist } = useLocation();
  const navigate = useNavigate();
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
    } else {
      setSelectedSong(song);
      setPlaying(true);
      setTimeout(() => {
        if (audioRef.current) audioRef.current.play();
      }, 200);
    }
  };

  // 🎵 Add song to playlist (with artist image)
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
        {artist.imageBase64 || artist.image ? (
          <img
            src={
              artist.imageBase64
                ? `data:image/jpeg;base64,${artist.imageBase64}`
                : artist.image
            }
            alt={artist.name}
            className="artist-image"
          />
        ) : (
          <img src="/default-song.png" alt="default" className="artist-image" />
        )}
      </div>

      <div className="artist-songs-list">
        <h3>Songs by {artist.name}</h3>

        {artist.songs && artist.songs.length > 0 ? (
          artist.songs.map((song, idx) => (
            <div key={idx} className="song-row">
              <div className="song-info">
                <p className="song-title">🎵 {song.title}</p>
              </div>

              <div className="song-actions">
                {/* ❤️ Like Button */}
                <button
                  className={`heart ${
                    likedSongs.includes(song.title) ? "active" : ""
                  }`}
                  onClick={() => toggleLike(song)}
                >
                  <FaHeart />
                </button>

                {/* ▶️ Play Button */}
                <button
                  className={`play ${
                    selectedSong?.title === song.title && playing ? "active" : ""
                  }`}
                  onClick={() => handlePlay(song)}
                >
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
              </div>
            </div>
          ))
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default ArtistDetail;
