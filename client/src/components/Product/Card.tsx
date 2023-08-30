import { Link } from "react-router-dom";
import { Product } from "../../types/ProductType";
import Rating from "./Rating";

const Card = (props: { content: Product }) => {
  return (
    <div className="card w-72 border border-white py-4 shadow-inner">
      <figure>
        <img
          className="h-32"
          src={props.content.image}
          alt={props.content.name}
        />
      </figure>
      <div className="card-body bg-black">
        <h2 className="card-title">
          {props.content.name}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>{props.content.detail}</p>
        <Rating rating={props.content.rating} />
        <div className="card-actions justify-start">
          <Link
            to={"/product/" + props.content.slug}
            className="btn-sm flex items-center justify-center bg-yellow-500 text-black w-64 rounded-md font-bold"
          >
            Look More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
