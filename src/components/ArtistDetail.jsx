import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { artists } from "./Artists";
import "./ArtistDetail.css";

const ArtistDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const artist = state || artists.find((a) => a.id === parseInt(id));
  const [likedSongs, setLikedSongs] = useState({});
  const [playingSong, setPlayingSong] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!artist) return <p style={{ color: "white" }}>Artist not found.</p>;

  const toggleHeart = (idx) => {
    setLikedSongs((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const togglePlay = (idx) => {
    if (playingSong === idx) {
      setIsPlaying(!isPlaying);
    } else {
      setPlayingSong(idx);
      setProgress(0);
      setIsPlaying(true);
    }
  };

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

  return (
    <div className="artist-detail-container">
      {/* Top Banner */}
      <div className="artist-banner">
        <div className="banner-overlay">
          <h1 className="artist-name-detail">{artist.name}</h1>
          <img src={artist.img} alt={artist.name} className="artist-center-img" />
        </div>
      </div>

      {/* Songs List */}
      <div className="artist-songs-list">
        {artist.songs.length > 0 ? (
          artist.songs.map((song, idx) => (
            <div key={idx} className="song-row">
              <div className="song-info">
                <span className="song-title">{song.title}</span>
                <span className="song-singer">({song.duration})</span>
              </div>
              <div className="song-actions">
                <button
                  className={`play ${playingSong === idx && isPlaying ? "active" : ""}`}
                  onClick={() => togglePlay(idx)}
                >
                  {playingSong === idx && isPlaying ? "⏸" : "▶"}
                </button>
                <button
                  className={`heart ${likedSongs[idx] ? "active" : ""}`}
                  onClick={() => toggleHeart(idx)}
                >
                  ♥
                </button>
                <button className="add">+</button>
              </div>
            </div>
          ))
        ) : (
          <p>No songs available.</p>
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
