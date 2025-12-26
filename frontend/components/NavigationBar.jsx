import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getData } from '../context/userContext.jsx';
import axios from 'axios';

function NavigationBar() {
  const navigate = useNavigate();

// Comment the below line while designing frontend
  //const { user, setUser } = getData();

// Uncomment the below section while working on frontend

  const [user, setUser] = useState({
  name: "Alex (Mock)",
  profilePic: "https://placehold.co/40",
  email: "test@example.com"
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
      setUser(null);
      setDropdownOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="h-20 bg-[#555555] text-[#edebeb] flex sticky top-0 z-10 justify-between px-5">

      <button onClick={() => {
          navigate("/");
        }
      }
      className="text-3xl py-3"
      >Activity Points Tracker</button>

      <div className="flex">
        <button onClick={() => {
            navigate("/about");
          }
        }
        className="px-5 text-xl hover:bg-[#474747] transition duration-300 flex items-center"
        >About</button>

        { 
          // Replace 'user' with 'true' while designing the frontend.
          user ? (
            <div className="relative flex" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="px-5 text-xl hover:bg-[#474747] transition duration-300 flex items-center"
              >
                <img 
                  src={user.profilePic} 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full border-2 border-[#edebeb]"
                />
              </button>

              {dropdownOpen && (
              <div className="absolute right-0 min-w-60 top-20 text-xl text-gray-700 bg-white shadow-lg transform origin-top transition-all">
                <div className="px-4 py-2 hover:bg-gray-100"
                onClick={() => navigate("/profile")}
                >
                  Profile
                </div>
                <div className="px-4 py-2 hover:bg-gray-100"
                onClick={handleLogout}>
                  Logout
                </div>
              </div>)}
            </div>
          ) : (
          <button onClick={() => {
              navigate("/login");
            }
          }
          className="px-5 text-xl hover:bg-[#474747] transition duration-300 flex items-center"
          >Login</button>
          )
        }
      </div>
    </div>
  )
}

export default NavigationBar;