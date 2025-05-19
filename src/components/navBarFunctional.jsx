import { useState, useRef, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase"; // adjust if needed
import assets from "../data";
import { CiSearch } from "react-icons/ci";
import { FaBell } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function NavBarFunctional() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleSearchInput = () => setShowSearchInput((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        return;
      }

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}`
        );
        const data = await response.json();
        setSearchResults(data.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setSearchResults([]);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchMovies();
    }, 500); // Adding a debounce so it doesn't fire every keystroke

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  return (
    <div className="flex justify-between items-center py-5 px-8 absolute z-50 w-full bg-transparent">
      {/* Left */}
      <div className="flex items-center gap-8 cursor-pointer">
        <img src={assets.logo} alt="Logo" className="h-8" />
        <ul className="hidden md:flex gap-6 text-white text-sm font-medium">
          <li><a href="#">Home</a></li>
          <li><a href="#">TV Shows</a></li>
          <li><a href="#">Movies</a></li>
          <li><a href="#">New & Popular</a></li>
          <li><a href="#">My List</a></li>
          <li><a href="#">Browse by Languages</a></li>
        </ul>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6 relative" ref={dropdownRef}>
        {/* Search */}
        <div className="flex items-center gap-2 relative">
          <button 
            onClick={toggleSearchInput} 
            className="text-white text-2xl hover:text-gray-400 cursor-pointer"
          >
            <CiSearch />
          </button>

          {/* Animated Search Input */}
          <input
            type="text"
            placeholder="Titles, people, genres"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`bg-transparent border-b border-white text-white px-4 py-1 outline-none transition-all duration-300 ease-in-out ${
              showSearchInput ? 'w-48 opacity-100' : 'w-0 opacity-0'
            }`}
          />

          {/* Search Results */}
          {searchResults.length > 0 && showSearchInput && (
            <div className="absolute top-12 bg-white text-black w-72 rounded-md shadow-md z-50 max-h-80 overflow-y-auto">
              {searchResults.map((movie) => (
                <div 
                  key={movie.id} 
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm flex items-center gap-2"
                  onClick={() => {
                    setSearchQuery(movie.title);
                    setSearchResults([]);
                  }}
                >
                  {movie.poster_path && (
                    <img 
                      src={`https://image.tmdb.org/t/p/w45${movie.poster_path}`} 
                      alt={movie.title} 
                      className="w-6 h-9 object-cover rounded"
                    />
                  )}
                  <span>{movie.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bell */}
        <button className="text-white text-2xl hover:text-gray-400 cursor-pointer">
          <FaBell />
        </button>

        {/* Avatar + Chevron */}
        <div onClick={toggleDropdown} className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 overflow-hidden ">
            <img
              src={assets.avatar}
              alt="User"
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = '/default-avatar.png'; }}
            />
          </div>
          <IoMdArrowDropdown
            className={`text-white text-xl transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
          />
        </div>

        {/* Dropdown */}
        {isDropdownOpen && (
          <div className="absolute right-0 top-12 w-52 bg-white text-black rounded-md shadow-lg z-50 p-3">
            <p className="text-xs px-2 py-1 text-gray-500 border-b border-gray-300 mb-2">
              {userEmail || "Not Logged In"}
            </p>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md text-sm"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
