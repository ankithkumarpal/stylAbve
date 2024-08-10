import React from 'react'
import './login.css'
import { Link } from "react-router-dom";
import { useState , useEffect} from "react";
import axios from'axios';
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";

export const Signup = () => {
  const history = useHistory();
  let [name , setName] = useState("");
  let [phone,setPhone]= useState("")
  let [email,setEmail]  = useState("")
  let [password,setPassword]=useState('')
  let [confirmPassword , setConfirmPassword] = useState('');
  let [msg ,setMsg]=useState(false);

   const { addToast } = useToasts();
   const [isSaveDisabled, setIsSaveDisabled] = useState(true);
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
    if (
      name &&
      email &&
      phone.match(/^\d{10}$/) &&
      password && 
      password.length >= 6 &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    ) {
      setIsSaveDisabled(false);
    } else {
      setIsSaveDisabled(true);
    }
  }, [name, email, phone]);

  const handleSubmit= async (e)=>{
      e.preventDefault();
      setIsLoading(true);
     try{
        const res = await axios.post("https://unqiue-carving.onrender.com/api/auth/register",{
            name,email,phone,password
        })
        addToast("Registeration successfull", { appearance: "success" });
        history.push('/login')
     }catch(err){
         setMsg(true);
         console.log(err);
     }finally{
      setIsLoading(false);
     }
  }

  return (
    <div className='login-form'>
      <div className='inner-section'>
        <div className='form-section'>
          <form className='login-form-inner' onSubmit={handleSubmit}>
            <div className='form-header'>
              <span className='form-title'>Register</span>
            </div>
            <div className="form-group mt-3">
              <label htmlFor="exampleInputEmail1" className='form-label'>Name</label>
              <input type="string" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="name"
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
              <button type="submit" className="btn btn-primary mt-3 submit-btn btn-fixed" style={{backgroundColor:'saddlebrown' , border:'none'}}

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
