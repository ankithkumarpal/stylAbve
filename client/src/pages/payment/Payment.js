import './payment.css';
import Navbar from '../../components/navbar/Navbar';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Context';
import axios from'axios';
import StripeCheckout from 'react-stripe-checkout';
import { useHistory } from 'react-router';
// import axiosInstance from '../../config';

var React = require('react');
var ReactDOM = require('react-dom');
var ScrollArea = require('react-scrollbar');

const STRIPE_PUBLIC_KEY="pk_test_51JyAT3SC7uOQJa7qOGILU9ryNUDcPgcZTfEfqHpKfTa5CiFp1YEtAraWpzVVlfWeOg2yKPQ9JMvfczsFKTP0j4Qm00aRwoSuwu"

function Payment() {
    const [username, setUsername] = useState([
        { name: ''}
    ])
    const [total,setTotal] = useState(450);
    const [msg,setmsg]=useState(false);
    const [error,seterror]= useState(false);
    const {user}= useContext(Context);

    const history = useHistory();

    const [stripeToken,setstripeToken]=useState(null);

    const generatetoken=(token)=>{
           setstripeToken(token);
    }
   // stripeToken && console.log(stripeToken.id);
      
    useEffect(()=>{

        const mrequest=async (req,res)=>{
            try{
                const resData = await  axios.post("/pay/payment",{
                    tokenId:stripeToken.id,
                    amount:total*100,
                    email:username.email
                });
                 //console.log(resData.data);
                  resData && handleSubmit()
          }catch(err){
              console.log(err);
          }
        };
       stripeToken&& mrequest() 
    },[stripeToken])
    
    const handleChange = (e,index) => {
      let  values=[...username];
    //  console.log(values)
      values[index][e.target.name]=e.target.value;
      setUsername(values)
    }
   //console.log(username)

    const  handleAdd=()=>{
        let values = [...username]
        if(values.length>4){
            setmsg(true);
        }else{
            setUsername([...username,{name:''}]);
            setTotal((username.length+1)*450);   
        }
        
    }
    const handleSub=(index)=>{
        const values=[...username];
        if(values.length==1){
            return setUsername(values);
        }else{
         values.splice(index,1);
         setUsername(values) 
         setTotal(total-450);
         if(msg){
             setmsg(false)
         }
        }  
    }

   const handleSubmit= async (e)=>{
  //  e.preventDefault();
    try{
        //console.log(user.phone);
        // console.log(username);
        // console.log(total)
       const res = await axios.post("/orders/order",{
             phone:user.phone,
             names:username,
             email:user.email,
             amount:total
       })
       res.data && history.push(`/cart/${user._id}`);
     // console.log(res.data)
    //    console.log(res.data.amount)
    //console.log(username)
    }catch(err){
       seterror(true)
       console.log(err);
    }
   }
   
//    console.log(username[0].name)

    return (
        <>
            <Navbar />
            <div className="home">
                <div className="payment">
                    <div className="pay_info">
                        <div className="user_info">
                            <div className="user_name">

                                {msg && <span style={{color:"red"}}>sorry ! you can buy 5 items only at a time  !</span>}
                                {username.map((user,index)=>{
                                    return (
                                <div className='input_block' key={index}>
                                    <div>  <input type="text" name="name" placeholder="name" value={user.name} onChange={(e) => handleChange(e,index)} /></div>
                                    <div className="input_block_minus"><i className="fas fa-minus" onClick={()=>handleSub(index)} ></i></div>
                                    <div className="input_block_minus"><i className="fas fa-plus"onClick={()=>handleAdd()}></i></div>
                                </div>
                              )})}
                            </div>
                           
                        </div>
                        {error &&  <p>something went wrong </p> }
                      
                        <hr />
                        <div className="quantity_info">
                           
                            <div className="total_amount">
                                <div className="total"> Total Amount (₹)</div>
                                <div className="amount">{total}/-</div>
                            </div>
                            <div className="ptpayment">
                                <StripeCheckout name="unique carving"
                                billingAddress
                                shippingAddress
                                description={`Your Total amount is ${total}`}
                                amount ={`${total}*100`}
                                token={generatetoken}
                                stripeKey={STRIPE_PUBLIC_KEY}>
                                  <button type="button" className="btn btn-primary">Proceed to payment</button>
                                </StripeCheckout>
                             
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Payment;


//onClick={(e)=>handleSubmit(e)}
