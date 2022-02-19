import './home.css';
import Navbar  from '../../components/navbar/Navbar';
import { useContext } from 'react';
import { Context } from '../../context/Context';
import { useLocation } from 'react-router';
function Home() {
  const {user} = useContext(Context);
 // console.log(user)
 const location = useLocation();
//  console.log(location)
    return (
        <>
          <Navbar/>
          <div className="home">
               <div className="home_inner">
                 <div className="home_content">
                  <h1>welcome to unique carving </h1>
                 </div>
                 <div className="home_content">
                      <p>  We use  the quality pencils which gives perfect dimensions for carving and also looks attractive. 
                        we have deliverd more than 100 of our products to our partner and we had a good response of our products so...</p>
                      <p>Hope you love our carving product </p>
                      <p>We are sure that you keep visiting our website </p>
                      <p> For sample products click on pencil arts  </p>
                 </div>
               </div>

               <div className="details_order">
                  <p> For any queries please visit contact us page and reach us out we love to resolve your issue.  </p>
               </div>
          </div>
        </>
    );
  }
  
  export default Home;
  