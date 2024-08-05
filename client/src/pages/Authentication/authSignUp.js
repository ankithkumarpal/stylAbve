import React from 'react'
import Navbar from "../../components/navbar/Navbar";
import "./authLogin.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from'axios';

import Img from "../../assests/1.jpeg";
import Img1 from "../../assests/2.jpeg";
import Img2 from "../../assests/3.jpeg";
import Img3 from "../../assests/4.jpeg";
import Img4 from "../../assests/5.jpeg";
import Img5 from "../../assests/8.jpeg";
import flower from "../../assests/flower.jpeg";

function AuthLogin() {
 
    let [phone,setPhone]= useState("")
    let [email,setEmail]  = useState("")
    let [password,setPassword]=useState('')
    let [confirmPassword , setConfirmPassword] = useState('');
    let [msg ,setMsg]=useState(false);
 
    const handleSubmit= async (e)=>{
        e.preventDefault();
       try{
          const res = await axios.post("/auth/register",{
              email,phone,password
          })
          res.data&& window.location.replace('/login');
          console.log(res)
       }catch(err){
           setMsg(true);
           console.log(err);
       }
    }
  return (
    <>
      <Navbar />
      <section>
        {" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>{" "}
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <div class="signin">
          <div class="content">
            <h2>Sign In</h2>
            <form className="registeration"  onSubmit={handleSubmit}>
            <div class="form">
              <div class="inputBox">
                <input type="text" required onChange={(e)=>setEmail(e.target.value)}/> <i>Email</i>
              </div>
              <div class="inputBox">
                <input type="number" required onChange={(e)=>setPhone(e.target.value)}/> <i>Phonenumber</i>
              </div>
              <div class="inputBox">
                <input type="password" required onChange={(e)=>setPassword(e.target.value)}/> <i>Password</i>
              </div>
              <div class="inputBox">
                <input type="password" required onChange={(e)=>setConfirmPassword(e.target.value)}/> <i>Confirm Password</i>
              </div>
              <div class="links">
                {" "}
                <Link to="login">Already have Acccount ? </Link> <Link to="/login"> Login</Link>
              </div>
              <div class="inputBox">
                <input type="submit" value="SignUp" />
              </div>
            </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default AuthLogin;
