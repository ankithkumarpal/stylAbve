import React from 'react'
import './login.css'
import { Link } from "react-router-dom";
import { useState} from "react";
import axios from'axios';

export const Signup = () => {
  let [name , setName] = useState("");
  let [phone,setPhone]= useState("")
  let [email,setEmail]  = useState("")
  let [password,setPassword]=useState('')
  let [confirmPassword , setConfirmPassword] = useState('');
  let [msg ,setMsg]=useState(false);

  const handleSubmit= async (e)=>{
      e.preventDefault();
     try{
        const res = await axios.post("/auth/register",{
            name,email,phone,password
        })
        res.data&& window.location.replace('/login');
        console.log(res)
     }catch(err){
         setMsg(true);
         console.log(err);
     }
  }

  return (
    <div className='login-form'>
      <div className='inner-section'>
        <div className='form-section'>
          <form className='login-form-inner' onSubmit={handleSubmit}>
            <div className='form-header'>
              <span className='form-title'>Login</span>
              <i className="bi bi-key form-icon"></i>
            </div>
            <div className="form-group mt-3">
              <label htmlFor="exampleInputEmail1" className='form-label'>Name</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="name"
              required onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className="form-group mt-3">
              <label htmlFor="exampleInputEmail1" className='form-label'>Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="example@email.com"
              required onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="form-group mt-3">
              <label htmlFor="exampleInputPassword1" className='form-label'>Phone number</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="phone no"
              required onChange={(e)=>setPhone(e.target.value)}/>
            </div>
            <div className="form-group mt-3">
              <label htmlFor="exampleInputPassword1" className='form-label'>Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="password"
              required onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className="form-group mt-3">
              <label htmlFor="exampleInputPassword1" className='form-label'>Confirm password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="confirm password"
              required onChange={(e)=>setConfirmPassword(e.target.value)}/>
            </div>
            <div className='form-footer'>
              <button type="submit" className="btn btn-primary mt-3 submit-btn " style={{backgroundColor:'saddlebrown' , border:'none'}}>Submit</button>
            </div>
            <div className='signup-section'>
              <span className='signup-text'>Account already exists? <Link to='/login' className='signup-link'  style={{ 
                    marginLeft: '0.5rem',
                    textDecoration: 'underline',
                    color: 'saddlebrown',
                    cursor: 'pointer'
                  }}>Login</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
