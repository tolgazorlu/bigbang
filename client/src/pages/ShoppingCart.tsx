import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { CartItem } from "../types/Cart";
import { Helmet } from "react-helmet-async";
import Footer from "../layouts/Footer";
import {
  AiFillDelete,
  AiFillMinusCircle,
  AiFillPlusCircle,
} from "react-icons/ai";

const ShoppingCart = () => {
  const navigate = useNavigate();
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

  return (
    <div className="sm:px-14">
      <Helmet>
        <title>Shopping...</title>
      </Helmet>
      <div className="w-full h-12"></div>
      <div className="w-full h-32 flex justify-start items-center">
        <div className="flex flex-col">
          <span className="font-bold text-gray-200 text-3xl font-space flex justify-center xl:justify-start">
            Shopping Cart
          </span>
        </div>
      </div>
      <hr className="h-px bg-gray-500 w-1/2" />
      <div className="grid grid-cols-2">
        <ul>
          {cartItems.map((item: CartItem) => (
            <li className="h-48 w-full border-b-[1px] border-gray-500">
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
                      <button className="p-1">
                        <AiFillDelete className="text-red-400 w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="w-full h-1/3 p-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-200">Quantity</span>
                      <div className="flex items-center justify-center">
                        <button className="p-1">
                          <AiFillMinusCircle className="text-cyan-400 w-5 h-5" />
                        </button>
                        <span>{item.quantity}</span>
                        <button className="p-1">
                          <AiFillPlusCircle className="text-cyan-400 w-5 h-5" />
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
          <div className="w-full bg-slate-800 h-full rounded-md">
            <div className="h-1/6 py-6 p-4 px-8 font-inter font-bold text-white text-xl flex items-center">
              Order Summary
            </div>
            <ul className="h-4/6 px-8 text-lg ">
              <li className="py-4 flex justify-between items-center border-b-[0.3px]">
                <span>Subtotal</span>
                <span>$99.00</span>
              </li>
              <li className="py-4 flex justify-between items-center border-b-[0.3px]">
                <span>Shipping Estimate</span>
                <span>$5.00</span>
              </li>
              <li className="py-4 flex justify-between items-center border-b-[0.3px]">
                <span>Tax Estimate</span>
                <span>$8.32</span>
              </li>
              <li className="py-4 flex justify-between items-center border-b-[0.3px]">
                <span className="font-bold text-white">Order Total</span>
                <span className="font-bold text-white">$112.32</span>
              </li>
            </ul>
            <div className="h-1/6 px-8">
              <Link
                className="btn-sm flex items-center justify-center bg-purple-600 hover:bg-purple-500 text-white w-full rounded-md font-bold"
                to={"/product/"}
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ShoppingCart;
