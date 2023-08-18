import React from 'react'

const Card = () => {
  return (
    <div className="card w-72 border border-yellow-500 py-4 shadow-xl">
  <figure><img src="https://i.stack.imgur.com/O44Ry.jpg" alt="Shoes" /></figure>
  <div className="card-body bg-black">
    <h2 className="card-title">
      Shoes!
      <div className="badge badge-secondary">NEW</div>
    </h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div className="card-actions justify-start">
      <button className="btn-sm bg-yellow-500 text-black">Look More</button>
    </div>
  </div>
</div>
  )
}

export default Card