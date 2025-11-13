import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Movies.css";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [showAll, setShowAll] = useState({
    tollywood: false,
    bollywood: false,
    hollywood: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:7076/admin/movies")
      .then((res) => {
        console.log("Movies fetched:", res.data);
        setMovies(res.data);
      })
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  // Categorizing from API
  const tollywoodMovies = movies.filter(
    (m) => m.category?.toLowerCase() === "tollywood"
  );
  const bollywoodMovies = movies.filter(
    (m) => m.category?.toLowerCase() === "bollywood"
  );
  const hollywoodMovies = movies.filter(
    (m) => m.category?.toLowerCase() === "hollywood"
  );

  // Helper
  const renderMovieRow = (title, movieList) => (
    <div className="category-section">

      <div className="category-header">
        <h2 className="category-title">{title}</h2>

        <span
          className="toggle-link"
          onClick={() =>
            setShowAll((prev) => ({
              ...prev,
              [title.toLowerCase()]: !prev[title.toLowerCase()],
            }))
          }
        >
          {showAll[title.toLowerCase()] ? "Back" : "Show All"}
        </span>
      </div>

      <div className={showAll[title.toLowerCase()] ? "grid-view" : "movie-grid"}>
        {movieList.length > 0 ? (
          movieList.map((movie) => (
            <div
              key={movie.id}
              className="movie-card"
              onClick={() => navigate(`/movies/${movie.id}`)}
            >
              {movie.imageBase64 ? (
                <img
                  src={`data:image/jpeg;base64,${movie.imageBase64}`}
                  alt={movie.title}
                  className="movie-poster"
                />
              ) : (
                <p style={{ color: "white" }}>No Poster</p>
              )}

              <div className="movie-info">
                <p className="movie-title">{movie.title}</p>
                <p className="movie-director">Director: {movie.director}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-movies">No movies available</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="movies-container">
      {renderMovieRow("Tollywood", tollywoodMovies)}
      {renderMovieRow("Bollywood", bollywoodMovies)}
      {renderMovieRow("Hollywood", hollywoodMovies)}
    </div>
  );
};

export default Movies;
