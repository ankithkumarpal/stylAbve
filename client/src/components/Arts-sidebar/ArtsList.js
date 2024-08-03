import React, { useEffect } from 'react';
import './artslist.css';
import { Link, useLocation } from "react-router-dom";

export const ArtsList = () => {
  const location = useLocation();

  // for highlighting the active side bar
  useEffect(() => {
  }, [location]);

  const getLinkClassName = (path) => {
    return `pencil-art mt-2 pt-2 pb-2 link ${location.pathname === path ? 'active' : ''}`;
  };

  return (
    <div style={{height:"100%" , fontFamily:'cursive' , display:"flex", alignItems:"center" , padding:"1rem" , flexDirection:"column"}}>
      <div className='' style={{fontFamily:"cursive" , height:"max-content" , width:"100%" , display:'flex' , alignItems:"center" , borderBottom:"1px solid navy"}}>
        <span style={{fontFamily:'cursive' , color:'black'}}>Arts collections</span>
      </div> 
      
      <Link to="/pencilarts" className={getLinkClassName('/pencilarts')}>       
        <div className='' style={{fontFamily:"cursive" , height:"max-content" ,alignContent:"center", width:"100%" , display:'flex'}}>
          <i className="bi bi-pencil-fill" style={{marginRight:"1.2rem" , fontSize:"1.2rem" , color:'saddlebrown'}}></i>
          <span style={{fontFamily:'cursive' , color:"saddlebrown"}}>Pencil Arts</span>
        </div> 
      </Link>
       
      <Link to="/scrunchies" className={getLinkClassName('/scrunchies')}>   
        <div className='' style={{fontFamily:"cursive" , height:"max-content" ,alignContent:"center", width:"100%" , display:'flex'}}>
          <i className="bi bi-flower3" style={{marginRight:"1.2rem" , fontSize:"1.2rem" , color:"saddlebrown"}}></i>
          <span style={{fontFamily:'cursive' , color:'saddlebrown'}}>Scrunchies</span>
        </div> 
      </Link>
      
      <Link to="/bike-arts" className={getLinkClassName('/bike-arts')}> 
        <div className='' style={{fontFamily:"cursive" , height:"max-content" ,alignContent:"center", width:"100%" , display:'flex'}}>
          <i className="bi bi-bicycle" style={{marginRight:"1.2rem" , fontSize:"1.2rem" , color:"saddlebrown"}}></i>
          <span style={{fontFamily:'cursive' , color:'saddlebrown'}}>Bike Arts</span>
        </div> 
      </Link>

      <Link to="/gift-card" className={getLinkClassName('/gift-card')}>   
        <div className='' style={{fontFamily:"cursive" , height:"max-content" ,alignContent:"center", width:"100%" , display:'flex'}}>
          <i className="bi bi-gift-fill" style={{marginRight:"1.2rem" , fontSize:"1.2rem" , color:'saddlebrown'}}></i>
          <span style={{fontFamily:'cursive' , color:'saddlebrown'}}>Gift cards</span>
        </div> 
      </Link>

      <Link to="/apparel-printing" className={getLinkClassName('/apparel-printing')}>   
        <div className='' style={{fontFamily:"cursive" , height:"max-content" ,alignContent:"center", width:"100%" , display:'flex'}}>
          <i className="bi bi-printer-fill" style={{marginRight:"1.2rem" , fontSize:"1.2rem" , color:"saddlebrown"}}></i>
          <span style={{fontFamily:'cursive' , color:'saddlebrown'}}>Apparel printing</span>
        </div> 
      </Link>

      <div className='mt-3' style={{fontFamily:"cursive" , height:"max-content" , width:"100%" , display:'flex' , alignItems:"center" , borderBottom:"1px solid navy"}}>
        <span style={{fontFamily:'cursive' , color:'black'}}>Profile & History</span>
      </div> 
      
      <Link to="/my-cart" className={getLinkClassName('/my-cart')}>   
        <div className='' style={{fontFamily:"cursive" , height:"max-content" ,alignContent:"center", width:"100%" , display:'flex'}}>
          <i className="bi bi-bag-heart-fill" style={{marginRight:"1.2rem" , fontSize:"1.2rem" , color:"saddlebrown"}}></i>
          <span style={{fontFamily:'cursive' , color:'saddlebrown'}}>My cart</span>
        </div> 
      </Link>

      <Link to="/order-history" className={getLinkClassName('/order-history')}>   
        <div className='' style={{fontFamily:"cursive" , height:"max-content" ,alignContent:"center", width:"100%" , display:'flex'}}>
          <i className="bi bi-basket3-fill" style={{marginRight:"1.2rem" , fontSize:"1.2rem" , color:"saddlebrown"}}></i>
          <span style={{fontFamily:'cursive' , color:'saddlebrown'}}>Order history</span>
        </div> 
      </Link>

      <Link to="/aboutus" className={getLinkClassName('/aboutus')}>   
        <div className='' style={{fontFamily:"cursive" , height:"max-content" ,alignContent:"center", width:"100%" , display:'flex'}}>
          <i className="bi bi-person-lines-fill" style={{marginRight:"1.2rem" , fontSize:"1.2rem" , color:"saddlebrown"}}></i>
          <span style={{fontFamily:'cursive' , color:'saddlebrown'}}>About us</span>
        </div> 
      </Link>

      <Link to="/profile-setting" className={getLinkClassName('/profile-setting')}>   
        <div className='' style={{fontFamily:"cursive" , height:"max-content" ,alignContent:"center", width:"100%" , display:'flex'}}>
          <i className="bi bi-gear-wide-connected" style={{marginRight:"1.2rem" , fontSize:"1.2rem" , color:"saddlebrown"}}></i>
          <span style={{fontFamily:'cursive' , color:'saddlebrown'}}>Profile setting</span>
        </div> 
      </Link>
    </div>
  )
};
