import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Shop from "./pages/Shop";
import { useDispatch } from "react-redux";
import CartPage from "./pages/CartPage";
import axios from "axios";
import { setProducts } from "./features/productsSlice";
import { setCart } from "./features/cartSlice";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Completion from "./pages/Completion";
import Checkout from "./pages/Checkout";
import useAuth from "./hooks/useAuth";

const App = () => {
  const dispatch = useDispatch();
  const { authUser } = useAuth();

  // Set products, cart state auth user.
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5252/products");
        console.log(response.data.data.products);

        dispatch(setProducts(response.data.data.products));
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();

    // if user authenticate
    authUser();

    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart && cart.length > 0) {
      dispatch(setCart(cart));
    } else {
      const emptyCart = [];
      localStorage.setItem("cart", JSON.stringify(emptyCart));
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Shop />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="login" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/completion" element={<Completion />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
};

export default App;
