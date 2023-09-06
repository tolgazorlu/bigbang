import { useContext } from "react";
import { Link } from "react-router-dom";
import { Store } from "../Store";
import { CartItem } from "../types/Cart";
import { Helmet } from "react-helmet-async";
import Footer from "../layouts/Footer";
import {
  AiFillDelete,
  AiFillMinusCircle,
  AiFillPlusCircle,
} from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import EmptyCart from "../assets/animation/cart.json";
import Lottie from "lottie-react";

const ShoppingCart = () => {
  const {
    state: {
      cart: { cartItems },
    },
    dispatch,
  } = useContext(Store);

  const updateCartHandler = (item: CartItem, quantity: number) => {
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  const removeItemHandler = (item: CartItem) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  console.log(cartItems);

  return cartItems.length > 0 ? (
    <div className="sm:px-14 bg-white">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Helmet>
        <title>Complete your order...</title>
      </Helmet>
      <div className="w-full h-32 flex justify-start items-center">
        <div className="flex flex-col">
          <span className="font-extrabold text-gray-800 text-3xl font-poppins flex justify-center xl:justify-start">
           <span> Shopping Cart </span>
          </span>
        </div>
      </div>
      <hr className="h-px bg-gray-500 w-1/2" />
      <div className="grid grid-cols-2">
        <ul>
          {cartItems.map((item: CartItem) => (
            <li
              key={item._id}
              className="h-48 w-full border-b-[1px] border-gray-500"
            >
              <div className="h-full w-full p-2 flex">
                <img
                  className="h-full p-2 w-2/6 img-fluid img-thumbnail"
                  src={item.image}
                  alt={item.name}
                ></img>
                <div className="h-full w-4/6 p-2">
                  <div className="w-full h-1/3 p-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-200">{item.name}</span>
                      <button
                        className="p-1"
                        onClick={() => {
                          removeItemHandler(item);
                          toast.info("Product removed from cart");
                        }}
                      >
                        <AiFillDelete className="text-red-400 hover:text-red-500 w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="w-full h-1/3 p-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-200">Quantity</span>
                      <div className="flex items-center justify-center">
                        <button
                          className="p-1"
                          onClick={() => {
                            updateCartHandler(item, item.quantity - 1);
                            toast.info("Quantity decreased");
                          }}
                          disabled={item.quantity === 1}
                        >
                          <AiFillMinusCircle className="text-gray-400 hover:text-green-500 w-5 h-5" />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="p-1"
                          onClick={() => {
                            updateCartHandler(item, item.quantity + 1);
                            toast.info("Quantity increased");
                          }}
                          disabled={item.quantity === 8}
                        >
                          <AiFillPlusCircle className="text-gray-400 hover:text-green-500 w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-1/3 p-2">
                    <Link
                      className="btn-sm flex items-center justify-center bg-yellow-500 text-black w-full rounded-md font-bold"
                      to={"/product/" + item.slug}
                    >
                      Go to product
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="w-full h-[60vh] px-4 rounded">
          <div className="w-full bg-slate-900 h-full rounded-md">
            <div className="h-1/6 py-6 p-4 px-8 font-inter font-bold text-white text-xl flex items-center">
              Order Summary
            </div>
            <ul className="h-4/6 px-8 text-lg ">
              <li className="py-4 flex justify-between items-center border-b-[0.3px] italic">
                <span>Subtotal</span>
                <span>$99.00</span>
              </li>
              <li className="py-4 flex justify-between items-center border-b-[0.3px] italic">
                <span>Shipping Estimate</span>
                <span>$5.00</span>
              </li>
              <li className="py-4 flex justify-between items-center border-b-[0.3px] italic">
                <span>Tax Estimate</span>
                <span>$8.32</span>
              </li>
              <li className="py-4 flex justify-between items-center border-b-[0.3px] italic">
                <span className="font-semibold text-white">Order Total</span>
                <span className="font-semibold text-white">$112.32</span>
              </li>
            </ul>
            <div className="h-1/6 px-8">
              <Link
                className="p-5 btn-sm flex items-center justify-center bg-cyan-600 hover:bg-cyan-500 text-white w-full rounded-md font-bold"
                to={"/checkout/"}
              >
                Checkout
              </Link>
              <Link
                className="p-2 btn-sm flex items-center justify-center text-cyan-500 w-full rounded-md"
                to={"/"}
              >
                or continue shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <div className="sm:px-14 bg-white">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Helmet>
        <title>Go to shopping</title>
      </Helmet>
      <div className="w-full h-[90vh] flex justify-center items-center text-white">
        <div className="w-full flex justify-center items-center flex-col gap-10">
          <Lottie className="w-full h-48" animationData={EmptyCart} />
          <span className="font-space text-3xl text-gray-700">
            Your shopping cart is empty!
          </span>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShoppingCart;
