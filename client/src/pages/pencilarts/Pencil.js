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
  const [item, setItem] = useState([]);
  const { addToast } = useToasts();
  const [isLoading, setIsLoading] = useState(true);
  const user = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    if (item.length === 0) {
      getProducts();
    }
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get("/product/get-products");
      setItem(response.data.data);
      addToast('Products fetched successfully', { appearance: 'success' });
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setIsLoading(false);
    }
  };

  const addToCart = async (product, imageSrc) => {
    if (!user.user) {
      addToast('Please login to add items to the cart', { appearance: 'warning' });
      history.push("/login");  // Redirect to login page
      return;
    }

    setIsLoading(true);
    let cartDetail = {
      color: product.color,
      price: product.price,
      email: user.user.email,
      productId: product._id
    };

    try {
      const res = await axios.post("/cart/add-to-cart", cartDetail, {
        headers: {
          'Authorization': `Bearer ${user.user.token}`,
          'Content-Type': 'application/json'
        }
      });

      if (res.data === "Already Exist") {
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
          <BeatLoader loading={isLoading} color="white" />
        </div>
        <div className="product">
          {item?.map((pro) => {
            const base64String = Buffer.from(pro.image.data.data).toString("base64");
            const imageSrc = `data:image/png;base64,${base64String}`;
            return (
              <div className="product-container" key={pro._id}>
                <div className="image">
                  <div className="image-contaner">
                    <span> &nbsp;Rs:{pro.price}/-</span>
                    <img src={imageSrc} alt={pro._id} />
                  </div>
                </div>
                <div className="button">
                  <Model product={pro} imageSrc={imageSrc} />
                  <button className="btn btn-warning" onClick={() => addToCart(pro, imageSrc)}>Add to cart</button>
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
