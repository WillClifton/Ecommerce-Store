import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";
import useCart from "../hooks/useCart";

const Cart = () => {
  const { removeCartItem, increaseQuantity, decreaseQuantity, closeCart } =
    useCart();

  const toggleCart = useSelector((state) => state.toggleCart);
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  return (
    <div
      className={`fixed top-0 right-0 w-screen max-w-sm bg-gray-100 px-4 py-8 sm:px-6 lg:px-8 z-50 shadow-xl ${
        toggleCart ? "" : "hidden"
      }`}
    >
      <button
        className="absolute end-4 top-4 text-gray-600 transition hover:scale-110"
        onClick={closeCart}
      >
        <span className="sr-only">Close cart</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="mt-4 space-y-6">
        <ul className="space-y-4">
          {cart.map((item) => (
            <li key={item.id} className="flex items-center gap-4">
              <img
                src={item.image}
                alt=""
                className="h-16 w-16 rounded object-cover"
              />

              <div>
                <h3 className="text-sm text-gray-900">{item.name}</h3>

                <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                  <div>
                    <dt className="inline">Price: ${item.price}</dt>
                  </div>
                </dl>
              </div>

              <div className="flex flex-1 items-center justify-end gap-2">
                <div className="flex justify-center items-center gap-1">
                  <div className="flex flex-col items-center justify-center">
                    <button onClick={() => increaseQuantity(item.id)}>
                      <i className="fas fa-angle-up text-xs hover:text-yellow-400"></i>
                    </button>
                    <button onClick={() => decreaseQuantity(item.id)}>
                      <i className="fas fa-angle-down text-xs hover:text-yellow-400"></i>
                    </button>
                  </div>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    id="Line1Qty"
                    className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                  />
                </div>

                <button
                  className="text-gray-600 transition hover:text-red-600"
                  onClick={() => removeCartItem(item.id)}
                >
                  <span className="sr-only">Remove item</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="space-y-4 text-center">
          <button
            className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400 w-full"
            onClick={() => {
              navigate("/cart");
              closeCart();
            }}
          >
            View my cart ({cart.length})
          </button>

          <button
            className="block rounded bg-yellow-400  px-5 py-3 text-sm text-black transition hover:bg-gray-600 w-full"
            onClick={() => {
              if (auth[1] && cart.length > 0) {
                navigate("/checkout");
              } else if (cart.length > 0) {
                navigate("/login");
              } else {
                alert("Please add items to cart");
              }

              closeCart();
            }}
          >
            Checkout
          </button>

          <button
            className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
            onClick={closeCart}
          >
            Continue shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
