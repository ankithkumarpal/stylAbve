import './history.css';
import Navbar  from '../../components/navbar/Navbar';
import PastOrders from  '../../components/pastorder/Pastorder';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Context';
import axios from 'axios';


function Order() {
   const {user} =useContext(Context);
   const [orders,setOrders]=useState([]);
  // console.log(`/orders/${user._id}`);
  useEffect(() => {
    const getpost = async () => {
     const response = await axios.get(`/orders/${user._id}`);
      setOrders(response.data);
   //  console.log(response.data.length)
    }
    getpost()
  },[]);
  //console.log(orders);
    return (
        <>
          <Navbar/>
          <div className="order">
              <h1 style={{color:"green"}}>Orders History ....</h1>
               <div className="order_inner">
                 {orders.map((e)=>(
                    <PastOrders orderDetail={e}/>
                 ))}
                           
              </div>
          </div>
        </>
    );
  }
  
  export default Order;
  