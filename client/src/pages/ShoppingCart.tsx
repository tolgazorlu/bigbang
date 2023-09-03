import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { CartItem } from "../types/Cart";
import { Helmet } from "react-helmet-async";
import Footer from "../layouts/Footer";
import { AiFillDelete } from "react-icons/ai";

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
    <div className="sm:px-12">
      <Helmet>
        <title>Shopping...</title>
      </Helmet>
      <div className="w-full h-12"></div>
      <div className="w-full h-48 flex justify-start items-center">
        <div className="flex flex-col">
          <span className="font-bold text-gray-200 text-3xl font-space flex justify-center xl:justify-start">
            Shopping Cart
          </span>
          <br></br>
          <span className="px-12 md:px-0 font-bold text-gray-400 text-md font-space flex justify-center xl:justify-start">
            This is your shopping cart
          </span>
        </div>
      </div>
      <hr className="h-px bg-gray-500 border-0 w-full" />
      <ul className="grid grid-rows-2">
        {cartItems.map((item: CartItem) => (
          <li className="flex w-1/2 mt-10 border rounded-xl p-4" key={item._id}>
            <img
              src={item.image}
              alt={item.name}
              className="img-fluid img-thumbnail w-2/6"
            ></img>{" "}
            <div className="w-4/6 p-4 h-full flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">{item.name}</span>
                <button className="p-1">
                  <AiFillDelete className="text-red-400 w-5 h-5"/>
                </button>
                
              </div>
              <span className="text-gray-400">
                Price: {item.price} Cosmic Token
              </span>
              <span className="text-gray-400">Quantity: {item.quantity}</span>
              <Link
                className="btn-sm flex items-center justify-center bg-yellow-500 text-black w-full rounded-md font-bold"
                to={"/product/" + item.slug}
              >
                Go to product
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <Footer />
    </div>
  );
};

export default ShoppingCart;
