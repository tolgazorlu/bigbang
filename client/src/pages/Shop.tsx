import Card from "../components/Product/Card";
import { useGetProductsQuery } from "../hooks/productHooks";
import { getError } from "../utils/getError";
import { ApiError } from "../types/ApiError";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { Product } from "../types/ProductType";
import Footer from "../layouts/Footer";

export default function Shop() {
  const { data: products, isLoading, error } = useGetProductsQuery();


  return (
    <div className="bg-white">
      <div>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="font-poppins flex flex-col gap-3 items-baseline justify-between border-b border-gray-200 py-16">
            <h1 className="text-4xl font-extrabold text-gray-900">
              New collection: The Solar System
            </h1>
            <p className="text-lg text-gray-500">
              We not only help you design exceptional products, but also make it
              easy for you <br />
              to share your designs with more like-minded people.
            </p>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Product grid */}
              <div className="lg:col-span-3">
                {isLoading ? (
                  <Loading />
                ) : error ? (
                  <ErrorMessage>{getError(error as ApiError)}</ErrorMessage>
                ) : (
                  <div className="w-full grid justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-12 mb-12">
                    {products!.map((item: Product, index: number) => {
                      return <Card key={index} content={item} />;
                    })}
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}
