import React from 'react';
import './admin.css';
import Navbar  from '../../components/navbar/Navbar';
import axios from 'axios';
import { useEffect,useState } from 'react';
import Name from '../../components/namescomp/Name';
import PastOrders from '../../components/pastorder/Pastorder';
import AdminpastOrders from'../../components/adminpastorder/Adminpastorder';

function Admin() {

    const [allOrders,setallOrders]= useState([]);

   useEffect(()=>{
      const   fetchingaAllOrders= async()=>{
           const  fetchedData = await axios.get('/orders/');
           setallOrders(fetchedData.data)
       }

       fetchingaAllOrders();
   },[])
    return (
        <>
          <Navbar/>
          <div className="order">
              <h1 style={{color:"green"}}>Orders History ....</h1>
               <div className="order_inner">
                 {allOrders.map((e)=>(
                    <AdminpastOrders orderDetail={e}/>
                 ))}
                           
              </div>
          </div>
        </>
    );
  }
  
  export default Admin;
  