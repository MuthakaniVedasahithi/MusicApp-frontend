import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import TrendingSongs from "./components/TrendingSongs";
import Artists from "./components/Artists";
import Movies from "./components/Movies";
import MovieDetail from "./components/MovieDetail";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Header />

          <div className="page-content">
            <Routes>
              {/* Home page */}
              <Route
                path="/"
                element={
                  <>
                    <div className="quote">
                      <h2 className="quote">"When words fail, music speaks."</h2>
                      <p className="sub-quote">
                        Discover songs and create playlists, anytime and anywhere.
                      </p>
                    </div>

                    <section className="section">
                      <TrendingSongs />
                    </section>

                    <section className="section">
                      <Artists />
                    </section>
                  </>
                }
              />

              {/* Popular Movies page */}
              <Route path="/movies" element={<Movies />} />
                      <Route path="/movies/:category/:movieId" element={<MovieDetail />} />

            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
