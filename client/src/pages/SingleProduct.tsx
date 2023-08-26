import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Product } from "../types/ProductType";
import Footer from "../layouts/Footer";

const SingleProduct = () => {
  const [product, setProduct] = useState<Product>();
  const { slug } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<Product[]>(
          `http://localhost:8000/product/${slug}`,
          {
            responseType: "json",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        const data: Product[] = response.data;
        setProduct(data[0]);
        console.log(product);
      } catch (error) {
        console.log(error);
      }
    };

    void fetchProduct();
  }, [product, slug]);

  if (product) {
    return (
      <div className="px-12">
        <div className="w-full h-24"></div>
        <div className="md:px-32 justify-start items-center grid grid-cols-1 sm:grid-cols-2 gap-4">
          <img className="w-full" src={product.image} />
          <div className="flex flex-col">
            <span className="font-bold text-gray-200 text-3xl font-space">
              {product.name}
            </span>
            <br></br>
            <span className="font-bold text-gray-400 w-full text-md font-space">
              {product.detail}
            </span>
            <br></br>
            <span className="text-gray-600 w-full text-md font-space">
              Category : {product.category}
            </span>
            <br></br>
            <span className="text-gray-600 w-full text-md font-space">
              Age : {product.age}
            </span>
            <br></br>
            <span className="text-gray-600 w-full text-md font-space">
              Rating : {product.rating}
            </span>
            <br></br>
            <span className="text-gray-600 w-full text-md font-space">
              Price : {product.price} Cosmic Token
            </span>
            <br></br>
            <Link to="" className="btn-sm flex items-center justify-center bg-yellow-500 text-black w-64 rounded-md font-bold">
              Buy
            </Link>
          </div>
        </div>
        <hr className="mt-10 h-px bg-gray-500 border-0 w-full" />
        <div className="bg-black w-full grid grid-cols-4 gap-4 mt-12 mb-12"></div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex justify-center items-center text-white">
      Loading...
    </div>
  );
};

export default SingleProduct;
