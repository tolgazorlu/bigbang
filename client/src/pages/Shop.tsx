import Card from "../components/Product/Card";
import { useGetProductsQuery } from "../hooks/productHooks";
import { getError } from "../utils/getError";
import { ApiError } from "../types/ApiError";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { Helmet } from "react-helmet-async";
import Footer from "../layouts/Footer";
import { Product } from "../types/ProductType";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import { Store } from "../Store";

const Home = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  
  return isLoading ? (
    <Loading />
  ) : error ? (
    <ErrorMessage>{getError(error as ApiError)}</ErrorMessage>
  ) : (
    <div className="sm:px-12 bg-white">
      <ToastContainer
        position="top-right"
        autoClose={3000}
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
        <title>Bigbang Products</title>
      </Helmet>
      <div className="w-full h-64 flex justify-start items-center">
        <div className="flex flex-col">
          <span className="font-extrabold text-gray-800 text-3xl font-poppins flex justify-center xl:justify-start">
           {userInfo ? <span> Milky Way collection for {userInfo.firstName}</span> : <span> Milky Way collection</span>}
          </span>
          <br></br>
          <span className="px-12 md:px-0 font-bold text-gray-500 xl:w-1/2 text-md font-poppins flex justify-center xl:justify-start">
            We not only help you design exceptional products, but also make it
            easy for you to share your designs with more like-minded people.
          </span>
        </div>
      </div>
      <hr className="h-px bg-gray-500 border-0 w-full" />
      <div className="w-full grid justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-12 mb-12">
        {products!.map((item: Product, index: number) => {
          return <Card key={index} content={item} />;
        })}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
