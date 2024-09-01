import React, { useContext } from "react";
import { PaymentContext } from "../../context/PaymentContext";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { getHeaders, getPencilCarveProducts, getUserEmail, getUserId, getUserName, getUserPhone, productAddTocart } from "../../services/routpath";
import "./pencil.css";
import { BeatLoader } from "react-spinners";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import Model from "../PaymentModel/modal";

function Pencil() {
  const [items, setItems] = React.useState([]);
  const { addToast } = useToasts();
  const [isLoading, setIsLoading] = React.useState(true);
  const history = useHistory();
  const { initiatePayment } = useContext(PaymentContext);
  const location = useLocation();

  React.useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get(getPencilCarveProducts , {headers:getHeaders()});
      setItems(response.data.data.productsWithImages);
      addToast("Products fetched successfully", { appearance: "success" });
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      addToast("Failed to fetch products", { appearance: "error" });
      setIsLoading(false);
    }
  };

  const addToCart = async (product) => {
    if (getUserId() == null) {
      addToast("Please login to add to cart", { appearance: "warning" });
      history.push("/login");
      return;
    }
    setIsLoading(true);
    let cartDetail = {
      price: product.price,
      email: getUserEmail(),
      productId: product._id,
      quantity: 1,
    };

    try {
      const res = await axios.post(productAddTocart, cartDetail, {
        headers: getHeaders(),
      });

      if (res.data.message === "Already Exist") {
        addToast("Item already exists in cart", { appearance: "info" });
      } else {
        addToast("Item added to cart successfully", { appearance: "success" });
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      addToast("Failed to add item to cart", { appearance: "error" });
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
        <h3
          style={{
            margin: "0%",
            padding: "0%",
          }}
          className="pencil-art-header pt-2"
        >
          Pencil arts
        </h3>
        <div className="product pb-5">
          {items.map((product) => (
            <div className="product-container" key={product._id}>
              <div className="image">
                <div className="image-container">
                  <span className="price">Rs: {product.price}/-</span>
                  {product.imageUrls && product.imageUrls.length > 0 ? (
                    <img src={product.imageUrls[0]} alt={product.name} />
                  ) : (
                    <p>No Image Available</p>
                  )}
                </div>
              </div>
              <div className="button">
              <Model product={product} />
                <button
                  className="btn btn-warning" 
                  onClick={() => addToCart(product)}
                  disabled = 'true'
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Pencil;
