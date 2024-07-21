import React from 'react'
import './login.css'
import { Link } from "react-router-dom";
import { useState ,useContext} from 'react';
import { Context } from '../../context/Context'; 
import axios from'axios';

export const Login = () => {
  let [email,setEmail]  = useState("")
    let [password,setPassword]=useState("")
    const {user,dispatch} = useContext(Context);
    const handlSubmit= async (e)=>{
        e.preventDefault();
        dispatch({type:"LOGIN_START"})
        try{
            const res = await axios.post("/auth/login",{
                email,password
            })
             res.data.data && window.location.replace('/');
             dispatch({type:"LOGIN_SUCCESS", payload:res.data.data});  
        }catch(err){
            dispatch({type:"LOGIN_FAILURE"});  
        }
    }

  return (
    <div className='login-form'>
      <div className='inner-section'>
        <div className='form-section'>
          <form className='login-form-inner' onSubmit={handlSubmit}>
            <div className='form-header'>
              <span className='form-title'>Login</span>
              <i className="bi bi-key form-icon"></i>
            </div>
            <div className="form-group mt-3">
              <label htmlFor="exampleInputEmail1" className='form-label'>Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                      placeholder="example@email.com" onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="form-group mt-3">
              <label htmlFor="exampleInputPassword1" className='form-label'>Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                                       onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className='form-footer'>
              <button type="submit" className="btn btn-primary mt-3 submit-btn">Submit</button>
            </div>
            <div className='oauth-section'>
              <span className='oauth-text'>or login through</span>
              <i className="bi bi-google oAuth-login"></i>
            </div>
            <div className='signup-section'>
              <span className='signup-text'>Don't have an account? <Link to='/signup' className='signup-link'  style={{ 
                    marginLeft: '0.5rem',
                    textDecoration: 'none',
                    fontweight:"bold",
                    color: 'saddlebrown',
                    cursor: 'pointer'
                  }}>Signup</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
