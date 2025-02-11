import React from "react";
import "./aboutus.css";

const AboutUs = () => {
  return (
    <div className="about-us">
      <header className="about-us-header">
        <h1>About Us</h1>
      </header>
      <section className="about-us-section">
        <h2>Our History</h2>
        <p>
          Unique carving was founded in 2022 with the mission to provide the best pencil carved items with customization as per customers' needs. Over the years, we have grown significantly and continue to innovate in our field.
          We use quality pencils that give perfect dimensions for carving and also look attractive. We have delivered more than 100 of our products to our partners and received a good response to our products.
        </p>
      </section>

      <section className="about-us-section">
        <h2>Our Mission</h2>
        <p>
          We hope you love our carving products. We are committed to continuously improving and ensuring that you keep visiting our website.
        </p>
      </section>

      <section className="about-us-section">
        <h2>Contact Us</h2>
        <p>
          For any queries,
          If you have any questions or would like to learn more about our services. we are eager to resolve any issues you might have, please contact us at:
        </p>
        <div style={{paddingTop:'14px'}}>
        <p>Email: <b style={{color:"black"}}>uniquecarving@gmail.com</b></p>
        {/* <p>Phone: <b style={{color:"black"}}>(+91) 8309145402</b></p> */}
        {/* <div className="social-media mt-5">
          <a href="https://www.instagram.com/uniquecarving/" target="_blank" rel="noopener noreferrer" className="bi bi-instagram" style={{color:"red"}}></a>
          <a href="https://www.linkedin.com/in/ankithpal/" target="_blank" rel="noopener noreferrer" className="bi bi-linkedin" style={{color:"blue"}}></a>
          <a href="https://www.twitter.com/ankith_pal" target="_blank" rel="noopener noreferrer" className="bi bi-twitter" style={{color:"blue"}}></a>

        </div> */}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
