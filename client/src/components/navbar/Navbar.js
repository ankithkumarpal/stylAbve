import "./navbar.css";
import react from "react";
import { Link, useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import { Context } from "../../context/Context";
function Navbar() {
  const { user, dispatch } = useContext(Context);
  const history = useHistory();
  const handleClick = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    history.push("/pencilarts");
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
          <ul>
            <Link to="/pencilarts" className="link">
              <li>penicl arts</li>
            </Link>
            {!user ? (
              <Link to="/login" className="link">
                <li>login</li>
              </Link>
            ) : (
              <>
                <li>{user.email.split("@")[0]}</li>
                <li onClick={handleClick}>{user && "logout"}</li>
              </>
            )}

            {user && (
              <Link to={`/cart`} className="link cart">
                <i class="fas fa-shopping-cart"></i>
              </Link>
            )}

            <li>

            <div class="dropdown">
              <button
                class="dropdown-toggle drop-down-button"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Explore options
              </button>
              <div
                class="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
                style={{ backgroundColor: "grey" }}
              >
                <Link to="/profile" className="link">
                  <li>profile</li>
                </Link>
                <Link to="/contact" className="link">
                  <li>contact us </li>
                </Link>
                {user && user.isAdmin && (
                  <Link to={`/admin/${user._id}`} className="link admin">
                    <li>admin</li>
                  </Link>
                )}
              </div>
            </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
