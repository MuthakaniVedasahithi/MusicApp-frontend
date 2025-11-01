import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Artists.css";

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  // ✅ FIXED: Removed duplicate axios call and syntax issue
  useEffect(() => {
    axios
      .get("http://localhost:7076/admin/artists")
      .then((res) => {
        console.log("Artists fetched:", res.data);
        setArtists(res.data);
      })
      .catch((err) => console.error("Error fetching artists:", err));
  }, []);

  return (
    <div className="artists-container">
      <div className="section-header">
        <h2>Popular Artists</h2>
        <span className="toggle-link" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Back" : "Show All"}
        </span>
      </div>

      <div className={showAll ? "artist-grid" : "artist-row"}>
        {artists.length > 0 ? (
          artists.map((artist) => (
            <div
              key={artist.id}
              className="artist-card"
              onClick={() =>
                navigate(`/artists/${artist.id}`, { state: artist })
              }
            >
              {/* ✅ Ensure the image renders properly */}
              {artist.imageBase64 ? (
                <img
                  src={`data:image/jpeg;base64,${artist.imageBase64}`}
                  alt={artist.name}
                  className="artist-image"
                />
              ) : (
                <p style={{ color: "white" }}>No Image</p>
              )}
              <p className="artist-name">{artist.name}</p>
            </div>
          ))
        ) : (
          <p style={{ color: "white" }}>No artists available.</p>
        )}
      </div>
    </div>
  );
};

export default Artists;
