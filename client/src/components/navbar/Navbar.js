import React from "react";
import "./navbar.css";
import { useState, useEffect} from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { ArtsList } from "../Arts-sidebar/ArtsList";

function Navbar() {
  const location = useLocation();
  const history = useHistory();
  
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

  const redirectToHome = ()=>{
    history.push('/');
  }

  return (
    <>
      <div className="navbar">
        <div className="left">
          <img src="./images/UC.PNG" alt="Unique Carving Logo" onClick={redirectToHome}/>
            <span  onClick={redirectToHome}>Unique carving</span>
        </div>
        <div className="right">
          <div className="marquee">
            <span>
              🚀 Site is under Development 🚀
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
