import './login.css';
import {Link} from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import { useState ,useContext} from 'react';
import { Context } from '../../context/Context'; 
import axios from'axios';
// import {axiosInstance} from '../../config'
function Login() {

    // let [phone,setPhone]= useState("")
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
             res.data && window.location.replace('/');
             dispatch({type:"LOGIN_SUCCESS", payload:res.data});  
        }catch(err){
            dispatch({type:"LOGIN_FAILURE"});  
        }
      
    }
    return (
        <>
         <Navbar/>
        
            <div className="login">
          
                <div class="login_title"><span>unique carving</span></div>
                <div className="login_container">  
                <form onSubmit={handlSubmit}>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email:</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Email"  onChange={(e)=>setEmail(e.target.value)}/>
                        <small id="emailHelp" class="form-text text-muted">We'll never share your credentials  with anyone else.</small>
                    </div>
                    {/* <div class="form-group">
                        <label for="phoneno">Phone No:</label>
                        <input type="password" class="form-control" id="phoneno" placeholder="Enter Phone no "  onChange={(e)=>setPhone(e.target.value)}/>
                    </div> */}
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"  onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <div class="form-group form-check">
                        
                    </div>
                    <button type="submit" class="btn btn-primary mx-5">Submit</button>
                    <Link to ='/signup'> <span className="login_signup">don't have account ?</span></Link>  
                </form>
              
                </div>
                
            </div>
          
        </>
    );
}

export default Login;
