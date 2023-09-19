import { Helmet } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import { useGetOrderSummaryQuery } from "../hooks/orderHooks";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { getError } from "../utils/getError";
import { ApiError } from "../types/ApiError";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const { data: summary, isLoading, error } = useGetOrderSummaryQuery();

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
            {isLoading ? (
              <Loading />
            ) : error ? (
              <ErrorMessage>{getError(error as ApiError)}</ErrorMessage>
            ) : (
              <div className="w-full text-sm text-left text-gray-500 ">
                <div className="w-full p-5 text-lg font-semibold text-left text-gray-900">
                  Dashboard
                  <p className="text-sm font-normal text-gray-500 ">
                    Browse a list of Flowbite products designed to help you work
                    and play, stay organized, get answers, keep in touch, grow
                    your business, and more.
                  </p>
                </div>
                <div className="p-5">
                  <span className="text-5xl font-bold font-poppins">
                    Total Sales: $
                    {summary!.orders
                      ? summary!.orders[0].totalSales.toFixed(2)
                      : 0}
                  </span>
                </div>
              </div>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
