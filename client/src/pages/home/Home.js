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
              <h1>Welcome to Unique Carving!</h1>
            </div>
            <div className="home_content">
              <p>
                Discover the art of precision with our expertly crafted pencil carvings. At Unique Carving, we take pride in using the finest quality pencils, ensuring every piece is a masterpiece with perfect dimensions and stunning detail. Our products have delighted over 100 partners, and the positive feedback speaks volumes about our craftsmanship.
              </p>
              <p>
                Dive into our world of intricate pencil art and experience the beauty of our creations firsthand. Click on <Link to='/pencilarts'>Pencil Arts</Link> to see a selection of our most exquisite work.
              </p>
              <p>
                Have questions or need assistance? Visit our <Link to='/aboutus'>Contact Us</Link> page. We’re here to help and look forward to resolving any inquiries you may have.
              </p>
              <p>
                Thank you for visiting Unique Carving. We’re excited to be a part of your artistic journey!
              </p>
            </div>
            <div className="details_order">
              <p>
                For any queries please visit the contact us page and reach out to us. We love to resolve your issues.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
