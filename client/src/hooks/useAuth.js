import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSignedUp } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { setUser } from "../features/authSlice";
import { setCart } from "../features/cartSlice";
import useCart from "./useCart";

// import Cookies from "js-cookie";

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  // Signup
  const signUp = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5252/signup", {
        email: email,
        password: password,
      });
      dispatch(setSignedUp(""));
      navigate("/login");
    } catch (error) {
      dispatch(setSignedUp(error.response.data.message));
      console.error(error);
    }
  };

  // authenticate user
  const authUser = async () => {
    try {
      const response = await axios.get("http://localhost:5252/profile", {
        withCredentials: true,
      });

      dispatch(setUser(response.data.data.user));

      return response.data.data.user;
    } catch (error) {
      console.error(error);
      console.log("no user detected");
      throw error;
    }
  };

  // Signin
  const signIn = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5252/signin",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      await authUser();

      const cart = JSON.parse(localStorage.getItem("cart"));
      console.log(response.data.data.user.email);
      const userEmail = response.data.data.user.email;

      // Send cart
      const newCart = { email: userEmail, cart: cart };
      const sendCart = await axios.post("http://localhost:5252/addcart", {
        newCart,
      });

      // Gets users cart and setCart state
      const getCart = await axios.get("http://localhost:5252/cart", {
        params: {
          email: userEmail,
        },
      });
      const filteredCart = getCart.data.cart.cart.filter((item) => !item.email);
      console.log(filteredCart);

      dispatch(setCart(filteredCart));
      localStorage.setItem("cart", JSON.stringify(filteredCart));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5252/logout",
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("User successfully logged out");
      } else {
        console.log("Logout failed");
      }
      const cart = JSON.parse(localStorage.getItem("cart"));
      const userEmail = auth[1].email;
      console.log(userEmail);
      const newCart = { email: userEmail, cart: cart };
      // clear local storage
      localStorage.removeItem("cart");

      // update cart on signout
      const updateCart = await axios.post("http://localhost:5252/updatecart", {
        newCart,
      });
    } catch (error) {
      console.error(error);
    }
    console.log("hello");
  };

  return { signUp, signIn, authUser, signOut };
};

export default useAuth;
