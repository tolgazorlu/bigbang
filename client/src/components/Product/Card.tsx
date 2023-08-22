import { Product } from '../../types/ProductType'

const Card = (props: {content: Product}) => {
  return (
    <div className="card w-72 border border-white py-4 shadow-inner">
  <figure><img src="https://i.stack.imgur.com/O44Ry.jpg" alt="Shoes" /></figure>
  <div className="card-body bg-black">
    <h2 className="card-title">
      {props.content.name}
      <div className="badge badge-secondary">NEW</div>
    </h2>
    <p>{props.content.detail}</p>
    <div className="card-actions justify-start">
      <button className="btn-sm bg-yellow-500 text-black">Look More</button>
    </div>
  </div>
</div>
  )
}

export default Card