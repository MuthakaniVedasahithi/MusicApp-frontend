import { useState } from "react";
import { Link } from "react-router-dom";
import "./Movies.css";

export const movies = {
  Tollywood: [
    { id: 4, 
      title: "Aravindha Sametha", director: "Trivikram", img: "/Movieimages/tolly1.jpg", 
      songs: [{
        title: "Anaganaganaga" , singer: "Armaan Malik", duration: "4:47" },
        { title: "Reddy Ikkada Soodu", singer: "Daler Mehndi,Anjana Sowmaya", duration: "4:04"},
        {title: "Yeda Poyinado", singer: "Kailash Kher", duration: "5:05"},
        {title: "Tourch Bearer", singer: "Thaman s", duration: "2:06"}
      ] },
      { id: 5, 
      title: "Rangastalam", director: "Sukumar", img: "/Movieimages/tolly3.png", 
      songs: [{
        title: "Yentha Skkagunnave" , singer: "Devi Sri Prasad", duration: "4:25" },
        { title: "Ranga Ranga Rangastalana", singer: "Rahul Sipligunj", duration: "5:08"},
        {title:"Rangamma Mangamma", singer: "M.M.Manasi,DSP", duration: "4:11"},
        {title: "Aa Gattununtaava", singer: "Shiva Naagulu", duration: "3:12"},
        {title: "Orayyo", singer: "Chandra Bose", duration: "5:16"}
      ] },
       { id: 6, 
      title: "Pushpa", director: "Sukumar", img: "/Movieimages/tolly3.jpg", 
      songs: [{
        title: "Pushpa Pushpa" , singer: "Mika Singh", duration: "4:16" },
        { title: "Daakko Daakko Meka", singer: "Sivam", duration: "4:55"},
        {title:"Srivalli", singer: "Sid Sriram", duration: "3:41"},
        {title: "Eyy Bidda Idhi Naa Adda", singer: "Nakash Aziz", duration: "3:54"},
        {title: "Saami Saami", singer: "Mounika Yadav", duration: "3:43"},
                {title: "Gango Renuka Thalli", singer: "Mahalingam,DSP", duration: "3:38"}

      ] },

      { id: 7, 
      title: "Sita Ramam", director: "Hanu Raghavapudi", img: "/Movieimages/tolly4.png", 
      songs: [{
        title: "Inthandham" , singer: "Vishal Chandrashekhar", duration: "3:38" },
        { title: "Sita Ramam", singer: "Vishal Chandrashekhar", duration: "3:34"},
        {title:"Kaanunna Kalyanam", singer: "Vishal Chandrashekhar", duration: "3:52"},
        {title: "Oh Sita Hey Rama", singer: "Vishal Chandrashekhar", duration: "4:06"},
        {title: "Yevarini Adaganu", singer: "Vishal Chandrashekhar", duration: "2:28"},

      ] },
      { id: 8, 
      title: "Gita Govindham", director: "Hanu Raghavapudi", img: "/Movieimages/tolly5.png", 
      songs: [{
        title: "Inkem Inkem Inkem kavalee" , singer: "Gopi Sundar,Sid Sriram", duration: "4:27" },
        { title: "Yenti Yenti", singer: "Chinmayi", duration: "3:19"},
        {title:"Vachindhamma", singer: "Sid Sriram", duration: "4:10"},
        {title: "What is Life", singer: "Vijay Deverakonda", duration: "2:59"},
        {title: "Kanureppla kalaam", singer: "Gopi Sundar", duration: "2:42"},

      ] }
      

  ],
  Hollywood: [
    { 
      id: 1, 
      title: "Inception", 
      director: "Christopher Nolan", 
      img: "/Movieimages/holly1.jpg",
      songs: [
        { title: "Time", singer: "Hans Zimmer", duration: "4:35" },
        { title: "Dream is Collapsing", singer: "Hans Zimmer", duration: "2:23" },
      ]
    },
  { id: 2, 
      title: "Harry Poter", director: "Chris, Mike, David ", img: "/Movieimages/holly2.png", 
      songs: [{
        title: "Hedwing's Theme" , singer: "John Williams", duration: "5:09" },
        { title: "Christmas at Hogwarts", singer: "John Williams", duration: "2:56"},
        {title:"Do The Hippogriff", singer: "Jason Buckle", duration: "3:37"},
        {title: "This is The Night", singer: "Steve Claydon", duration: "3:37"},
        {title: "Magic Works", singer: "Steve Claydon", duration: "4:02"},
        {title: "Double Trouble", singer: "John Williams", duration: "1:37"},
        {title: "In Noctem", singer: "Nicholas Hooper", duration: "2:01"},
        {title: "Dumbledore", singer: "Nicholas Hooper", duration: "1:19"}

      ] }
  ],
  Bollywood: [
    { 
      id: 3, 
      title: "3 Idiots", 
      director: "Rajkumar Hirani", 
      img: "/Movieimages/holly2.png",
      songs: [
        { title: "All Is Well", singer: "Sonu Nigam", duration: "3:58" },
        { title: "Give Me Some Sunshine", singer: "Suraj Jagan", duration: "4:05" },
      ]
    },
  ],
  
};

const Movies = () => {
  const [showAllState, setShowAllState] = useState({
    Hollywood: false,
    Bollywood: false,
    Tollywood: false,
  });

  const toggleShowAll = (category) => {
    setShowAllState((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div className="section">
      <h2>Popular Movies</h2>
      {Object.keys(movies).map((category) => (
        <div key={category} className="movie-category-section">
          <div className="category-header">
            <h3>{category}</h3>
            <span
              className="toggle-link"
              onClick={() => toggleShowAll(category)}
            >
              {showAllState[category] ? "Back" : "Show All"}
            </span>
          </div>
          <div className={showAllState[category] ? "grid-view" : "row-view"}>
            {movies[category].map((movie) => (
              <Link key={movie.id} to={`/movies/${category}/${movie.id}`} className="movie-card">
  <img src={movie.img} alt={movie.title} className="movie-poster" />
  <div className="movie-info">
    <p className="movie-title">{movie.title}</p>
    <p className="movie-director">{movie.director}</p>
  </div>
</Link>

            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Movies;
