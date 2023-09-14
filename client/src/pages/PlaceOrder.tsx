import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../contexts/Store";
import { useCreateOrderMutation } from "../hooks/orderHooks";
import { getError } from "../utils/getError";
import { ApiError } from "../types/ApiError";
import { ToastContainer, toast } from "react-toastify";
import CheckoutSteps from "../components/CheckoutSteps";
import { Helmet } from "react-helmet-async";
import Footer from "../layouts/Footer";
import { CartItem } from "../types/Cart";

export default function PlaceOrderPage() {
  const navigate = useNavigate()

  const { state, dispatch } = useContext(Store)
  const { cart } = state

  const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100 // 123.2345 => 123.23

  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  )
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10)
  cart.taxPrice = round2(0.15 * cart.itemsPrice)
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice

  const { mutateAsync: createOrder, isLoading } = useCreateOrderMutation()

  const placeOrderHandler = async () => {
    try {
      const data = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
      dispatch({ type: 'CART_CLEAR' })
      localStorage.removeItem('cartItems')
      navigate(`/order/${data.order._id}`)
    } catch (err) {
      toast.error(getError(err as ApiError))
    }
  }

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate('/payment')
    }
  }, [cart, navigate])

  return (
    <div className="sm:px-14 bg-white">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <a
          href="#"
          className="font-space flex items-center mb-6 text-2xl font-semibold text-gray-700 mt-12"
        >
          Place Order
        </a>
        <CheckoutSteps step1 step2 step3 step4 />
      </div>
      <hr className="h-px bg-gray-500 w-7/12" />
      <div className="grid lg:grid-cols-12 gap-5">
        <div className="col-span-7">
          <div className="py-8 w-full border-b-[1px] border-gray-500">
            <span className="text-gray-700 text-xl font-bold">
              SHIPPING INFORMATION
            </span>
            <br />
            <br />
            <span className="text-gray-700 font-bold">
              {cart.shippingAddress.firstName} {cart.shippingAddress.lastName}
            </span>
            <br />
            <br />
            <span className="text-gray-700 font-bold">
              {cart.shippingAddress.address},{cart.shippingAddress.city},{" "}
              {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
            </span>
            <br />
            <br />
            <Link to="/shipping">Edit</Link>
          </div>
          <div className="py-8 w-full border-b-[1px] border-gray-500">
            <span className="text-gray-700 text-xl font-bold">
              PAYMENT INFORMATION
            </span>
            <br />
            <br />
            <span className="text-gray-700 font-bold">
              Payment Method: {cart.paymentMethod}
            </span>
            <br />
            <br />
            <Link to="/payment">Edit</Link>
          </div>
          <div className="py-8 w-full border-b-[1px] border-gray-500">
            <span className="text-gray-700 text-xl font-bold">ITEMS</span>
            <br />
            <ul>
              {cart.cartItems.map((item: CartItem) => (
                <li key={item._id} className="py-8 w-full border-gray-500">
                  <div className="h-full w-full flex">
                    <img
                      className="h-full w-[24vh] p-4 img-fluid img-thumbnail bg-gray-100 rounded-md"
                      src={item.image}
                      alt={item.name}
                    ></img>
                    <div className="h-full w-full px-2">
                      <div className="w-full px-2">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700 font-bold">
                            {item.name}
                          </span>
                          <span className="text-gray-700 font-bold">
                            ${item.price}
                          </span>
                        </div>
                      </div>
                      <div className="w-full p-2">
                        <span className="text-gray-500">
                          {item.detail.substring(0, 125)}...
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
              <Link to="/shop">Edit</Link>
            </ul>
          </div>
        </div>
        <div className="w-full h-[60vh] px-4 rounded col-span-5">
          <div className="w-full px-8 py-5 bg-gray-50 h-full rounded-md">
            <div className="h-1/6 font-poppins font-extrabold text-gray-700 text-lg flex items-center">
              Order Summary
            </div>
            <ul className="h-4/6 text-md ">
              <li className="py-4 flex text-gray-600 justify-between items-center border-b-[0.3px]">
                <span>Subtotal</span>
                <span>{cart.itemsPrice.toFixed(2)}</span>
              </li>
              <li className="py-4 flex text-gray-600 justify-between items-center border-b-[0.3px]">
                <span>Shipping Estimate</span>
                <span>${cart.shippingPrice.toFixed(2)}</span>
              </li>
              <li className="py-4 flex text-gray-600 justify-between items-center border-b-[0.3px]">
                <span>Tax Estimate</span>
                <span>{cart.taxPrice.toFixed(2)}</span>
              </li>
              <li className="py-4 flex text-gray-600 justify-between items-center ">
                <span className="font-semibold">
                  ${cart.totalPrice.toFixed(2)}
                </span>
              </li>
            </ul>
            <div className="h-1/6 px-8">
              <button
                type="button"
                onClick={placeOrderHandler}
                disabled={cart.cartItems.length === 0 || isLoading}
                className="p-5 btn-sm flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white w-full rounded-md font-bold"
              >
                Place Order
              </button>
              <Link
                className="p-2 btn-sm flex items-center justify-center text-blue-500 w-full rounded-md"
                to={"/shop"}
              >
                or continue shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
