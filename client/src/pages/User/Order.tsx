import { useContext } from "react";
import { Store } from "../../contexts/Store";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { getError } from "../../utils/getError";
import { ApiError } from "../../types/ApiError";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
} from "../../hooks/orderHooks";
import { Helmet } from "react-helmet-async";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../../layouts/Footer";

export default function Order() {
  const { state } = useContext(Store);
  const { cart } = state;

  const params = useParams();
  const { id: orderId } = params;

  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useGetOrderDetailsQuery(orderId!);

  const testPayHandler = () => {
    payOrder({ orderId: orderId! });
    refetch();
    toast.success("Order is paid");
  };

  const { mutateAsync: payOrder} =
    usePayOrderMutation();

  return isLoading ? (
    <Loading />
  ) : error ? (
    <ErrorMessage>{getError(error as ApiError)}</ErrorMessage>
  ) : !order ? (
    <ErrorMessage>Order Not Found</ErrorMessage>
  ) : (
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
        <title>Order</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <a
          href="#"
          className="font-space flex items-center mb-6 text-2xl font-semibold text-gray-700 mt-12"
        >
          Order
        </a>
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
            <span className="p-5 btn-sm flex items-center justify-center bg-yellow-200 text-black w-full rounded-md font-bold">
              NOT DELIVERED
            </span>
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
            {order.isPaid ? (
              <span className="p-5 btn-sm flex items-center justify-center bg-green-200 text-black w-full rounded-md font-bold">
                PAID
              </span>
            ) : (
              <span className="p-5 btn-sm flex items-center justify-center bg-yellow-200 text-black w-full rounded-md font-bold">
                NOT PAID
              </span>
            )}
          </div>
          <div className="py-8 w-full border-b-[1px] border-gray-500">
            <span className="text-gray-700 text-xl font-bold">ITEMS</span>
            <br />
            <ul>
              {order.orderItems.map((item) => (
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
              {order.isPaid ? (
                <></>
              ) : (
                <button
                  type="button"
                  onClick={testPayHandler}
                  className="p-5 btn-sm flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white w-full rounded-md font-bold"
                >
                  Test Pay
                </button>
              )}

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
