import React, { useEffect } from "react";
import "./artslist.css";
import { Link, useLocation } from "react-router-dom";
import { getLastLogin, getUserId, getUserName } from "../../services/routpath";

export const ArtsList = () => {
  const location = useLocation();

  useEffect(() => {}, [location]);

  const getLinkClassName = (path) => {
    return `pencil-art mt-2 pt-2 pb-2 link ${
      location.pathname === path ? "active" : ""
    }`;
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        padding: "1rem",
        flexDirection: "column",
      }}
    >
      <div
        className=""
        style={{
          height: "max-content",
          width: "100%",
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid navy",
        }}
      >
        <span style={{ color: "black" }}>
          Arts collections
        </span>
      </div>

      <Link to="/pencilarts" className={getLinkClassName("/pencilarts")}>
        <div
          className=""
          style={{
            height: "max-content",
            alignContent: "center",
            width: "100%",
            display: "flex",
          }}
        >
          <i
            className="bi bi-pencil-fill"
            style={{
              marginRight: "1.2rem",
              fontSize: "1.2rem",
              color: "saddlebrown",
            }}
          ></i>
          <span style={{color: "saddlebrown" }}>
            Pencil Arts
          </span>
        </div>
      </Link>

      <Link to="/scrunchies" className={getLinkClassName("/scrunchies")}>
        <div
          className=""
          style={{
            height: "max-content",
            alignContent: "center",
            width: "100%",
            display: "flex",
          }}
        >
          <i
            className="bi bi-flower3"
            style={{
              marginRight: "1.2rem",
              fontSize: "1.2rem",
              color: "saddlebrown",
            }}
          ></i>
          <span style={{ color: "saddlebrown" }}>
            Scrunchies
          </span>
        </div>
      </Link>

      <Link to="/bike-arts" className={getLinkClassName("/bike-arts")}>
        <div
          className=""
          style={{
            height: "max-content",
            alignContent: "center",
            width: "100%",
            display: "flex",
          }}
        >
          <i
            className="bi bi-bicycle"
            style={{
              marginRight: "1.2rem",
              fontSize: "1.2rem",
              color: "saddlebrown",
            }}
          ></i>
          <span style={{ color: "saddlebrown" }}>
            Bike Arts
          </span>
        </div>
      </Link>

      <Link to="/gift-card" className={getLinkClassName("/gift-card")}>
        <div
          className=""
          style={{
            height: "max-content",
            alignContent: "center",
            width: "100%",
            display: "flex",
          }}
        >
          <i
            className="bi bi-gift-fill"
            style={{
              marginRight: "1.2rem",
              fontSize: "1.2rem",
              color: "saddlebrown",
            }}
          ></i>
          <span style={{color: "saddlebrown" }}>
            Gift cards
          </span>
        </div>
      </Link>

      <Link
        to="/apparel-printing"
        className={getLinkClassName("/apparel-printing")}
      >
        <div
          className=""
          style={{
            height: "max-content",
            alignContent: "center",
            width: "100%",
            display: "flex",
          }}
        >
          <i
            className="bi bi-printer-fill"
            style={{
              marginRight: "1.2rem",
              fontSize: "1.2rem",
              color: "saddlebrown",
            }}
          ></i>
          <span style={{ color: "saddlebrown" }}>
            Apparel printing
          </span>
        </div>
      </Link>

      <div
        className="mt-3"
        style={{
          height: "max-content",
          width: "100%",
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid navy",
        }}
      >
        <span style={{ color: "black" }}>
          Profile & History
        </span>
      </div>

      {
        getUserId() &&  (
          <>
           <Link to="/my-cart" className={getLinkClassName("/my-cart")}>
        <div
          className=""
          style={{
            height: "max-content",
            alignContent: "center",
            width: "100%",
            display: "flex",
          }}
        >
          <i
            className="bi bi-bag-heart-fill"
            style={{
              marginRight: "1.2rem",
              fontSize: "1.2rem",
              color: "saddlebrown",
            }}
          ></i>
          <span style={{ color: "saddlebrown" }}>
            My cart
          </span>
        </div>
      </Link>

      <Link to="/order-history" className={getLinkClassName("/order-history")}>
        <div
          className=""
          style={{
            height: "max-content",
            alignContent: "center",
            width: "100%",
            display: "flex",
          }}
        >
          <i
            className="bi bi-basket3-fill"
            style={{
              marginRight: "1.2rem",
              fontSize: "1.2rem",
              color: "saddlebrown",
            }}
          ></i>
          <span style={{  color: "saddlebrown" }}>
            Order history
          </span>
        </div>
      </Link>
          </>
        )
      }
    
      <Link to="/aboutus" className={getLinkClassName("/aboutus")}>
        <div
          className=""
          style={{
            height: "max-content",
            alignContent: "center",
            width: "100%",
            display: "flex",
          }}
        >
          <i
            className="bi bi-person-lines-fill"
            style={{
              marginRight: "1.2rem",
              fontSize: "1.2rem",
              color: "saddlebrown",
            }}
          ></i>
          <span style={{  color: "saddlebrown" }}>
            About us
          </span>
        </div>
      </Link>

      {getUserId() != null ? (
        <Link
          to="/profile-setting"
          className={getLinkClassName("/profile-setting")}
        >
          <div
            className=""
            style={{
              height: "max-content",
              alignContent: "center",
              width: "100%",
              display: "flex",
            }}
          >
            <i
              className="bi bi-person-fill-check"
              style={{
                marginRight: "1.2rem",
                fontSize: "1.2rem",
                color: "saddlebrown",
              }}
            ></i>
            <span style={{ fontFamily: "cursive", color: "saddlebrown" }}>
              {getUserName()}
              <p style={{ fontSize: "0.7rem", margin: "0%", padding: "0%" }}>
                last login : {getLastLogin()}{" "}  - IST
              </p>
            </span>
          </div>
        </Link>
      ) : (
        <Link
          to="/login"
          className={getLinkClassName("/login")}
        >
          <div
            className=""
            style={{
              height: "max-content",
              alignContent: "center",
              width: "100%",
              display: "flex",
            }}
          >
            <i
              className="bi bi-box-arrow-in-right"
              style={{
                marginRight: "1.2rem",
                fontSize: "1.2rem",
                color: "saddlebrown",
              }}
            ></i>
            <span style={{color: "saddlebrown" }}> Login
            </span>
          </div>
        </Link>
      )}
    </div>
  );
};
