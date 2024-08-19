import React from "react";
import "./navbar.css";
import { useState, useEffect} from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { ArtsList } from "../Arts-sidebar/ArtsList";

function Navbar() {
  const location = useLocation();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [location.pathname]);

  return (
    <>
      <div className="navbar">
        <div className="left">
          <Link to="/" className="link">
            <span>Unique carving</span>
          </Link>
        </div>
        <div className="right">
          <div className="marquee">
            <span>
              🚀 Big Sale! Everything 50% OFF! Hurry up and grab your favorite products now! 🚀
              🚀 Get your products at you in 2-3 days 🚀
            </span>
          </div>
          <div className={`hamburger ${isMenuOpen ? "open" : ""}`} onClick={toggleMenu}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={closeMenu}>X</button>
            <ArtsList />
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
