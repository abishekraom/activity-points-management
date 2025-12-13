import React from 'react';
import { useNavigate } from 'react-router-dom';

function NavigationBar() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#555555] text-[#edebeb] flex justify-between px-5">

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

        <button onClick={() => {
            navigate("/login");
          }
        }
        className="px-5 text-xl hover:bg-[#474747] transition duration-300 flex items-center"
        >Login</button>
      
      </div>
    </div>
  )
}

export default NavigationBar;