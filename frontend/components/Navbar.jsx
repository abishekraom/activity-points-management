import React from 'react';
import { useNavigate } from 'react-router-dom';

function NavigationBar() {
  const navigate = useNavigate();

  return (
    <div className="relative bg-[#555555] text-[#edebeb]">

      <button onClick={() => {
          navigate("/");
        }
      }
      className="text-3xl py-3 px-5"
      >Activity Points Tracker</button>

      <button onClick={() => {
          navigate("/about");
        }
      }
      className="absolute right-5 bottom-3 px-5 text-xl"
      >About</button>
    </div>
  )
}

export default NavigationBar;