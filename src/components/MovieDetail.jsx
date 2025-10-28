import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { movies } from "./Movies";
import "./MovieDetail.css";

const MovieDetail = () => {
  const { category, movieId } = useParams();
  const movie = movies[category]?.find((m) => m.id === parseInt(movieId));
  const [likedSongs, setLikedSongs] = useState({});
  const [playingSong, setPlayingSong] = useState(null);

  if (!movie) return <p>Movie not found.</p>;

  // ✅ Handle Like/Unlike
  const toggleHeart = (idx) => {
    const song = movie.songs[idx];
    const likedSongsList = JSON.parse(localStorage.getItem("likedSongs")) || [];

    const isAlreadyLiked = likedSongsList.some(
      (s) => s.title === song.title && s.artist === song.singer
    );

    let updatedLikedSongs;
    if (isAlreadyLiked) {
      // remove if already liked
      updatedLikedSongs = likedSongsList.filter(
        (s) => !(s.title === song.title && s.artist === song.singer)
      );
    } else {
      // add if not liked
      updatedLikedSongs = [
        ...likedSongsList,
        {
          id: Date.now(), // unique id
          title: song.title,
          artist: song.singer,
          img: movie.img,
        },
      ];
    }

    localStorage.setItem("likedSongs", JSON.stringify(updatedLikedSongs));

    setLikedSongs((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  // ✅ Keep liked hearts active when revisiting
  useEffect(() => {
    const likedSongsFromStorage = JSON.parse(localStorage.getItem("likedSongs")) || [];
    const likedState = {};
    movie.songs.forEach((song, idx) => {
      likedState[idx] = likedSongsFromStorage.some(
        (s) => s.title === song.title && s.artist === song.singer
      );
    });
    setLikedSongs(likedState);
  }, [movie]);

  // ✅ Play/Pause toggle
  const togglePlay = (idx) => {
    setPlayingSong((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="movie-detail-container">
      {/* Movie Banner */}
      <div
        className="movie-banner"
        style={{
          backgroundImage: `url(${movie.img})`,
        }}
      >
        <div className="banner-overlay">
          <h1 className="movie-title-detail">{movie.title}</h1>
          <p className="movie-director-detail">Director: {movie.director}</p>
        </div>
      </div>

      {/* Songs List */}
      <div className="songs-list-container">
        {movie.songs.length > 0 ? (
          movie.songs.map((song, idx) => (
            <div key={idx} className="song-row">
              <div className="song-info">
                <span className="song-title">{song.title}</span>
                <span className="song-singer">- {song.singer}</span>
              </div>

              <div className="song-actions">
                <span className="song-duration">{song.duration}</span>

                {/* ▶ / ⏸ button */}
                <button
                  className={`play ${playingSong === idx ? "active" : ""}`}
                  onClick={() => togglePlay(idx)}
                >
                  {playingSong === idx ? "⏸" : "▶"}
                </button>

                {/* ❤️ Like button */}
                <button
                  className={`heart ${likedSongs[idx] ? "active" : ""}`}
                  onClick={() => toggleHeart(idx)}
                >
                  ♥
                </button>

                <button className="add">＋</button>
              </div>
            </div>
          ))
        ) : (
          <p>No songs available.</p>
        )}
      </div>

      {/* 🎵 Bottom Player */}
      {playingSong !== null && (
        <div className="bottom-player">
          <div className="player-controls">
            <span className="time">0:00</span>
            <input
              type="range"
              min="0"
              max="100"
              value="0"
              className="progress-bar"
              readOnly
            />
            <span className="time">{movie.songs[playingSong].duration}</span>
          </div>

          <div className="main-buttons">
            <button>⏮</button>
            <button className="play-big">
              {playingSong !== null ? "⏸" : "▶"}
            </button>
            <button>⏭</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
