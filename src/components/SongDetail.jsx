import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { songs } from "./TrendingSongs";
import "./SongDetail.css";

const SongDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const song = state || songs.find((s) => s.id === parseInt(id));

  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(null);
  const intervalRef = useRef(null);

  if (!song) return <p style={{ color: "white" }}>Song not found.</p>;

  const togglePlay = () => setIsPlaying(!isPlaying);

  const toggleLike = () => {
    const likedSongs = JSON.parse(localStorage.getItem("likedSongs")) || [];

    if (!liked) {
      const updated = [...likedSongs, song];
      localStorage.setItem("likedSongs", JSON.stringify(updated));
    } else {
      const updated = likedSongs.filter((s) => s.id !== song.id);
      localStorage.setItem("likedSongs", JSON.stringify(updated));
    }

    setLiked(!liked);
  };

  // Check if song is already liked
  useEffect(() => {
    const likedSongs = JSON.parse(localStorage.getItem("likedSongs")) || [];
    const isLiked = likedSongs.some((s) => s.id === song.id);
    setLiked(isLiked);
  }, [song.id]);

  // Progress bar animation
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(intervalRef.current);
            return 100;
          }
          return prev + 0.5;
        });
      }, 200);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying]);

  const handleProgressChange = (e) => {
    setProgress(Number(e.target.value));
  };

  const remainingSongs = songs.filter((s) => s.id !== song.id);

  return (
    <div className="song-detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="song-detail-card">
        <div className="image-wrapper">
          <img src={song.img} alt={song.title} className="song-detail-img" />
          <button className="play-btn" onClick={togglePlay}>
            {isPlaying ? "⏸" : "▶"}
          </button>
        </div>

        <h1 className="song-detail-title">{song.title}</h1>
        <p className="song-detail-artist">{song.artist}</p>

        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleProgressChange}
          className="progress-slider"
        />

        <div className="song-actions">
          <button
            className={`like-btn ${liked ? "active" : ""}`}
            onClick={toggleLike}
          >
            {liked ? "♥ Liked" : "♡ Like"}
          </button>
          <button className="add-btn">＋ Add to Playlist</button>
        </div>
      </div>

      <div className="similar-section">
        <h2>🎧 More Songs You May Like</h2>
        <div className="similar-grid">
          {remainingSongs.map((s) => (
            <div
              key={s.id}
              className="similar-card"
              onClick={() => navigate(`/songs/${s.id}`, { state: s })}
            >
              <img src={s.img} alt={s.title} className="similar-img" />
              <p className="similar-title">{s.title}</p>
              <p className="similar-artist">{s.artist}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SongDetail;
