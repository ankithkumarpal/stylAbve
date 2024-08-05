
import axios from "axios";
const api = axios.create({
    baseURL: process.env.Baseurl,
});

export const  getPencilProducts = async () => {
    try {
      const response = await axios.get("/product/get-products");
      return response;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  