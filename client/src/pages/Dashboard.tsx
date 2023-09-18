import { Helmet } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import { useGetOrderSummaryQuery } from "../hooks/orderHooks";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { getError } from "../utils/getError";
import { ApiError } from "../types/ApiError";

const Dashboard = () => {
  const { data: summary, isLoading, error } = useGetOrderSummaryQuery();

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
        <title>Dashboard</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <a
          href="#"
          className="font-space flex items-center mb-6 text-2xl font-semibold text-gray-700 mt-12"
        >
          Dashboard
        </a>
      </div>
      <hr className="h-px bg-gray-500 w-7/12" />
      <div className="grid lg:grid-cols-12 gap-5">
        <div className="col-span-7">
          <div className="py-8 w-full border-b-[1px] border-gray-500">
            <ul>
              {isLoading ? (
                <Loading />
              ) : error ? (
                <ErrorMessage>{getError(error as ApiError)}</ErrorMessage>
              ) : (
                <div>
                    <span>Total Sales: ${summary!.orders
                      ? summary!.orders[0].totalSales.toFixed(2)
                      : 0}</span>
                  
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
