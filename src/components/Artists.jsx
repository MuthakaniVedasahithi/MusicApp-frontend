 import artist1 from "../assets/artist1.jpg";
import artist2 from "../assets/artist2.jpg";
import artist3 from "../assets/artist3.jpg";
import artist4 from "../assets/artist4.jpg";
import artist5 from "../assets/artist5.jpg";
import artist6 from "../assets/artist6.jpg";
import artist7 from "../assets/artist7.jpg";
import artist8 from "../assets/artist8.jpeg";
import artist9 from "../assets/artist9.jpg";
import artist10 from "../assets/artist10.jpg";

 export const artists = [
  { id: 1, name: "Thaman S", img: artist1 },
  { id: 2, name: "Devi Sri Prasad", img: artist2 },
  { id: 3, name: "Sid Sriram", img: artist3 },
  { id: 4, name: "A. R. Rahman", img: artist4 },
  { id: 5, name: "Shreya Ghoshal", img: artist5 },
  { id: 6, name: "Selena Gomez", img: artist6 },
  { id: 7, name: "Anirudh Ravichander", img: artist7 },
  { id: 8, name: "Arijit Singh", img: artist8 },
  { id: 9, name: "Karthik", img: artist9 },
  { id: 10, name: "K. S. Chithra", img: artist10 },
];

import { useState } from "react";
import "./Artists.css";

const Artists = () => {
  const [showAll, setShowAll] = useState(false);

  

  return (
    <div className="artists-container">
      <div className="section-header">
        <h2>Popular Artists</h2>
        <span className="toggle-link" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Back" : "Show All"}
        </span>
      </div>

      <div className={showAll ? "artist-grid" : "artist-row"}>
        {artists.map((artist) => (
          <div key={artist.id} className="artist-card">
            <img src={artist.img} alt={artist.name} className="artist-image" />
            <p className="artist-name">{artist.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artists;
