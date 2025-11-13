import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import TrendingSongs from "./components/TrendingSongs";
import Artists from "./components/Artists";
import Movies from "./components/Movies";
import MovieDetail from "./components/MovieDetail";
import SongDetail from "./components/SongDetail";
import ArtistDetail from "./components/ArtistDetail";
import LoginPage from "./components/Login";
import SignupForm from "./components/SignupForm";
import CreatePlaylist from "./components/CreatePlaylist";
import YourLibrary from "./components/YourLibrary";
import AdminPage from "./components/AdminPage"; // ✅ NEW import
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// ✅ Updated ProtectedRoute with role-based access
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const user = localStorage.getItem("user");
  const role = localStorage.getItem("role");

  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && role !== "admin") return <Navigate to="/home" replace />;

  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupForm />} />

        {/* ✅ Admin route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminPage />
            </ProtectedRoute>
          }
        />

        {/* Protected app routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="app-container">
                <Sidebar />
                <div className="main-content">
                  <Header />

                  <div className="page-content">
                    <Routes>
                      {/* Home page */}
                      <Route
                        path="/home"
                        element={
                          <>
                            <div className="quote">
                              <h2 className="quote">
                                "When words fail, music speaks."
                              </h2>
                              <p className="sub-quote">
                                Discover songs and create playlists, anytime and
                                anywhere.
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

                      {/* Movies */}
                      <Route path="/movies" element={<Movies />} />
                      <Route path="/movies/:id" element={<MovieDetail />} />

                      <Route path="/artists/:id" element={<ArtistDetail />} />
                      <Route
                        path="/create-playlist"
                        element={<CreatePlaylist />}
                      />
                      <Route path="/library" element={<YourLibrary />} />

                      {/* Song detail */}
                      <Route path="/songs/:songId" element={<SongDetail />} />
                    </Routes>
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
