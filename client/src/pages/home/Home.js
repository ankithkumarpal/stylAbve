import "./home.css";
import Navbar from "../../components/navbar/Navbar";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { useLocation } from "react-router";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
function Home() {
  const { user } = useContext(Context);
  const location = useLocation();
  return (
    <>
      <Navbar />
      <div className="home">
        <div className="upper-layer">
          <div className="info-container">
            <div className="header">
              <h1>welcome to unique carving </h1>
            </div>
            <div className="home_content">
              <p>
                {" "}
                We use the quality pencils which gives perfect dimensions for
                carving and also looks attractive. we have deliverd more than
                100 of our products to our partner and we had a good response of
                our products so...
              </p>
              <p>Hope you love our carving product </p>
              <p>We are sure that you keep visiting our website </p>
              <p> For sample products click on<Link to={'/pencilarts'}> pencil arts </Link></p>
            </div>
            <div className="details_order">
              <p>
                {" "}
                For any queries please visit contact us page and reach us out we
                love to resolve your issue.{" "}
              </p>
            </div>
          </div>
        
        </div>
      </div>
    </>
  );
}

export default Home;