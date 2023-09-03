export type CartItem = {
    quantity: number,
    _id: string,
    name: string,
    slug: string,
    price: number,
    image: string | undefined
}

export type ShippingAddress = {
    firstName: string,
    lastName: string,
    address: string,
    city: string,
    country: string,
    postalCode: string
}

export type Cart = {
    itemsPrice: number,
    shippingPrice: number,
    taxPrice: number,
    totalPrice: number,
    cartItems: CartItem[],
    shippingAddress: ShippingAddress,
    paymentMethod: string
}