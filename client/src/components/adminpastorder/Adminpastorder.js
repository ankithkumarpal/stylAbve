import './adminpastorder.css';
import NamesComp from '../../components/namescomp/Name'
import { Link } from 'react-router-dom';
import { useContext, useState,useEffect } from 'react';
import { Context } from '../../context/Context';
import axios from'axios';

function PastOrder({orderDetail}) {
   const names= orderDetail.names;
   const {user}=useContext(Context);
   const [optionvalue,setoptionvalue]=useState(orderDetail.status);
 
    const handleChange= async (e)=>{
        e.preventDefault();
        const updatedata = await axios.put(`/orders/update/${orderDetail._id}`,{
            status:e.target.value
        })
        setoptionvalue(updatedata.data);
    }
    return (
        <>
          <div className="pastorder">
                <div className="pastorder_inner">
                    <div className="pastorder_billing">
                    <p>{new Date(orderDetail.createdAt).toDateString()}    </p>
                    <p > Amount : {orderDetail.amount}/-</p>
                    <div classNaem="pastorder_billing"  style={{display:"flex",flexWrap:"wrap"}}>
                          <p>status :{optionvalue}</p>
                          <select onChange={handleChange} className='admin_select' >
                          <option value="placed"> placed</option>
                          <option value="orderconform"> conformed</option>
                          <option value="orderprepared"> orderprepared</option>
                          <option value="outfordelivery"> outofdelivery</option>
                          <option value="delivered"> deliverd</option>
                          </select>
                    </div>
                  </div>
                  <div className="namecomp">
                    {
                    names.map((e)=>(
                      <NamesComp  namesDetail={e}/>
                    ))
                  }
                 
                   </div>
                </div>
              
          </div>
        </>
    );
  }
  
  export default PastOrder;
  