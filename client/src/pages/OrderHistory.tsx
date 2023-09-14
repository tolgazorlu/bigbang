import { Helmet } from "react-helmet-async";
import Footer from "../layouts/Footer";
import { useGetOrderHistoryQuery } from "../hooks/orderHooks";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { getError } from "../utils/getError";
import { ApiError } from "../types/ApiError";

const OrderHistory = () => {
  const navigate = useNavigate();
  const { data: orders, isLoading, error } = useGetOrderHistoryQuery();
  return (
    <div className="sm:px-14 bg-white">
      <Helmet>
        <title>Order History</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <a
          href="#"
          className="font-space flex items-center mb-6 text-2xl font-semibold text-gray-700 mt-12"
        >
          Order History
        </a>
      </div>
      <hr className="h-px bg-gray-500 w-full" />
      <br />
      {isLoading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage>{getError(error as ApiError)}</ErrorMessage>
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <br></br>
          <tbody className="text-center">
            {orders!.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : "No"}
                </td>
                <td>
                  <button
                    type="button"
                    className="p-5 btn-sm flex items-center justify-center bg-blue-700 text-white w-full rounded-md font-bold"
                    onClick={() => {
                      navigate(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Footer />
    </div>
  );
};

export default OrderHistory;
