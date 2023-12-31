import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../../contexts/Store";
import { CartItem } from "../../types/Cart";
import { Helmet } from "react-helmet-async";
import Footer from "../../layouts/Footer";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import EmptyCart from "../../assets/animation/cart.json";
import Lottie from "lottie-react";

const ShoppingCart = () => {

  const navigate = useNavigate()

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

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping')
  }

  const subTotal = cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  const tax =  subTotal * 18 / 100
  const shippingPrice = 5;
  const orderTotal = subTotal + tax + shippingPrice

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
      <hr className="h-px bg-gray-500 w-7/12" />
      <div className="grid lg:grid-cols-12 gap-5">
        <ul className="col-span-7">
          {cartItems.map((item: CartItem) => (
            <li
              key={item._id}
              className="py-8 w-full border-b-[1px] border-gray-500"
            >
              <div className="h-full w-full flex">
                <img
                  className="h-full w-[24vh] p-4 img-fluid img-thumbnail bg-gray-100 rounded-md"
                  src={item.image}
                  alt={item.name}
                ></img>
                <div className="h-full w-full px-2">
                  <div className="w-full px-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 font-bold">
                        {item.name}
                      </span>
                      <span className="text-gray-700 font-bold">
                        ${item.price}
                      </span>
                    </div>
                  </div>
                  <div className="w-full p-2">
                    <span className="text-gray-500">
                      {item.detail.substring(0, 125)}...
                    </span>
                  </div>
                  <div className="w-full p-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            updateCartHandler(item, item.quantity - 1);
                            toast.info("Quantity decreased");
                          }}
                          disabled={item.quantity === 1}
                        >
                          <AiFillMinusCircle className="text-gray-400 hover:text-gray-700 w-5 h-5" />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => {
                            updateCartHandler(item, item.quantity + 1);
                            toast.info("Quantity increased");
                          }}
                          disabled={item.quantity === 8}
                        >
                          <AiFillPlusCircle className="text-gray-400 hover:text-gray-700 w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="w-full p-2 flex justify-end my-auto items-end">
                    <button
                      className="p-1"
                      onClick={() => {
                        removeItemHandler(item);
                        toast.info("Product removed from cart");
                      }}
                    >
                      <span className="text-red-500">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="w-full h-[60vh] px-4 rounded col-span-5">
          <div className="w-full px-8 py-5 bg-gray-50 h-full rounded-md">
            <div className="h-1/6 font-poppins font-extrabold text-gray-700 text-lg flex items-center">
              Order Summary
            </div>
            <ul className="h-4/6 text-md ">
              <li className="py-4 flex text-gray-600 justify-between items-center border-b-[0.3px]">
                <span>Subtotal</span>
                <span>${subTotal}</span>
              </li>
              <li className="py-4 flex text-gray-600 justify-between items-center border-b-[0.3px]">
                <span>Shipping Estimate</span>
                <span>${shippingPrice}</span>
              </li>
              <li className="py-4 flex text-gray-600 justify-between items-center border-b-[0.3px]">
                <span>Tax Estimate</span>
                <span>${tax}</span>
              </li>
              <li className="py-4 flex text-gray-600 justify-between items-center ">
                <span className="font-semibold">Order Total</span>
                <span className="font-semibold">
                  ${orderTotal.toFixed(2)}
                </span>
              </li>
            </ul>
            <div className="h-1/6 px-8">
              <button
                className="p-5 btn-sm flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white w-full rounded-md font-bold"
                onClick={checkoutHandler}
              >
                Checkout
              </button>
              <Link
                className="p-2 btn-sm flex items-center justify-center text-blue-500 w-full rounded-md"
                to={"/shop"}
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
          <Link className="font-space text-2xl text-blue-500" to="/shop">
            Go to shopping
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShoppingCart;
