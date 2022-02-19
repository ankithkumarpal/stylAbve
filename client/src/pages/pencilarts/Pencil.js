
import './pencil.css';
import Navbar from '../../components/navbar/Navbar';
import image from '../../assests/pencil_demo.jpg'
import {Link}  from 'react-router-dom';
import {products} from '../../assests/products'
import { useContext, useReducer, useState } from 'react';
import { Context } from '../../context/Context';
function Pencil() {
    const [item,setItem]=useState(products);
    const {user} = useContext(Context);
 //   console.log(item);
    return (
        <>
           <Navbar/>
            <div className="home">
            <div className="pencil">
               { item.map((pro)=>( 
                <div className="container" key={pro.id}>
                    <div className='image'>
                        <img src={pro.image}alt={""} />
                    </div>
                    <div className="items_desc">
                        <span className="color">color : <span  style={{color: `${pro.color}`}} >{pro.color}</span>  </span>
                        <span className="line"></span>
                        <span className='price'> price :₹ {pro.price}/- </span>
                    </div>
                    <div className="orderNow">
                        <Link to={user ?"/payment":"/login"}>
                               <button > Order Now</button>
                        </Link>
                    </div>

                </div>
                ))} 
            </div>
            </div>
      
        </>
    );
}

export default Pencil;
