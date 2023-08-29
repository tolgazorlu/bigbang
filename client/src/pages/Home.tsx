import React, { useEffect, useReducer } from "react";
import { Product } from "../types/ProductType";
import axios from "axios";
import { getError } from "../utils/getError";
import { ApiError } from "../types/ApiError";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import Card from "../components/Product/Card";
import Footer from "../layouts/Footer";

type State = {
  products: Product[];
  loading: boolean;
  error: string;
};

type Action =
  | { type: "FETCH_REQUEST" }
  | { type: "FETCH_SUCCESS"; payload: Product[] }
  | { type: "FETCH_FAIL"; payload: string };

const initialState: State = {
  products: [],
  loading: true,
  error: "",
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const Home = () => {
  const [{ loading, error, products }, dispatch] = useReducer<
    React.Reducer<State, Action>
  >(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get<Product[]>("http://localhost:8000/product");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err as ApiError) });
      }
    };
    void fetchData();
  }, []);

  return loading ? (
    <Loading />
  ) : error ? (
    <ErrorMessage>{error}</ErrorMessage>
  ) : (
    <div className="sm:px-12">
      <div className="w-full h-12"></div>
      <div className="w-full h-64 flex justify-start items-center">
        <div className="flex flex-col">
          <span className="font-bold text-gray-200 text-3xl font-space flex justify-center xl:justify-start">
            Space Collection
          </span>
          <br></br>
          <span className="px-12 md:px-0 font-bold text-gray-400 xl:w-1/2 text-md font-space flex justify-center xl:justify-start">
            We not only help you design exceptional products, but also make it
            easy for you to share your designs with more like-minded people.
          </span>
        </div>
      </div>
      <hr className="h-px bg-gray-500 border-0 w-full" />
      <div className="bg-black w-full grid justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-12 mb-12">
        {products.map((item, index) => {
          return <Card key={index} content={item} />;
        })}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
