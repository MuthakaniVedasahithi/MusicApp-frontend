import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import TrendingSongs from "./components/TrendingSongs";
import Artists from "./components/Artists";


const App = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header />

        <div className="page-content">
          {/* Quote */}
          <div className="quote">
           <h2 className="quote">"When words fail, music speaks."</h2>
          <p className="sub-quote">Discover songs and create playlists, anytime and anywhere.</p>
          </div>

          {/* Sections */}
          <section className="section">
            <TrendingSongs />
          </section>

          <section className="section">
            <Artists />
          </section>

          
        </div>
      </div>
    </div>
  );
};

export default App;
