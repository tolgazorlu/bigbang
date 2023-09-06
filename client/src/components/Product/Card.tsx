import { Link } from "react-router-dom";
import { Product } from "../../types/ProductType";
import Rating from "./Rating";
import { useContext } from "react";
import { Store } from "../../Store";
import { CartItem } from "../../types/Cart";
import { toast } from "react-toastify";
import { convertProductToCartItem } from "../../utils/ProductToCart";

const Card = (props: { content: Product }) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = (item: CartItem) => {
    const existItem = cartItems.find((x) => x._id === props.content._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
    toast.success("Product added to the cart");
  };

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
      <Link to={'/product/' + props.content.slug}>
        <img
          className="p-8 rounded-t-lg"
          src={props.content.image}
          alt="product image"
        />
      </Link>
      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900">
            {props.content.name}
          </h5>
          <h5 className="text-xl font-semibold tracking-tight text-gray-500">
            {props.content.detail}
          </h5>
        </a>
        <Rating rating={props.content.rating}/>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900">${props.content.price}</span>
          <button
            onClick={() => addToCartHandler(convertProductToCartItem(props.content))}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
