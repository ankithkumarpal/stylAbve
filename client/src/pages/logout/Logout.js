import './logout.css';
import Navbar from '../../components/navbar/Navbar';
import { useState } from 'react';
import axios from'axios';
// import axiosInstance from '../../config';

function Logout() {

      let [phone,setPhone]= useState("")
      let [email,setEmail]  = useState("")
      let [username,setUsername]=useState("")
      let [password,setPassword]=useState('')
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
           <Navbar/>
            <div className="login">
          
                <div class="login_title"><span>unique carving</span></div>
                <div className="login_container">  
                <form className="registeration"  onSubmit={handleSubmit}>
                <div class="btn btn-primary mx-9 my-3">Register Form</div>
                    <div class="form-group">
                        <label for="Email1">Email :</label>
                        <input type="text" class="form-control" id="Email1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} />
                         
                    </div>
                  
                    <div class="form-group">
                        <label for="phone">phone:</label>
                        <input type="text" class="form-control" id="phone" aria-describedby="emailHelp" placeholder="Enter number" onChange={(e)=>setPhone(e.target.value)} />
                    </div>
                    <div class="form-group">
                        <label for="Password1">Password:</label>
                        <input type="password" class="form-control" id="Password1" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    {msg&&<span>Data already exists please login </span>}
                  
                    <div class="form-group form-check">    
                    </div>
                    <button type="submit" class="btn btn-primary mx-5"  >sign up</button>
                </form>
              
                </div>
                
            </div>
        </>
    );
}

export default Logout;
