import { Link } from "react-router-dom";
import { Product } from "../../types/ProductType";
import Rating from "./Rating";
import { useContext } from "react";
import { Store } from "../../Store";
import { CartItem } from "../../types/Cart";
import { toast } from "react-toastify";
import { convertProductToCartItem } from "../../utils/ProductToCart";

const Card = (props: { content: Product }) => {

  const { state, dispatch: ctxDispatch } = useContext(Store)
   const {
     cart: { cartItems },
   } = state

   const addToCartHandler = (item: CartItem) => {
    const existItem = cartItems.find((x) => x._id === props.content._id)
    const quantity = existItem ? existItem.quantity + 1 : 1
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity }
    })
    toast.success('Product added to the cart')
  }

  return (
    <div className="card w-72 border border-white py-4 shadow-inner hover:border-yellow-500">
      <Link
            to={"/product/" + props.content.slug}>
      <figure>
        <img
          className="h-32"
          src={props.content.image}
          alt={props.content.name}
        />
      </figure></Link>
      <div className="card-body bg-black">
        <h2 className="card-title">
          {props.content.name}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>{props.content.detail}</p>
        <Rating rating={props.content.rating} />
        <div className="card-actions justify-start">
          <button
            onClick={() => addToCartHandler(convertProductToCartItem(props.content))}
            className="btn-sm flex items-center justify-center bg-yellow-500 text-black w-64 rounded-md font-bold"
          >Add to Card</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
