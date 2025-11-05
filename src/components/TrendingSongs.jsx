import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TrendingSongs.css";

import song1 from "../assets/song1.jpg";
import song2 from "../assets/song2.jpeg";
import song3 from "../assets/song3.png";
import song4 from "../assets/song4.jpg";
import song5 from "../assets/song5.png";
import song6 from "../assets/song6.jpg";
import song7 from "../assets/song7.png";
import song8 from "../assets/song8.jpeg";
import song9 from "../assets/song9.jpeg";
import song10 from "../assets/song10.png";

export const songs = [
  { id: 1, title: "Bohemian Rhapsody", artist: "Queen", img: song1, file: "/trendingsongs/bohemian_rhapsody.mp3" },
  { id: 2, title: "Shape of You", artist: "Ed Sheeran", img: song2, file: "/trendingsongs/shape_of_you.mp3" },
  { id: 3, title: "Blinding Lights", artist: "The Weeknd", img: song3, file: "/trendingsongs/blinding_lights.mp3" },
  { id: 4, title: "Bad Guy", artist: "Billie Eilish", img: song4, file: "/trendingsongs/bad_guy.mp3" },
  { id: 5, title: "Rolling in the Deep", artist: "Adele", img: song5, file: "/trendingsongs/rolling_in_the_deep.mp3" },
  { id: 6, title: "Smells Like Teen Spirit", artist: "Nirvana", img: song6, file: "/trendingsongs/smells_like_teen_spirit.mp3" },
  { id: 7, title: "Lose Yourself", artist: "Eminem", img: song7, file: "/trendingsongs/lose_yourself.mp3" },
  { id: 8, title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", img: song8, file: "/trendingsongs/uptown_funk.mp3" },
  { id: 9, title: "Let Her Go", artist: "Passenger", img: song9, file: "/trendingsongs/let_her_go.mp3" },
  { id: 10, title: "Havana", artist: "Camila Cabello", img: song10, file: "/trendingsongs/havana.mp3" },
];

const TrendingSongs = () => {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="section">
      <div className="section-header">
        <h2>Trending Songs</h2>
        <span className="toggle-link" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Back" : "Show All"}
        </span>
      </div>

      <div className={showAll ? "grid-view" : "row-view"}>
        {songs.map((song) => (
          <div
            key={song.id}
            className="song-card"
            onClick={() => navigate(`/songs/${song.id}`, { state: song })}
          >
            <img src={song.img} alt={song.title} className="song-image" />
            <div className="song-info">
              <p className="song-title">{song.title}</p>
              <p className="song-artist">{song.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingSongs;
