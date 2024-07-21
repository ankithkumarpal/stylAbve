import "./navbar.css";
import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../../context/Context";

function Navbar() {
  const { user, dispatch } = useContext(Context);
  const history = useHistory();
  const handleClick = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    history.push("/pencilarts");
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
              🚀 Big Sale! Everything 50% OFF! Hurry up and grab your favorite products now! 🚀
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
        <div className="dropdown-menu">
          <ul>
            <li>
              <Link to="/pencilarts" className="link" onClick={toggleMenu}>Pencil Arts</Link>
            </li>
            <li>
              <Link to="/scrunchies" className="link" onClick={toggleMenu}>Scrunchies</Link>
            </li>
            <li>
              <Link to="/bike-arts" className="link" onClick={toggleMenu}>Bike Arts</Link>
            </li>
            <li>
              <Link to="/gift-card" className="link" onClick={toggleMenu}>Gift cards</Link>
            </li>
            <li>
              <Link to="/apparel-printing" className="link" onClick={toggleMenu}>Apparel printing</Link>
            </li>
            <li>
              <Link to="/my-cart" className="link" onClick={toggleMenu}>My cart</Link>
            </li>
            <li>
              <Link to="/order-history" className="link" onClick={toggleMenu}>Order history</Link>
            </li>
            <li>
              <Link to="/contact" className="link" onClick={toggleMenu}>Contact us</Link>
            </li>
            <li>
              <Link to="/profile-setting" className="link" onClick={toggleMenu}>Profile setting</Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default Navbar;
