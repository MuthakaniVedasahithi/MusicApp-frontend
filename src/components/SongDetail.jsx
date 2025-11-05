import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { songs } from "./TrendingSongs";
import "./SongDetail.css";

const SongDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  // keep compatibility with navigate state or URL id
  const song = state || songs.find((s) => s.id === parseInt(id));

  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [progress, setProgress] = useState(0); // 0 - 100
  const [showDropdown, setShowDropdown] = useState(false);
  const [playlists, setPlaylists] = useState({}); // object map name -> array

  const audioRef = useRef(null);
  const intervalRef = useRef(null);
  const dropdownRef = useRef(null);
  const addButtonRef = useRef(null);

  if (!song) return <p style={{ color: "white" }}>Song not found.</p>;

  /* ------------------ Like toggle ------------------ */
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

  /* ------------------ Load liked + playlists on mount & when song changes ------------------ */
  useEffect(() => {
    const likedSongs = JSON.parse(localStorage.getItem("likedSongs")) || [];
    const isLiked = likedSongs.some((s) => s.id === song.id);
    setLiked(isLiked);

    const savedPlaylists = JSON.parse(localStorage.getItem("playlists")) || {};
    setPlaylists(savedPlaylists);
  }, [song.id]);

  /* ------------------ Audio: play/pause, progress update ------------------ */
  // when song changes, set audio src and reset progress/isPlaying
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.src = song.file || ""; // file should be set in songs array
    audioRef.current.currentTime = 0;
    setProgress(0);
    setIsPlaying(false);
  }, [song]);

  // update progress as audio plays
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      if (!audio.duration || Number.isNaN(audio.duration)) return;
      const pct = (audio.currentTime / audio.duration) * 100;
      setProgress(isFinite(pct) ? pct : 0);
    };

    const onEnded = () => {
      setIsPlaying(false);
      setProgress(100);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, [audioRef.current]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      // try to play — browsers may block autoplay if no user gesture, but this is triggered by user click
      audio.play().catch((err) => {
        console.warn("Playback failed:", err);
      });
      setIsPlaying(true);
    }
  };

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    const newPct = Number(e.target.value);
    setProgress(newPct);
    if (audio && audio.duration) {
      audio.currentTime = (newPct / 100) * audio.duration;
    }
  };

  /* ------------------ Add to playlist ------------------ */
  const addToPlaylist = (playlistName) => {
    const allPlaylists = JSON.parse(localStorage.getItem("playlists")) || {};

    if (!allPlaylists[playlistName]) {
      // still create if needed (but you previously wanted alert)
      allPlaylists[playlistName] = [];
    }

    // check by id to avoid duplicates
    const alreadyExists = allPlaylists[playlistName].some((s) => s.id === song.id);

    if (alreadyExists) {
      alert(`⚠️ "${song.title}" is already in "${playlistName}"`);
      setShowDropdown(false);
      return;
    }

    // push song object with minimal fields (keeps image and file too)
    const toStore = {
      id: song.id,
      title: song.title,
      artist: song.artist,
      img: song.img,
      file: song.file,
    };

    allPlaylists[playlistName].push(toStore);
    localStorage.setItem("playlists", JSON.stringify(allPlaylists));
    setPlaylists(allPlaylists);
    alert(`Added "${song.title}" to "${playlistName}"`);
    setShowDropdown(false);
  };

  /* ------------------ Dropdown: close on outside click or on scroll ------------------ */
  useEffect(() => {
    const onDocClick = (ev) => {
      // if dropdown is open and click outside both dropdown and the add button -> close
      if (!showDropdown) return;
      const target = ev.target;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        addButtonRef.current &&
        !addButtonRef.current.contains(target)
      ) {
        setShowDropdown(false);
      }
    };

    const onScroll = () => {
      // close dropdown when scrolling (so it doesn't float mid-page)
      if (showDropdown) setShowDropdown(false);
    };

    document.addEventListener("mousedown", onDocClick);
    window.addEventListener("scroll", onScroll, true); // capture scroll in all ancestors

    return () => {
      document.removeEventListener("mousedown", onDocClick);
      window.removeEventListener("scroll", onScroll, true);
    };
  }, [showDropdown]);

  /* ------------------ helper: remaining songs for similar section ------------------ */
  const remainingSongs = songs.filter((s) => s.id !== song.id);

  return (
    <div className="song-detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="song-detail-card">
        <div className="image-wrapper" style={{ position: "relative" }}>
          <img src={song.img} alt={song.title} className="song-detail-img" />
          <button className="play-btn" onClick={togglePlay}>
            {isPlaying ? "⏸" : "▶"}
          </button>
        </div>

        <h1 className="song-detail-title">{song.title}</h1>
        <p className="song-detail-artist">{song.artist}</p>

        {/* progress slider */}
        <input
          type="range"
          min="0"
          max="100"
          value={Math.round(progress)}
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

          <div className="add-playlist-wrapper" style={{ position: "relative" }}>
            <button
              ref={addButtonRef}
              className="add-btn"
              onClick={(e) => {
                e.stopPropagation();
                setShowDropdown((s) => !s);
              }}
            >
              ＋ Add to Playlist
            </button>

            {showDropdown && (
              <div
                ref={dropdownRef}
                className="playlist-dropdown"
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  right: 0,
                  zIndex: 9999,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {Object.keys(playlists).length === 0 ? (
                  <p className="empty" style={{ margin: 8 }}>No playlists found.</p>
                ) : (
                  Object.keys(playlists).map((plName) => (
                    <button
                      key={plName}
                      className="playlist-option"
                      onClick={() => addToPlaylist(plName)}
                      style={{ display: "block", width: "100%", padding: "8px 12px", textAlign: "left", background: "transparent", border: "none", color: "#fff", cursor: "pointer" }}
                    >
                      {plName}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
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

      {/* Hidden audio element */}
      <audio ref={audioRef} src={song.file} />
    </div>
  );
};

export default SongDetail;
