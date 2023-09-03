import { CartItem } from "../types/Cart"
import { Product } from "../types/ProductType"

export const convertProductToCartItem = (product: Product): CartItem => {
    const cartItem: CartItem = {
      _id: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
    }
    return cartItem
  }