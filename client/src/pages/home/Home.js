import React from 'react';
import "./home.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Home() {
  return (
    <>
      <div className="home">
        <div className="upper-layer">
          <div className="info-container">
            <div className="header">
              <h1>Welcome to Unique Carving</h1>
            </div>
            <div className="home_content">
              <p>
                We use the quality pencils which gives perfect dimensions for
                carving and also looks attractive. We have delivered more than
                100 of our products to our partners and we had a good response
                for our products so...
              </p>
              <p>Hope you love our carving products.</p>
              <p>We are sure that you will keep visiting our website.</p>
              <p>For sample products click on <Link to='/pencilarts'>pencil arts</Link></p>
            </div>
            <div className="details_order">
              <p>
                For any queries please visit the contact us page and reach out to us. We
                love to resolve your issues.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
