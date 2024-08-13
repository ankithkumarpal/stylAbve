import React from 'react'
import './login.css'
import { Link } from "react-router-dom";
import { useState ,useEffect} from 'react';
import axios from'axios';
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";
import { getLogin } from '../../services/routpath';

export const Login = () => {
  const history = useHistory();
   let [email,setEmail]  = useState("")
   let [password,setPassword]=useState("")
   
   const { addToast } = useToasts();
   const [isSaveDisabled, setIsSaveDisabled] = useState(true);
   const [isLoading, setIsLoading] = useState(false);

   const handlSubmit= async (e)=>{
        e.preventDefault();
        setIsLoading(true);
        try{
            const res = await axios.post(getLogin,{
                email,password
            })
            if(res){
               localStorage.setItem("access-token",res.data.data.token);
               localStorage.setItem("user",JSON.stringify(res.data.data.user));
            }
            addToast("Login successfull", { appearance: "success" });
            history.push('/')
        }catch(err){ 
           addToast("Login failed", { appearance: "error" });
        }finally{
          setIsLoading(false);
        }
    }

    useEffect(() => {
      if (email && password
      ) {
        setIsSaveDisabled(false);
      } else {
        setIsSaveDisabled(true);
      }
    }, [email , password]);

    const handleForgotPassword = ()=>{
      history.push('/reset-password')
    }

  return (
    <div className='login-form'>
      <div className='inner-section'>
        <div className='reset-form-section'>
          <form className='login-form-inner' onSubmit={handlSubmit}>
          <header className="reset-password-header">
                <h1>Unique Carving</h1>
                <p>Crafting Unique Perfection</p>
              </header>
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
            <span className='forgot-password' onClick={handleForgotPassword}>Forgot password</span>
            <div className='form-footer'>
              <button type="submit" className="btn mt-3 submit-btn btn-fixed"
              disabled={isSaveDisabled || isLoading}
              >
              {isLoading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                "Submit"
              )}
              </button>
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
            <footer className="reset-password-footer mt-2">
                <p>
                  Thank you for trusting Unique Carving. Need help?{" "}
                  <a href="/aboutus">Contact us</a>
                </p>
              </footer>
          </form>
        </div>
      </div>
    </div>
  )
}
