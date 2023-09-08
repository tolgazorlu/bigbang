import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../layouts/Footer";
import Rating from "../components/Product/Rating";
import { useGetProductDetailsBySlugQuery } from "../hooks/productHooks";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { getError } from "../utils/getError";
import { ApiError } from "../types/ApiError";
import { Store } from "../contexts/Store";
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
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = () => {
    const existItem = cart.cartItems.find((x) => x._id === product!._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...convertProductToCartItem(product!), quantity },
    });
    toast.success("Product added to the cart");
    navigate("/shop");
  };

  return isLoading ? (
    <Loading />
  ) : error ? (
    <ErrorMessage>{getError(error as ApiError)}</ErrorMessage>
  ) : !product ? (
    <ErrorMessage>Product Not Found!</ErrorMessage>
  ) : (
    <div className="px-4 bg-white">
      <div className="md:px-12 py-4 justify-start grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-black px-32 py-12 w-full rounded-md">
        <img className="w-full" src={product.image} />
        </div>
        <div className="flex flex-col">
          <Rating rating={product.rating} />
          <span className="font-bold text-gray-700 text-3xl font-space">
            {product.name}
          </span>
          <span className="font-poppins font-bold text-gray-500">
            {product.category}
          </span>
          <br></br>
          <span className="font-bold text-gray-500 w-full text-md font-poppins">
            {product.detail}
          </span>
          <br></br>
          <button
            onClick={addToCartHandler}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            ${product.price}
          </button>
        </div>
      </div>
      <hr className="mt-10 h-px bg-gray-300 border-0 w-full" />
      <Footer />
    </div>
  );
};

export default SingleProduct;
