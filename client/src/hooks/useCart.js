import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartItem,
  increaseCartQuantity,
  decreaseCartQuantity,
  addCartItem,
  updateItemQuantity,
} from "../features/cartSlice";
import { setToggleCart } from "../features/toggleCart";
import axios from "axios";

const useCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  // Remove cart item
  const removeCartItem = (id) => {
    const cartItems = JSON.parse(localStorage.getItem("cart"));
    const newCartItems = cartItems.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(newCartItems));
    dispatch(deleteCartItem(id));
  };

  // increase quantity of cart item
  const increaseQuantity = (id) => {
    const cartItems = JSON.parse(localStorage.getItem("cart"));
    const targetItemIndex = cartItems.findIndex((item) => item.id === id);
    cartItems[targetItemIndex].quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cartItems));
    dispatch(increaseCartQuantity(id));
    const test1 = JSON.parse(localStorage.getItem("cart"));
    console.log(test1);
  };

  // decreaes quantity of cart item
  const decreaseQuantity = (id) => {
    const cartItems = JSON.parse(localStorage.getItem("cart"));
    const targetItemIndex = cartItems.findIndex((item) => item.id === id);
    if (cartItems[targetItemIndex].quantity - 1 < 1) {
      removeCartItem(id);
    } else {
      // Decrement the quantity
      cartItems[targetItemIndex].quantity -= 1;

      // Update localStorage with the modified cartItems
      localStorage.setItem("cart", JSON.stringify(cartItems));

      // Dispatch action to update the Redux store
      dispatch(decreaseCartQuantity(id));
    }

    const test1 = JSON.parse(localStorage.getItem("cart"));
    console.log(test1);
  };

  // close the cart
  const closeCart = () => {
    dispatch(setToggleCart());
  };

  // toggle the cart
  const toggleCart = () => {
    dispatch(setToggleCart());
  };

  // Add product to the cart
  const addToCart = (id, name, price, image) => {
    const newCartItem = {
      id: id,
      name: name,
      price: price,
      image: image,
      quantity: 1,
    };

    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingCartItemIndex = currentCart.findIndex(
      (item) => item.id === id
    );

    if (existingCartItemIndex !== -1) {
      // If item already exsists update quantity
      currentCart[existingCartItemIndex].quantity += 1;
      dispatch(updateItemQuantity(id));
    } else {
      currentCart.push(newCartItem);
      dispatch(addCartItem(newCartItem));
    }

    localStorage.setItem("cart", JSON.stringify(currentCart));
  };

  // total $$ of cart
  const cartTotal = () => {
    const total = cart.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );
    return total.toFixed(2);
  };

  // clear cart from localstorage & clear users cart
  const clearCart = async () => {
    const userEmail = auth[1].email;

    try {
      localStorage.removeItem("cart");
      const response = await axios.post("http://localhost:5252/clearcart", {
        email: userEmail,
      });

      alert("hello");
    } catch (error) {
      console.error(error.message);
    }
  };

  return {
    removeCartItem,
    increaseQuantity,
    decreaseQuantity,
    closeCart,
    addToCart,
    cartTotal,
    toggleCart,
    clearCart,
  };
};

export default useCart;
