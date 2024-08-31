
import React from 'react';
import './trackorder.css';
import Navbar from '../../components/navbar/Navbar'
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Context } from '../../context/Context';
import { useLocation } from 'react-router';
 function TrackOrder(){
    const [orderStatus,setorderStatus]=useState("");
    const[orders,setOrders]=useState([])
    const {user} =useContext(Context);
    const location  =useLocation();
    const pathname = location.pathname.split("/")[2];


    useEffect(() => {
      const getpost = async () => {
       const response = await axios.get(`/orders/singleorder/${pathname}`);
       setorderStatus(response.data.status);
       console.log(orderStatus)
      }
      getpost()
    },pathname);
     return (
        <>
        <Navbar/>
          <div className = "trackOrder">     
             <div className="inner_trackOrder">
                 <h3>Tracking order status</h3>
                 <div className="order_status_">
                     <div className="circle_text">
                       <div className="circle" style={ (orderStatus==="placed")||(orderStatus==="orderprepared") ||(orderStatus==="orderconform") || (orderStatus==="outfordelivery")|| (orderStatus==="delivered")? {backgroundColor:'green'}:{backgroundColor:'red'}}></div>
                       <div className="text" style={ (orderStatus=="placed")||(orderStatus=="orderprepared") ||(orderStatus=="orderconform") || (orderStatus=="outfordelivery")|| (orderStatus==="delivered")? {color:'green'}:{color:'red'}}>order placed</div>
                    </div>
                    <div className = "orderLine" style={(orderStatus==="placed")|| (orderStatus==="orderprepared") ||(orderStatus==="orderconform") || (orderStatus==="outfordelivery")|| (orderStatus==="delivered") ? {backgroundColor:'green'}:{backgroundColor:'red'}}></div>

                     <div className="circle_text">
                       <div className="circle" style={(orderStatus==="orderprepared") ||(orderStatus==="orderconform") || (orderStatus==="outfordelivery")|| (orderStatus==="delivered")? {backgroundColor:'green'}:{backgroundColor:'red'}}></div>
                       <div className="text" style={ (orderStatus==="orderprepared") ||(orderStatus==="orderconform") || (orderStatus==="outfordelivery")|| (orderStatus==="delivered")? {color:'green'}:{color:'red'}}>order conformed</div>
                    </div>
                    <div className = "orderLine" style={(orderStatus=="orderprepared") ||(orderStatus==="orderconform") || (orderStatus==="outfordelivery")|| (orderStatus==="delivered") ? {backgroundColor:'green'}:{backgroundColor:'red'}}></div>

                     <div className="circle_text">
                       <div className="circle" style={ (orderStatus==="orderprepared")|| (orderStatus==="outfordelivery")|| (orderStatus==="delivered") ? {backgroundColor:'green'}:{backgroundColor:'red'}}></div>
                       <div className="text" style={ (orderStatus==="orderprepared")|| (orderStatus=="outfordelivery")|| (orderStatus==="delivered")? {color:'green'}:{color:'red'}}>order prepared</div>
                    </div>
                    <div className = "orderLine" style={ (orderStatus==="orderprepared")||(orderStatus=="outfordelivery")|| (orderStatus==="delivered") ? {backgroundColor:'green'}:{backgroundColor:'red'}}></div>

                     <div className="circle_text">
                       <div className="circle" style={  (orderStatus==="outfordelivery")|| (orderStatus==="delivered") ? {backgroundColor:'green'}:{backgroundColor:'red'}}></div>
                       <div className="text" style={  (orderStatus==="outfordelivery")||(orderStatus==="delivered")? {color:'green'}:{color:'red'}}>out for delivery</div>
                    </div>
                    <div className = "orderLine" style={ (orderStatus==="outfordelivery")|| (orderStatus==="delivered") ? {backgroundColor:'green'}:{backgroundColor:'red'}}></div>

                    <div className="circle_text">
                       <div className="circle" style={ orderStatus===("delivered") ? {backgroundColor:'green'}:{backgroundColor:'red'}}></div>
                       <div className="text" style={ orderStatus===("delivered")? {color:'green'}:{color:'red'}}>delivered successful</div>
                    </div>

                 </div>
             </div>

          </div>
        </>
     )
}

export default TrackOrder;