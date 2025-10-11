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
     { 
  id: 27, 
  title: "KGF Chapter 1 (Telugu Dub)", 
  director: "Prashanth Neel", 
  img: "/Movieimages/tolly2.png", 
  songs: [
    { title: "Salaam Rocky Bhai", singer: "Ananya Bhat", duration: "3:55" },
    { title: "Garbadhi", singer: "Ananya Bhat", duration: "4:20" },
    { title: "Jokae", singer: "Ravi Basrur, Santhosh Venky", duration: "3:45" },
    { title: "Sidila Bharava", singer: "Vijay Urs", duration: "4:12" },
    { title: "Dheera Dheera", singer: "Ravi Basrur, Santhosh Venky", duration: "3:55" },
    { title: "The Monster Song", singer: "Adithi Sagar", duration: "3:40" },
    { title: "Salaam Rocky Bhai (Remix)", singer: "Ananya Bhat", duration: "3:15" }
  ]
},
       {
  id: 15,
  title: "The Family Star",
  director: "Parasuram Petla",
  img: "/Movieimages/image.png",
  songs: [
    { title: "Kalyani Vaccha Vacchaa", singer: "Karthik, Shreya Ghoshal", duration: "3:56" },
    { title: "Madhuramu Kadha", singer: "Sid Sriram", duration: "4:22" },
    { title: "Nandanandanaa", singer: "Anurag Kulkarni", duration: "3:47" },
    { title: "Chuttamalle", singer: "Shreya Ghoshal", duration: "3:58" },
    { title: "Kalyani Vaccha (Reprise)", singer: "Sid Sriram", duration: "4:10" },
    { title: "Family Star Title Track", singer: "Ram Miriyala", duration: "3:42" }
  ]
},


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

      ] },
      {
  id: 14,
  title: "777 Charlie",
  director: "Kiranraj K",
  img: "/Movieimages/tolly6.png",
  songs: [
    { title: "Torture Song", singer: "Vijay Prakash", duration: "3:41" },
    { title: "O' Deva", singer: "Nobina Nisha", duration: "4:08" },
    { title: "The Journey of Dharma", singer: "Raghu Dixit", duration: "3:56" },
    { title: "Life of Charlie", singer: "Vasuki Vaibhav", duration: "4:11" },
    { title: "Brindavana", singer: "Raghu Dixit", duration: "3:29" },
    { title: "The Soul of Dharma", singer: "Jubin Nautiyal", duration: "4:45" }
  ]
}

      

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
                { title: "Mombasa", singer: "Hans Zimmer", duration: "4:35" },
        { title: "waiting for a Train", singer: "Geek", duration: "4:38" },
        { title: "One Simple Idea", singer: "Hans Zimmer", duration: "4:03" },
        { title: "Deam within a Dream", singer: "Geek", duration: "3:30" },

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

      ] },
      { id: 3, 
      title: "Avengers", director: "Alan Silvestri ", img: "/Movieimages/holly3.jpg", 
      songs: [{
        title: "Arrival" , singer: "Alan Silvestris", duration: "5:09" },
        { title: "Tunnel chase", singer: "John Williams", duration: "2:56"},
        {title:"Stark Goes Green", singer: "Jason Buckle", duration: "3:37"},
        {title: "Helicarrier", singer: "Alan Silvestri", duration: "3:37"},
        {title: "Subjugation", singer: "Steve Claydon", duration: "4:02"},
        {title: "Dont't Take my Stuff", singer: "Alan Silvestri", duration: "1:37"},
        {title: "Red Ledger", singer: "Alan Silvestri", duration: "2:01"},
        {title: "Assault", singer: "Alan Silvestri", duration: "1:19"}

      ] },
      { id: 4, 
      title: "Mad Max", director: "George Miller ", img: "/Movieimages/holly4.avif", 
      songs: [{
        title: "Survive" , singer: "Junkie XL", duration: "6:16" },
        { title: "Brothers in Arms", singer: "John Williams", duration: "2:56"},
        {title:"The Doof Warrior", singer: "Jason Buckle", duration: "3:37"},
        {title: "We are not Things", singer: "Alan Silvestri", duration: "3:37"},
        {title: "My name in Max", singer: "Junkie XL", duration: "4:02"},
        {title: "The Case", singer: "Junkie XL", duration: "1:37"},
        {title: "Red Ledger", singer: "Junkie XL", duration: "2:01"}

      ] },
      { 
  id: 6, 
  title: "Avatar", 
  director: "James Cameron", 
  img: "/Movieimages/holly5.jpeg", 
  songs: [
    { title: "Jake’s First Flight", singer: "James Horner", duration: "4:48" },
    { title: "War", singer: "James Horner", duration: "11:21" },
    { title: "Becoming One of The People", singer: "James Horner", duration: "7:44" },
    { title: "I See You", singer: "Leona Lewis", duration: "4:20" },
    { title: "Climbing Up Iknimaya", singer: "James Horner", duration: "3:18" },
    { title: "Quaritch", singer: "James Horner", duration: "5:02" },
    { title: "Gathering All the Na’vi Clans", singer: "James Horner", duration: "5:14" }
  ]
},
{ 
  id: 7, 
  title: "The Dark Knight", 
  director: "Christopher Nolan", 
  img: "/Movieimages/holly6.png", 
  songs: [
    { title: "Why So Serious?", singer: "Hans Zimmer", duration: "9:14" },
    { title: "Like a Dog Chasing Cars", singer: "Hans Zimmer", duration: "5:02" },
    { title: "A Watchful Guardian", singer: "Hans Zimmer", duration: "6:45" },
    { title: "Aggressive Expansion", singer: "James Newton Howard", duration: "4:34" },
    { title: "I Am the Batman", singer: "Hans Zimmer", duration: "1:59" },
    { title: "Harvey Two-Face", singer: "James Newton Howard", duration: "6:16" },
    { title: "Introduce a Little Anarchy", singer: "Hans Zimmer", duration: "3:42" }
  ]
},

  ],
  Bollywood: [
   { 
  id: 15, 
  title: "Kal Ho Naa Ho", 
  director: "Nikkhil Advani", 
  img: "/Movieimages/bolly1.png", 
  songs: [
    { title: "Kal Ho Naa Ho", singer: "Sonu Nigam", duration: "5:21" },
    { title: "Maahi Ve", singer: "Sadhana Sargam, Udit Narayan, Sonu Nigam", duration: "5:36" },
    { title: "Pretty Woman", singer: "Shankar Mahadevan, Ravi Khote", duration: "4:40" },
    { title: "It's The Time To Disco", singer: "Vasundhara Das, Loy Mendonsa", duration: "4:30" },
    { title: "Har Ghadi Badal Rahi Hai", singer: "Sonu Nigam", duration: "5:26" },
    { title: "Kuch To Hua Hai", singer: "Alka Yagnik, Shaan", duration: "5:10" },
    { title: "Kal Ho Naa Ho (Sad)", singer: "Sonu Nigam", duration: "2:58" }
  ]
},
{ 
  id: 16, 
  title: "Rockstar", 
  director: "Imtiaz Ali", 
  img: "/Movieimages/bolly2.png", 
  songs: [
    { title: "Sadda Haq", singer: "Mohit Chauhan", duration: "6:04" },
    { title: "Kun Faya Kun", singer: "A.R. Rahman, Javed Ali, Mohit Chauhan", duration: "7:51" },
    { title: "Nadaan Parindey", singer: "Mohit Chauhan", duration: "6:25" },
    { title: "Phir Se Ud Chala", singer: "Mohit Chauhan", duration: "4:33" },
    { title: "Jo Bhi Main", singer: "Mohit Chauhan", duration: "4:20" },
    { title: "Tum Ho", singer: "Mohit Chauhan, Suzanne D'Mello", duration: "5:29" },
    { title: "Hawa Hawa", singer: "Mohit Chauhan", duration: "5:22" }
  ]
},
{ 
  id: 17, 
  title: "Chennai Express", 
  director: "Rohit Shetty", 
  img: "/Movieimages/bolly3.jpg", 
  songs: [
    { title: "Titli", singer: "Chinmayi Sripada, Gopi Sunder", duration: "4:35" },
    { title: "Lungi Dance", singer: "Yo Yo Honey Singh", duration: "4:32" },
    { title: "Kashmir Main Tu Kanyakumari", singer: "Arijit Singh, Sunidhi Chauhan", duration: "5:10" },
    { title: "Tera Rastaa Chhodoon Na", singer: "Anusha Mani, Amitabh Bhattacharya", duration: "4:40" },
    { title: "Ready Steady Po", singer: "Priya Panchal", duration: "3:45" },
    { title: "Chennai Express (Title Track)", singer: "S.P. Balasubrahmanyam, Jonita Gandhi", duration: "4:45" },
    { title: "One Two Three Four", singer: "Vishal Dadlani, Hamsika Iyer", duration: "4:10" }
  ]
},
{ 
  id: 18, 
  title: "Barfi!", 
  director: "Anurag Basu", 
  img: "/Movieimages/bolly4.jpg", 
  songs: [
    { title: "Ala Barfi!", singer: "Mohit Chauhan", duration: "4:45" },
    { title: "Phir Le Aaya Dil", singer: "Rekha Bhardwaj", duration: "4:36" },
    { title: "Main Kya Karoon", singer: "Nikhil Paul George", duration: "3:36" },
    { title: "Aashiyan", singer: "Nikhil Paul George, Shreya Ghoshal", duration: "4:19" },
    { title: "Kyon", singer: "Papon, Sunidhi Chauhan", duration: "4:12" },
    { title: "Saawali Si Raat", singer: "Arijit Singh", duration: "3:50" },
    { title: "Phir Le Aaya Dil (Reprise)", singer: "Arijit Singh", duration: "4:50" }
  ]
},
{ 
  id: 19, 
  title: "Dil Chahta Hai", 
  director: "Farhan Akhtar", 
  img: "/Movieimages/bolly5.jpg", 
  songs: [
    { title: "Dil Chahta Hai", singer: "Shankar Mahadevan", duration: "5:06" },
    { title: "Jaane Kyon", singer: "Udit Narayan, Alka Yagnik", duration: "5:20" },
    { title: "Koi Kahe Kehta Rahe", singer: "Shaan, Shankar Mahadevan", duration: "6:12" },
    { title: "Woh Ladki Hai Kahan", singer: "Shaan, Kavita Krishnamurthy", duration: "4:23" },
    { title: "Tanhayee", singer: "Sonu Nigam", duration: "5:12" },
    { title: "Kaisi Hai Yeh Rut", singer: "Hariharan", duration: "5:05" },
    { title: "Dil Chahta Hai (Reprise)", singer: "Shankar Mahadevan", duration: "3:58" }
  ]
},
{ 
  id: 20, 
  title: "Bajirao Mastani", 
  director: "Sanjay Leela Bhansali", 
  img: "/Movieimages/bolly6.avif", 
  songs: [
    { title: "Deewani Mastani", singer: "Shreya Ghoshal, Ganesh Chandanshive", duration: "5:59" },
    { title: "Pinga", singer: "Shreya Ghoshal, Vaishali Mhade", duration: "5:25" },
    { title: "Aayat", singer: "Arijit Singh", duration: "5:51" },
    { title: "Malhari", singer: "Vishal Dadlani", duration: "4:59" },
    { title: "Mohe Rang Do Laal", singer: "Pandit Birju Maharaj, Shreya Ghoshal", duration: "6:23" },
    { title: "Albela Sajan", singer: "Shashi Suman, Kunal Pandit", duration: "5:18" },
    { title: "Fitoori", singer: "Vaishali Mhade", duration: "4:30" }
  ]
}
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
