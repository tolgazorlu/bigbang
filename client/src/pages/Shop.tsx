import { useEffect, useState } from "react";
import Card from "../components/Product/Card";
import Footer from "../layouts/Footer";
import { Product } from "../types/ProductType";
import axios from "axios";

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<Product[]>(
          "http://localhost:8000/product",
        );
        const data: Product[] = response.data;
        console.log(data)
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    void fetchProduct();
  }, []);

  return (
    <div className="md:px-12">
      <div className="w-full h-12"></div>
      <div className="w-full h-64 flex justify-start items-center">
        <div className="flex flex-col">
          <span className="font-bold text-gray-200 text-3xl font-space">
            Space Collection
          </span>
          <br></br>
          <span className="font-bold text-gray-400 w-1/2 text-md font-space">
            We not only help you design exceptional products, but also make it
            easy for you to share your designs with more like-minded people.
          </span>
        </div>
      </div>
      <hr className="h-px bg-gray-500 border-0 w-full" />
      <div className="bg-black w-full grid grid-cols-4 gap-4 mt-12 mb-12">
        {products.map((item, index) => {
          return <Card key={index} content={item} />;
        })}
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
