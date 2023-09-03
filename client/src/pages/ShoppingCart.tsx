import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Store } from '../Store'
import { CartItem } from '../types/Cart'
import { Helmet } from 'react-helmet-async'
import Footer from '../layouts/Footer'

const ShoppingCart = () => {
    const navigate = useNavigate()
    const {
      state: {
        cart: { cartItems },
      },
      dispatch,
    } = useContext(Store)

    const updateCartHandler = (item: CartItem, quantity: number) => {
      dispatch({
        type: 'CART_ADD_ITEM',
        payload: { ...item, quantity },
      })
    }

    return(
        <div className="sm:px-12">
      <Helmet>
        <title>Bigbang Products</title>
      </Helmet>
      <div className="w-full h-12"></div>
      <div className="w-full h-64 flex justify-start items-center">
        <div className="flex flex-col">
          <span className="font-bold text-gray-200 text-3xl font-space flex justify-center xl:justify-start">
            Shopping Cart
          </span>
          <br></br>
          <span className="px-12 md:px-0 font-bold text-gray-400 xl:w-1/2 text-md font-space flex justify-center xl:justify-start">
            We not only help you design exceptional products, but also make it
            easy for you to share your designs with more like-minded people.
          </span>
        </div>
      </div>
      <hr className="h-px bg-gray-500 border-0 w-full" />  
      <Footer />
    </div>
    )
}

export default ShoppingCart