"use client";

import { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useDarkMode } from '../context/DarkModeContext';
import '../styles/Nav.css';

interface NavProps {
  className?: string;
}

const Nav: React.FC<NavProps> = ({ className }) => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [hover, setHover] = useState(false); // Track hover state
  const [clicked, setClicked] = useState(false); // Track click state

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
            onClick={() => {
              toggleDarkMode();
              setClicked(true);
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => {
              setHover(false);
              setClicked(false);
            }}
            className={`theme-toggle-button ${hover ? 'hover' : ''} ${clicked ? 'clicked' : ''}`}
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
            }`}
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
            }`}
          />
         </button>
      </div>
    </nav>
  );
};

export default Nav;