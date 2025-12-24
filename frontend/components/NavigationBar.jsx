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
  profilePic: "https://via.placeholder.com/40",
  email: "test@example.com"
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
            <button
              className="px-5 text-xl hover:bg-[#474747] transition duration-300 flex items-center"
            >
              <img 
                src={user.profilePic} 
                alt="Profile" 
                className="w-10 h-10 rounded-full border-2 border-[#edebeb]"
              />
            </button>
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