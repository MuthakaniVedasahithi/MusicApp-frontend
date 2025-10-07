import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import "./Artists.css";

// Artist data with songs
export const artists = [
  {
    id: 1,
    name: "Thaman S",
    img: artist1,
    songs: [
      { id: 1, title: "Mind Block", duration: "3:45" },
      { id: 2, title: "Seeti Maar", duration: "4:15" },
            { id: 3, title: "Rama krishna", duration: "5:10" },

                  { id: 4, title: "Sarainode", duration: "3:10" },

                        { id: 5, title: "Vachadayyo saami", duration: "4:09" }

    ],
  },
  {
    id: 2,
    name: "Devi Sri Prasad",
    img: artist2,
    songs: [
      { id: 3, title: "Setti Maar", duration: "3:30" },
      { id: 4, title: "Pakka Local", duration: "6:20" },
            { id: 4, title: "Jivvu Jivvu", duration: "4:40" },
      { id: 4, title: "Ammadu", duration: "4:20" },
      { id: 4, title: "Rinaga Ringa", duration: "3:25" },

    ],
  },
  {
    id: 3,
    name: "Sid Sriram",
    img: artist3,
    songs: [
      { id: 5, title: "Vennilave (Kaatru Veliyidai)", duration: "3:50" },
      { id: 6, title: "Inkem Inkem Inkem Kaavaale", duration: "4:05" },
            { id: 6, title: "Thalli Pogathey (Achcham Yenbadhu Madamaiyada)", duration: "3:45" },
      { id: 6, title: "Enna Solla (Ishq)", duration: "2:50" },
      { id: 6, title: "Adiye (Kadal)", duration: "4:55" }

    ],
  },
  {
    id: 4,
    name: "A. R. Rahman",
    img: artist4,
    songs: [
      { id: 7, title: "Dil Se Re (Dil Se)", duration: "5:00" },
      { id: 8, title: "Kun Faya Kun (Rockstar)", duration: "3:45" },
            { id: 8, title: "Jai Ho (Slumdog Millionaire)", duration: "4:45" },
      { id: 8, title: "Hamma Hamma (Bombay)", duration: "4:30" },
      { id: 8, title: "Tere Bina (Guru)", duration: "4:10" }

    ],
  },
  {
    id: 5,
    name: "Shreya Ghoshal",
    img: artist5,
    songs: [
      { id: 9, title: "Tum Hi Tum", duration: "3:35" },
      { id: 10, title: "Sun Raha Hai", duration: "4:55" },
            { id: 10, title: "Laagi Tumse Mann Ki Lagan", duration: "4:35" },
      { id: 10, title: "Deewani Mastani", duration: "3:15" },
      { id: 10, title: "Manwa Laage", duration: "4:10" }

    ],
  },
  {
    id: 6,
    name: "Selena Gomez",
    img: artist6,
    songs: [
      { id: 9, title: "Lose You to Love Me", duration: "3:35" },
      { id: 10, title: "Come & Get It", duration: "4:55" },
            { id: 10, title: "Good for You", duration: "4:12" },
      { id: 10, title: "The Heart Wants What It Wants", duration: "4:45" },
      { id: 10, title: "Bad Liar", duration: "4:13" }


    ],
  },
  {
    id: 7,
    name: "Anirudh Ravichander",
    img: artist7,
    songs: [
      { id: 13, title: "Why This Kolaveri Di", duration: "3:55" },
      { id: 14, title: "Surviva (Vivegam)", duration: "4:33" },
            { id: 14, title: "Raang Raang (Master)", duration: "4:50" },
      { id: 14, title: "Putham Pudhu Kaalai ", duration: "4:38" },
      { id: 14, title: "Kanave Kanave (David)", duration: "4:20" }

    ],
  },
  {
    id: 8,
    name: "Arijit Singh",
    img: artist8,
    songs: [
      { id: 15, title: "Tum Hi Ho", duration: "4:00" },
      { id: 16, title: "Raabta", duration: "5:45" },
      { id: 16, title: "Channa Mereya ", duration: "4:45" },
      { id: 16, title: "Ilahi ", duration: "3:45" },
      { id: 16, title: "Muskurane", duration: "3:00" },

    ],
  },
  {
    id: 9,
    name: "Karthik",
    img: artist9,
    songs: [
      { id: 17, title: "Mazhaye Mazhaye", duration: "3:50" },
      { id: 18, title: "Aathichudi", duration: "4:26" },
            { id: 18, title: "Vennilave (Love Birds)", duration: "4:22" },
      { id: 18, title: "Yennamo Yedho (Vaaranam Aayiram)", duration: "4:26" },
      { id: 18, title: "Kannum Kannum", duration: "5:20" }

    ],
  },
  {
    id: 10,
    name: "K. S. Chithra",
    img: artist10,
    songs: [
      { id: 19, title: "Kannathil Muthamittal", duration: "3:35" },
      { id: 20, title: "Sundari Neeyum", duration: "4:14" },
            { id: 20, title: "Poovum Pottum", duration: "6:12" },
      { id: 20, title: "Vennilavum (Iruvar)", duration: "4:16" },
      { id: 20, title: "Chandralekha ", duration: "5:10" }

    ],
  },
];

const Artists = () => {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

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
          <div
            key={artist.id}
            className="artist-card"
            onClick={() =>
              navigate(`/artists/${artist.id}`, { state: artist })
            }
          >
            <img src={artist.img} alt={artist.name} className="artist-image" />
            <p className="artist-name">{artist.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artists;
