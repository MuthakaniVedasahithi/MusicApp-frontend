import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHeart, FaPlay, FaPlus, FaPause } from "react-icons/fa";
import "./ArtistDetail.css";

const ArtistDetail = () => {
  const { state: artist } = useLocation();
  const navigate = useNavigate();
  const [selectedSong, setSelectedSong] = useState(null);
  const [likedSongs, setLikedSongs] = useState([]);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  if (!artist)
    return <p style={{ color: "white" }}>Artist data not found</p>;

  const toggleLike = (songTitle) => {
    setLikedSongs((prev) =>
      prev.includes(songTitle)
        ? prev.filter((s) => s !== songTitle)
        : [...prev, songTitle]
    );
  };

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

  return (
    <div className="artist-detail-container">
      <div className="artist-header">
        {/* ✅ Back button navigates to home */}
        <button onClick={() => navigate("/home")} className="back-btn">
          <FaArrowLeft /> Back
        </button>
        <h2>{artist.name}</h2>
      </div>

      <div className="artist-info">
        {artist.imageBase64 && (
          <img
            src={`data:image/jpeg;base64,${artist.imageBase64}`}
            alt={artist.name}
            className="artist-image"
          />
        )}
      </div>

      <div className="artist-songs-list">
        <h3>Songs by {artist.name}</h3>

        {/* ✅ Ensure songs are rendered correctly */}
        {artist.songs && artist.songs.length > 0 ? (
          artist.songs.map((song, idx) => (
            <div key={idx} className="song-row">
              <div className="song-info">
                <p className="song-title">🎵 {song.title}</p>
              </div>
              <div className="song-actions">
                <button
                  className={`heart ${
                    likedSongs.includes(song.title) ? "active" : ""
                  }`}
                  onClick={() => toggleLike(song.title)}
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

                <button className="add">
                  <FaPlus />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: "white" }}>No songs available</p>
        )}

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
                };base64,${selectedSong.dataBase64}`}
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
