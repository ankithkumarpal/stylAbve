import React from 'react'
import './artslist.css'
import { Link, useHistory } from "react-router-dom";

export const ArtsList = () => {
  return (
    <div style={{height:"100% " , fontFamily:'cursive' , display:"flex", alignItems:"center" , padding:"1rem" , flexDirection:"column"}}>
        <div className='' style={{fontFamily:"cursive" , height:"max-content" , width:"100%" , display:'flex' , alignItems:"center" , borderBottom:"1px solid navy"}}>
            <span style={{fontFamily:'cursive' , color:'black'}}>Arts collections</span>
        </div> 
      
        <Link to="/pencilarts" className="pencil-art mt-2 pt-2 pb-2 link">       
            <div className='' style={{fontFamily:"cursive" , height:"max-content" ,alignContent:"center", width:"100%" , display:'flex'}}>
                <i class="bi bi-pencil-fill" style={{marginRight:"1.2rem" , fontSize:"1.2rem" , color:'saddlebrown'}}></i>
                <span style={{fontFamily:'cursive' , color:"saddlebrown"}}>Pencil Arts</span>
            </div> 
        </Link>
       
        <Link to="/scrunchies" className="pencil-art mt-2 pt-2 pb-2 link">   
            <div className='' style={{fontFamily:"cursive" , height:"max-content" ,alignContent:"center", width:"100%" , display:'flex'}}>
                <i class="bi bi-flower3" style={{marginRight:"1.2rem" , fontSize:"1.2rem" , color:"saddlebrown"}}></i>
                <span style={{fontFamily:'cursive' , color:'saddlebrown'}}>Scrunchies</span>
            </div> 
        </Link>
        <Link to="/bike-arts" className="pencil-art mt-2 pt-2 pb-2 link"> 
        <div className='' style={{fontFamily:"cursive" , height:"max-content" ,alignContent:"center", width:"100%" , display:'flex'}}>
            <i class="bi bi-bicycle" style={{marginRight:"1.2rem" , fontSize:"1.2rem" , color:"saddlebrown"}}></i>
            <span style={{fontFamily:'cursive' , color:'saddlebrown'}}>Bike Arts</span>
        </div> 
        </Link>
        <Link to="/gift-card" className="pencil-art mt-2 pt-2 pb-2 link">   
        <div className='' style={{fontFamily:"cursive" , height:"max-content" ,alignContent:"center", width:"100%" , display:'flex'}}>
            <i class="bi bi-gift-fill" style={{marginRight:"1.2rem" , fontSize:"1.2rem" , color:'saddlebrown'}}></i>
            <span style={{fontFamily:'cursive' , color:'saddlebrown'}}>Gift cards</span>
        </div> 
        </Link>
        <Link to="/apparel-printing" className="pencil-art mt-2 pt-2 pb-2 link">   
            <div className='' style={{fontFamily:"cursive" , height:"max-content" ,alignContent:"center", width:"100%" , display:'flex'}}>
            <i class="bi bi-printer-fill" style={{marginRight:"1.2rem" , fontSize:"1.2rem" , color:"saddlebrown"}}></i>
                <span style={{fontFamily:'cursive' , color:'saddlebrown'}}>Apparel printing</span>
            </div> 
        </Link>
        <div className='mt-3' style={{fontFamily:"cursive" , height:"max-content" , width:"100%" , display:'flex' , alignItems:"center" , borderBottom:"1px solid navy"}}>
            <span style={{fontFamily:'cursive' , color:'black'}}>Profile & History</span>
        </div> 
        <Link to="/my-cart" className="pencil-art mt-2 pt-2 pb-2 link">   
            <div className='' style={{fontFamily:"cursive" , height:"max-content" ,alignContent:"center", width:"100%" , display:'flex'}}>
            <i class="bi bi-bag-heart-fill" style={{marginRight:"1.2rem" , fontSize:"1.2rem" , color:"saddlebrown"}}></i>
                <span style={{fontFamily:'cursive' , color:'saddlebrown'}}>My cart</span>
            </div> 
        </Link>
        <Link to="/order-history" className="pencil-art mt-2 pt-2 pb-2 link">   
            <div className='' style={{fontFamily:"cursive" , height:"max-content" ,alignContent:"center", width:"100%" , display:'flex'}}>
            <i class="bi bi-basket3-fill" style={{marginRight:"1.2rem" , fontSize:"1.2rem" , color:"saddlebrown"}}></i>
                <span style={{fontFamily:'cursive' , color:'saddlebrown'}}>Order history</span>
            </div> 
        </Link>
        <Link to="/contact" className="pencil-art mt-2 pt-2 pb-2 link">   
            <div className='' style={{fontFamily:"cursive" , height:"max-content" ,alignContent:"center", width:"100%" , display:'flex'}}>
                <i class="bi bi-person-lines-fill" style={{marginRight:"1.2rem" , fontSize:"1.2rem" , color:"saddlebrown"}}></i>
                <span style={{fontFamily:'cursive' , color:'saddlebrown'}}>Contact us</span>
            </div> 
        </Link>
        <Link to="/profile-setting" className="pencil-art mt-2 pt-2 pb-2 link">   
            <div className='' style={{fontFamily:"cursive" , height:"max-content" ,alignContent:"center", width:"100%" , display:'flex'}}>
            <i class="bi bi-gear-wide-connected" style={{marginRight:"1.2rem" , fontSize:"1.2rem" , color:"saddlebrown"}}></i>
                <span style={{fontFamily:'cursive' , color:'saddlebrown'}}>Profile setting</span>
            </div> 
        </Link>
    </div>
  )
}
