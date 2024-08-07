import React from 'react';
import './pastorder.css';
import NamesComp from '../namescomp/Name'
import { Link } from 'react-router-dom';
import { useContext, useState,useEffect } from 'react';
import { Context } from '../../context/Context';
import axios from'axios';

function PastOrder({orderDetail}) {
   const names= orderDetail.names;
   const {user}=useContext(Context);
    return (
        <>
          <div className="pastorder">
                <div className="pastorder_inner">
                      <div className="pastorder_billing">
                          <p className='orderdate'>{new Date(orderDetail.createdAt).toDateString()}    </p>
                          <p className='orderdate'> Amount : {orderDetail.amount}/-</p>
                        <div className="pastorder_billing"  style={{display:"flex",flexWrap:"wrap"}}>
                              <p>status :  {orderDetail.status}</p>
                              <Link  to={`/trackOrder/${orderDetail._id}`}className="link">
                              <p style={{cursor:'pointer',color:'blue'}}>trackOrder</p>
                              </Link>
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
  