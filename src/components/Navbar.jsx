import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="navbar bg-base-100 shadow-sm border-b border-b-white/15">
      <div className="flex-1">
        <Link className="btn btn-ghost text-2xl" to="/">
          Paste
        </Link>
      </div>

      <div className="flex-none md:hidden">
        <button className="btn btn-ghost" onClick={() => setIsOpen(!isOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      <div className="hidden md:flex">
        <ul className="menu menu-horizontal px-1 text-lg">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/pastes">Pastes</Link>
          </li>
        </ul>
      </div>

      {isOpen && (
        <div className="absolute top-16 right-0 left-0 z-50 bg-base-100 border-t border-base-200 shadow-md lg:hidden">
          <ul className="menu p-6 space-y-4 text-lg text-base-content">
            <li>
              <Link
                to="/"
                className="hover:bg-base-200 rounded-lg px-3 py-2"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/pastes"
                className="hover:bg-base-200 rounded-lg px-3 py-2"
                onClick={() => setIsOpen(false)}
              >
                Pastes
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
