"use client";

import { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useDarkMode } from '../context/DarkModeContext';

interface NavProps {
  className?: string;
}

const Nav: React.FC<NavProps> = ({ className }) => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [hover, setHover] = useState(false); // Track hover state
  const [clicked, setClicked] = useState(false); // Track click state

  const handleClick = () => {
    toggleDarkMode();
    setClicked(true);
    setHover(true);
  };

  const handleMouseEnter = () => {
    if (!clicked) {
      setHover(true);
    }
  };

  const handleMouseLeave = () => {
    setHover(false);
    if (clicked) {
      setClicked(false);
    }
  };

  return (
    <nav className={`${className} sticky top-0 py-4 grid grid-cols-5 gap-5 items-center z-50`}>
      <div className="col-span-1"></div> {/* Placeholder for the first column */}
      <div className="col-span-3 flex justify-center items-center">
        <div className="flex items-center">
          <img src="/favicon.png" alt="favicon" className="w-10 h-10 mr-2" />
          <div className="text-left text-inherit leading-tight md:leading-normal">
            <span className="block md:inline">ansh</span>
            <span className="block md:inline">bhagania</span>
          </div>
        </div>
      </div>
      <div className="col-span-1 flex justify-start items-center">
        <button
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative w-10 h-10 border-2 border-gray-800 dark:border-white rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center bg-white dark:bg-gray-900 
            shadow-none hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] 
            active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:active:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
        >
          <FaMoon
            className={`absolute transition-all duration-300 transform ${
              darkMode
                ? hover && !clicked
                  ? "-translate-y-5 opacity-0"
                  : "translate-y-0 opacity-100"
                : hover && !clicked
                ? "translate-y-0 opacity-100"
                : "-translate-y-5 opacity-0"
            } text-gray-800 dark:text-white`}
          />
          <FaSun
            className={`absolute transition-all duration-300 transform ${
              darkMode
                ? hover && !clicked
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
                : hover && !clicked
                ? "translate-y-5 opacity-0"
                : "translate-y-0 opacity-100"
            } text-gray-800 dark:text-white`}
          />
        </button>
      </div>
    </nav>
  );
};

export default Nav;