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
  const toggleLike = () => setLiked(!liked);

  // Animate progress bar
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(intervalRef.current); // stop at 100%
            return 100;
          }
          return prev + 0.5; // speed of progress
        });
      }, 200);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying]);

  // Drag/seek handler
  const handleProgressChange = (e) => {
    setProgress(Number(e.target.value));
  };

  // Remaining songs
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

        {/* 🎚 Progress bar */}
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
