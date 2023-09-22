import{ useState } from "react";
import { Helmet } from "react-helmet-async";
import Sidebar from "../../components/Sidebar";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { getError } from "../../utils/getError";
import { ApiError } from "../../types/ApiError";
import { ToastContainer, toast } from "react-toastify";
import { useDeliverOrderMutation, useGetOrdersQuery } from "../../hooks/orderHooks";

const DashboardNewOrders = () => {
  const { data: orders, isLoading, error, refetch } = useGetOrdersQuery();
  const {mutateAsync: updateDeliver, isLoading: loadingDeliver} = useDeliverOrderMutation();
  

  const updateDeliverHandler = async (id: string) => {
    try {
        await updateDeliver(id)
        refetch
        toast.success('Order is delivered!')
    } catch (error) {
        toast.error(getError(error as ApiError))
    }
  }

  return (
    <>
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
        <title>Dashboard</title>
      </Helmet>
      <div className="bg-white grid grid-cols-12">
        <Sidebar />

        <div className="p-4 col-span-9">
          <ul>
            {loadingDeliver && <Loading/>}
            {isLoading ? (
              <Loading />
            ) : error ? (
              <ErrorMessage>{getError(error as ApiError)}</ErrorMessage>
            ) : (
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white">
                    Users
                    <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                      Browse a list of Flowbite products designed to help you
                      work and play, stay organized, get answers, keep in touch,
                      grow your business, and more.
                    </p>
                  </caption>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        User
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Items
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Payment
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Delivery
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Address
                      </th>
                      <th scope="col" className="px-6 py-3">
                        City
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Country
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders!.map((order) => {
                      return (
                        <tr key={order._id} className="bg-white border-b ">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                          >
                            {order.shippingAddress.firstName}{" "}
                            {order.shippingAddress.lastName}
                          </th>
                          <td className="px-6 py-4">
                            {order.orderItems.map((item) => {
                              return (
                                <div>
                                  <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                                    {item.name}
                                  </span>{" "}
                                  <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                                    x{item.quantity}
                                  </span>
                                </div>
                              );
                            })}
                          </td>
                          <td className="px-6 py-4">
                            {order.isPaid ? (
                              <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                Paid
                              </span>
                            ) : (
                              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                                Pending
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {order.isDelivered ? (
                              <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                Delivered
                              </span>
                            ) : (
                              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                                Pending
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {order.shippingAddress.address}
                          </td>
                          <td className="px-6 py-4">
                            {order.shippingAddress.city}
                          </td>
                          <td className="px-6 py-4">
                            {order.shippingAddress.country}
                          </td>
                          <td className="px-6 py-4">${order.totalPrice}</td>
                          <td>
                            {!order.isDelivered ? (
                              <button
                                className="btn btn-sm bg-green-500 text-white hover:bg-green-700 hover:text-white hover:font-bold"
                                onClick={() => { updateDeliverHandler(order._id)}}
                              >
                                Deliver
                              </button>
                            ) : (
                              <button
                                className="btn btn-sm bg-red-500 text-white hover:bg-red-700 hover:text-white hover:font-bold"
                                onClick={() => { updateDeliverHandler(order._id)}}
                              >
                                Cancel
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashboardNewOrders;
