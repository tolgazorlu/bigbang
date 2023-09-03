import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Product } from "../types/ProductType";
import Footer from "../layouts/Footer";
import Rating from "../components/Product/Rating";
import { useGetProductDetailsBySlugQuery } from "../hooks/productHooks";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { getError } from "../utils/getError";
import { ApiError } from "../types/ApiError";
import { Store } from "../Store";
import { convertProductToCartItem } from "../utils/ProductToCart";
import { toast } from "react-toastify";

const SingleProduct = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsBySlugQuery(slug!);
  const { state, dispatch } = useContext(Store)
  const { cart } = state

  const addToCartHandler = () => {
    const existItem = cart.cartItems.find((x) => x._id === product!._id)
    const quantity = existItem ? existItem.quantity + 1 : 1
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...convertProductToCartItem(product!), quantity },
    })
    toast.success('Product added to the cart')
    navigate('/')
  }
  
  return isLoading ? (
    <Loading />
  ) : error ? (
    <ErrorMessage>{getError(error as ApiError)}</ErrorMessage>
  ) : !product ? (
    <ErrorMessage>Product Not Found!</ErrorMessage>
  ) : (
    <div className="px-12">
      <div className="w-full h-24"></div>
      <div className="md:px-32 justify-start items-center grid grid-cols-1 sm:grid-cols-2 gap-4">
        <img className="w-full" src={product.image} />
        <div className="flex flex-col">
          <span className="font-bold text-gray-200 text-3xl font-space">
            {product.name}
          </span>
          <br></br>
          <span className="font-bold text-gray-400 w-full text-md font-space">
            {product.detail}
          </span>
          <br></br>
          <span className="text-gray-600 w-full text-md font-space">
            Category : {product.category}
          </span>
          <br></br>
          <span className="text-gray-600 w-full text-md font-space">
            Age : {product.age}
          </span>
          <br></br>
          <span className="text-gray-600 w-full text-md font-space">
            Rating : {product.rating}
          </span>
          <br></br>
          <Rating rating={product.rating} />
          <br></br>
          <span className="text-gray-600 w-full text-md font-space">
            Price : {product.price} Cosmic Token
          </span>
          <br></br>
          <button onClick={addToCartHandler} className="btn-sm flex items-center justify-center bg-yellow-500 text-black w-64 rounded-md font-bold">
            Add to Cart
          </button>
        </div>
      </div>
      <hr className="mt-10 h-px bg-gray-500 border-0 w-full" />
      <div className="bg-black w-full grid grid-cols-4 gap-4 mt-12 mb-12"></div>
      <Footer />
    </div>
  );
};

export default SingleProduct;
