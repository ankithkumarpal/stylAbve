import "./pencil.css";
import Navbar from "../../components/navbar/Navbar";
import { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import Model from "../PaymentModel/modal";
import axios from "axios";
import { useToasts } from 'react-toast-notifications';
import {BeatLoader} from 'react-spinners';

function Pencil() {
  const [item, setItem] = useState([]);
  const { addToast } = useToasts();
  const [isLoading , setIsLoading] = useState(true);
  const user = useContext(Context)
  
  useEffect(() => {
    if(item.length === 0){
      getProducts();
    }
  }, []);
  
  const getProducts = async () => {
    try {
      const response = await axios.get("/product/get-products");
      setItem(response.data.data);
      addToast('This is a toast message', { appearance: 'success' });
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setIsLoading(false);
    }
  };

  const addToCart = async(product , imageSrc)=>{
     setIsLoading(true);
    let cartDetail = {
      color : product.color,
      price : product.price,
      email : user.user.user.email,
      productId : product._id
    }
    await axios
      .post("/cart/add-to-cart", cartDetail , {
        headers: {
          'Authorization': `Bearer ${user.user.token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        if(res.data == "Already Exist"){
          setIsLoading(false);
          addToast("Already Exists", { appearance: 'success' });
        }else{
          setIsLoading(false);
          addToast("Added successfully", { appearance: 'success' });
        }
      })
      .catch((err) => {
        setIsLoading(false);
         addToast('Failed to add cart', { appearance: 'error' });
      });
  }
  return (
    <>
      <Navbar />
      <div className="home pencil-home">
        <div className="spinner">
            <BeatLoader loading={isLoading} color="white"/>
        </div>
        <div className="product">
          {item?.map((pro) => {
              const base64String = Buffer.from(pro.image.data.data).toString("base64");
              const imageSrc = `data:image/png;base64,${base64String}`;
            return (
              <div className="product-container">
                <div className="image">
                  <div className="image-contaner">
                    <span> &nbsp;Rs:{pro.price}/-</span>
                    <img src={imageSrc} alt={pro._id} key={pro._id} />
                  </div>
                </div>
                <div className="button">
                  <Model product={pro} imageSrc = {imageSrc} />
                  <button class="btn btn-warning" onClick={() => addToCart(pro , imageSrc)}>Add to cart</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default Pencil;
