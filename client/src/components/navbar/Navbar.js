import './navbar.css';
import react from 'react';
import {Link} from 'react-router-dom';
import { useState ,useContext} from 'react';
import { Context } from '../../context/Context';
function Navbar() {
   const  {user,dispatch}=useContext(Context);
  
   const handleClick =(e)=>{
         e.preventDefault()
         dispatch({type:"LOGOUT"});
   }
    return (
        <>
           <div className="navbar">
             <div className='left'>
               <Link to="/" className="link">
                         <span>Unique carving</span> 
                </Link>
             </div>
               <div className='right'>
                    <ul>  
                        <Link to="/pencilarts" className="link">
                              <li>penicl arts</li>  
                        </Link>
                        {/* <Link to="/payment" className="link">
                              <li>bikes art</li> 
                        </Link> */}
                        <Link to="/contact" className="link">
                               <li>contact us </li> 
                        </Link> 
                        {
                              !user ? <Link to="/login" className="link">
                               <li>login</li>
                             </Link> : 
                             <>
                             <li>{user.email}</li>
                             <li onClick={handleClick}>{user && "logout"}</li>
                             </>
                        }
                        
                          {
                                user && 
                                      <Link to ={`/cart/${user._id}`} className="link cart">
                                         <i class="fas fa-shopping-cart"></i>
                                     </Link> 
                          }

                          {
                                user && user.isAdmin && 
                                    <Link to ={`/admin/${user._id}`} className="link admin">
                                            <li>admin</li> 
                                    </Link> 
                          }

                    </ul>
                </div>

           </div>
        </>
    );
  }
  
  export default Navbar;
  