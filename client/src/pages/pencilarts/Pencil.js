import React from "react";
import "./pencil.css";
import Navbar from "../../components/navbar/Navbar";
import { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import Model from "../PaymentModel/modal";
import axios from "axios";
import { useToasts } from 'react-toast-notifications';
import { BeatLoader } from 'react-spinners';
import { useHistory } from "react-router-dom";

function Pencil() {
  const [items, setItems] = useState([]);
  const { addToast } = useToasts();
  const [isLoading, setIsLoading] = useState(true);
  const user = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get("https://unqiue-carving.onrender.com/api/product/get-products");
      setItems(response.data.data);
      addToast('Products fetched successfully', { appearance: 'success' });
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      addToast('Failed to fetch products', { appearance: 'error' });
      setIsLoading(false);
    }
  };

  const addToCart = async (product) => {
 
    setIsLoading(true);
    let cartDetail = {
      price: product.price,
      email: "ankith@gmail.com",
      productId: product._id,
      quantity:1
    };

    try {
      const res = await axios.post("/cart/add-to-cart", cartDetail, {
        headers: {
          'Authorization': `Bearer ${user.user.token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (res.data.message === "Already Exist") {
        addToast("Item already exists in cart", { appearance: 'info' });
      } else {
        addToast("Item added to cart successfully", { appearance: 'success' });
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      addToast('Failed to add item to cart', { appearance: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="home pencil-home">
        <div className="spinner">
          <BeatLoader loading={isLoading} color="#26aefc" />
        </div>
        <h3 style={{margin:"0%" , padding:"0%", color:"#eb2869"}} className="pencil-art-header">Pencils arts</h3>
        <div className="product pb-3">
          {items.map((product) => (
            <div className="product-container" key={product._id}>
              <div className="image">
                <div className="image-container">
                  <span className="price">Rs: {product.price}/-</span>
                  {product.imageUrls && product.imageUrls.length > 0 ? (
                    <img src={product.imageUrls[0]} />
                  ) : (
                    <p>No Image Available</p>
                  )}
                </div>
              </div>
              <div className="button">
                <Model product={product} />
                {/* <button className="btn btn-success" >Buy Now</button> */}
                <button className="btn btn-warning" onClick={() => addToCart(product)}>Add to cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Pencil;
