import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaHeart, FaPlay, FaPause, FaPlus } from "react-icons/fa";
import axios from "axios";
import "./MovieDetail.css";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const [likedSongs, setLikedSongs] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [playlists, setPlaylists] = useState({});
  const [activeDropdown, setActiveDropdown] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    axios
      .get(`http://localhost:7076/admin/movie/${id}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => console.error("Error fetching movie details:", err));
  }, [id]);

  useEffect(() => {
    const storedPlaylists = JSON.parse(localStorage.getItem("playlists")) || {};
    const storedLikedSongs = JSON.parse(localStorage.getItem("likedSongs")) || [];
    setPlaylists(storedPlaylists);
    setLikedSongs(storedLikedSongs.map((s) => s.title));
  }, []);

  if (!movie)
    return <p style={{ color: "white" }}>Loading movie details...</p>;

  const toggleLike = (song) => {
    const likedList = JSON.parse(localStorage.getItem("likedSongs")) || [];
    const exists = likedList.some(
      (s) => s.title === song.title && s.artist === movie.title
    );

    if (exists) {
      const updated = likedList.filter(
        (s) => !(s.title === song.title && s.artist === movie.title)
      );
      localStorage.setItem("likedSongs", JSON.stringify(updated));
      setLikedSongs((prev) => prev.filter((t) => t !== song.title));
    } else {
      const imgSrc = movie.imageBase64
        ? `data:image/jpeg;base64,${movie.imageBase64}`
        : "/default-movie.png";

      const newLikedSong = {
        id: Date.now(),
        title: song.title,
        artist: movie.title,
        img: imgSrc,
        type: song.type || "mp3",
      };

      likedList.push(newLikedSong);
      localStorage.setItem("likedSongs", JSON.stringify(likedList));
      setLikedSongs((prev) => [...prev, song.title]);
    }
  };

  // ⭐ ONLY FIX ADDED — everything else untouched
  const handlePlay = (song) => {
    // If same song AND it is playing → pause it
    if (selectedSong?.title === song.title && playing) {
      audioRef.current.pause();
      setPlaying(false);
      return;
    }

    // If same song BUT paused → resume it
    if (selectedSong?.title === song.title && !playing) {
      audioRef.current.play();
      setPlaying(true);
      return;
    }

    // Clicking a different song → switch song (your original logic)
    setSelectedSong(song);
    setPlaying(true);
  };

  const handleAddToPlaylist = (playlistName, song) => {
    const updated = { ...playlists };
    if (!updated[playlistName]) updated[playlistName] = [];

    const normalize = (str) =>
      (str || "").trim().toLowerCase().replace(/\s+/g, " ");

    const songKey = `${normalize(movie.title)}-${normalize(song.title)}`;

    if (
      updated[playlistName].some(
        (s) =>
          s.uniqueId === songKey ||
          (normalize(s.artist) === normalize(movie.title) &&
            normalize(s.title) === normalize(song.title))
      )
    ) {
      alert(`⚠️ "${song.title}" already exists in "${playlistName}"`);
      setActiveDropdown(null);
      return;
    }

    const imgSrc = movie.imageBase64
      ? `data:image/jpeg;base64,${movie.imageBase64}`
      : "/default-movie.png";

    const newSong = {
      id: Date.now(),
      title: song.title,
      artist: movie.title,
      uniqueId: songKey,
      img: imgSrc,
      type: song.type || "mp3",
    };

    updated[playlistName].push(newSong);
    localStorage.setItem("playlists", JSON.stringify(updated));
    setPlaylists(updated);
    setActiveDropdown(null);
  };

  return (
    <div className="movie-detail-container">
      <div className="movie-header">
        <button onClick={() => navigate("/movies")} className="back-btn">
          <FaArrowLeft /> Back
        </button>
        <h2>{movie.title}</h2>
      </div>

      <div className="movie-banner">
        <img
          src={
            movie.imageBase64
              ? `data:image/jpeg;base64,${movie.imageBase64}`
              : "/default-movie.png"
          }
          className="movie-image"
          alt={movie.title}
        />

        <div className="movie-banner-text">
          <h2>{movie.title}</h2>
          <h3>Directed by: {movie.director}</h3>
        </div>
      </div>

      <div className="movie-songs-list">
        <h3>Songs from {movie.title}</h3>

        {movie.songs?.length > 0 ? (
          movie.songs.map((song, index) => (
            <div key={index} className="song-row">
              <div className="song-info">
                <span className="song-title">🎵 {song.title}</span>
                <span className="song-singer">- {song.singer}</span>
              </div>

              <div className="song-actions">
                <button
                  className={`heart ${
                    likedSongs.includes(song.title) ? "active" : ""
                  }`}
                  onClick={() => toggleLike(song)}
                >
                  <FaHeart />
                </button>

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

                <div className="dropdown-container">
                  <button
                    className="add"
                    onClick={() =>
                      setActiveDropdown(activeDropdown === index ? null : index)
                    }
                  >
                    <FaPlus />
                  </button>

                  {activeDropdown === index && (
                    <div className="playlist-dropdown">
                      {Object.keys(playlists).length === 0 ? (
                        <p className="no-playlist">No playlists</p>
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
          <p>No songs available.</p>
        )}
      </div>

      {selectedSong && (
        <div className="song-player">
          <h4>Now Playing: 🎧 {selectedSong.title}</h4>

          {/* ⭐ KEEPING YOUR KEY EXACTLY AS YOU WROTE IT */}
          <audio
            key={selectedSong.title}
            ref={audioRef}
            controls
            autoPlay
            onPause={() => setPlaying(false)}
            onPlay={() => setPlaying(true)}
          >
            <source
              src={`data:audio/${selectedSong.type};base64,${
                selectedSong.dataBase64 || ""
              }`}
            />
          </audio>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
