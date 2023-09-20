import { useState } from "react";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { getError } from "../../utils/getError";
import { ApiError } from "../../types/ApiError";
import { Helmet } from "react-helmet-async";
import { ToastContainer, toast } from "react-toastify";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "../../hooks/productHooks";
import Sidebar from "../../components/Sidebar";

export type NewProduct = {
  name: string;
  slug: string;
  category: string;
  detail: string;
  image: string;
  rating: number;
  price: number;
  age: number;
};

const DashboardProducts = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();
  const { mutateAsync: createProduct, isLoading: loadingProduct } =
    useCreateProductMutation();
  const { mutateAsync: deleteProduct, isLoading: loadingDeleteProduct } =
    useDeleteProductMutation();
  const { mutateAsync: updateProduct, isLoading: loadingUpdateProduct } =
    useUpdateProductMutation();

  const [name, setName] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [age, setAge] = useState<number>(0);

  const [deleteProductId, setDeleteProductId] = useState<string>("");
  const [editProductId, setEditProductId] = useState<string>("");

  const createProductHandler = async () => {
    try {
      await createProduct({
        name: name,
        slug: slug,
        category: category,
        detail: detail,
        image: image,
        rating: rating,
        price: price,
        age: age,
      });
      refetch();
    } catch (err) {
      console.log(getError(err as ApiError));
    }
  };

  const deleteProductHandler = async (id: string) => {
    try {
      await deleteProduct(id);
      refetch;
      toast.success("Product deleted!");
    } catch (error) {
      toast.error(getError(error as ApiError));
    }
  };

  const editProductHandler = async (id: string) => {
    try {
      await updateProduct({
        id: editProductId,
        name: name,
        slug: slug,
        category: category,
        detail: detail,
        image: image,
        rating: rating,
        price: price,
        age: age,
      });
      refetch;
      toast.success("Product updated!");
    } catch (error) {
      toast.error(getError(error as ApiError));
    }
  };

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
            {loadingProduct && <Loading></Loading>}
            {loadingDeleteProduct && <Loading></Loading>}
            {loadingUpdateProduct && <Loading></Loading>}
            {isLoading ? (
              <Loading />
            ) : error ? (
              <ErrorMessage>{getError(error as ApiError)}</ErrorMessage>
            ) : (
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg font-poppins">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white">
                    Products
                    <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                      Browse a list of Flowbite products designed to help you
                      work and play, stay organized, get answers, keep in touch,
                      grow your business, and more.
                    </p>
                    {/* ADD PRODUCT */}
                    <button
                      className="btn btn-sm float-right bg-blue-500 text-white hover:bg-blue-200 hover:text-black hover:font-bold"
                      onClick={() => {
                        document
                          .getElementById("add-product-modal")
                          .showModal();
                      }}
                    >
                      add product
                    </button>
                    <dialog id="add-product-modal" className="modal">
                      {/* <!-- Modal content --> */}
                      <div className="modal-box">
                        {/* <!-- Modal header --> */}
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Add Product
                          </h3>
                          <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                            onClick={() => {
                              document
                                .getElementById("add-product-modal")
                                .close();
                            }}
                          >
                            <svg
                              aria-hidden="true"
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                            <span className="sr-only">Close modal</span>
                          </button>
                        </div>

                        {/* FORM */}

                        <form action="#">
                          <div className="grid gap-4 mb-4 sm:grid-cols-2">
                            <div>
                              <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Name
                              </label>
                              <input
                                type="text"
                                name="name"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type product name"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="slug"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Slug
                              </label>
                              <input
                                type="text"
                                name="slug"
                                id="slug"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Product slug"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="price"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Price
                              </label>
                              <input
                                type="number"
                                name="price"
                                id="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="$2999"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="category"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Category
                              </label>
                              <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              >
                                <option>Select category</option>
                                <option value="planet">Planet</option>
                                <option value="star">Star</option>
                              </select>
                            </div>
                            <div>
                              <label
                                htmlFor="rating"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Rating
                              </label>
                              <input
                                type="number"
                                name="rating"
                                id="rating"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="4.4"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="age"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Age
                              </label>
                              <input
                                type="number"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="1239"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Image
                              </label>
                              <input
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Write product description here"
                              ></input>
                            </div>
                            <div className="sm:col-span-2">
                              <label
                                htmlFor="description"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Detail
                              </label>
                              <textarea
                                id="description"
                                rows={4}
                                value={detail}
                                onChange={(e) => setDetail(e.target.value)}
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Write product description here"
                              ></textarea>
                            </div>
                          </div>
                          <button
                            className="float-right btn btn-sm bg-green-500 text-white hover:bg-green-200 hover:text-black hover:font-bold"
                            onClick={() => createProductHandler()}
                          >
                            + Add Product
                          </button>
                        </form>
                      </div>
                    </dialog>
                  </caption>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Image
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Rating
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
                    {products!.map((product) => {
                      return (
                        <tr className="bg-white border-b" key={product._id}>
                          <th className="flex justify-center items-center">
                            <img
                              src={product.image}
                              className="h-12 w-12 mt-8"
                            />
                          </th>
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                          >
                            {product.name}
                          </th>
                          <td className="px-6 py-4">{product.category}</td>
                          <td className="px-6 py-4">{product.rating}</td>
                          <td className="px-6 py-4">{product.price}</td>
                          <td className="px-6 py-4 flex gap-2">
                            {/* EDIT */}

                            <button
                              className="btn btn-sm bg-blue-500 text-white hover:bg-blue-200 hover:text-black hover:font-bold"
                              onClick={() => {
                                document
                                  .getElementById("edit-product-modal")
                                  .showModal();
                                setEditProductId(product._id);
                              }}
                            >
                              Edit
                            </button>

                            <dialog id="edit-product-modal" className="modal">
                              {/* <!-- Modal content --> */}
                              <div className="modal-box">
                                {/* <!-- Modal header --> */}
                                <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Edit Product
                                  </h3>
                                  <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                    onClick={() => {
                                      document
                                        .getElementById("edit-product-modal")
                                        .close();
                                    }}
                                  >
                                    <svg
                                      aria-hidden="true"
                                      className="w-5 h-5"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                      ></path>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                  </button>
                                </div>

                                {/* FORM */}

                                <form action="#">
                                  <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                    <div>
                                      <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        Name
                                      </label>
                                      <input
                                        type="text"
                                        value={name}
                                        onChange={(e) =>
                                          setName(e.target.value)
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type product name"
                                      />
                                    </div>
                                    <div>
                                      <label
                                        htmlFor="slug"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        Slug
                                      </label>
                                      <input
                                        type="text"
                                        name="slug"
                                        id="slug"
                                        value={product.slug}
                                        onChange={(e) =>
                                          setSlug(e.target.value)
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Product slug"
                                      />
                                    </div>
                                    <div>
                                      <label
                                        htmlFor="price"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        Price
                                      </label>
                                      <input
                                        type="number"
                                        name="price"
                                        id="price"
                                        value={product.price}
                                        onChange={(e) =>
                                          setPrice(e.target.value)
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="$2999"
                                      />
                                    </div>
                                    <div>
                                      <label
                                        htmlFor="category"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        Category
                                      </label>
                                      <select
                                        id="category"
                                        value={product.category}
                                        onChange={(e) =>
                                          setCategory(e.target.value)
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                      >
                                        <option>Select category</option>
                                        <option value="planet">Planet</option>
                                        <option value="star">Star</option>
                                      </select>
                                    </div>
                                    <div>
                                      <label
                                        htmlFor="rating"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        Rating
                                      </label>
                                      <input
                                        type="number"
                                        name="rating"
                                        id="rating"
                                        value={product.rating}
                                        onChange={(e) =>
                                          setRating(e.target.value)
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="4.4"
                                      />
                                    </div>
                                    <div>
                                      <label
                                        htmlFor="age"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        Age
                                      </label>
                                      <input
                                        type="number"
                                        value={product.age}
                                        onChange={(e) => setAge(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="1239"
                                      />
                                    </div>
                                    <div className="sm:col-span-2">
                                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Image
                                      </label>
                                      <input
                                        value={product.image}
                                        onChange={(e) =>
                                          setImage(e.target.value)
                                        }
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Write product description here"
                                      ></input>
                                    </div>
                                    <div className="sm:col-span-2">
                                      <label
                                        htmlFor="description"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      >
                                        Detail
                                      </label>
                                      <textarea
                                        id="description"
                                        rows={4}
                                        value={product.detail}
                                        onChange={(e) =>
                                          setDetail(e.target.value)
                                        }
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Write product description here"
                                      ></textarea>
                                    </div>
                                  </div>
                                  <button
                                    className="float-right btn btn-sm bg-green-500 text-white hover:bg-green-200 hover:text-black hover:font-bold"
                                    onClick={() => {editProductHandler(); document
                                      .getElementById("edit-product-modal")
                                      .close();}}
                                  >
                                    Edit Product
                                  </button>
                                </form>
                              </div>
                            </dialog>

                            {/* DELETE */}
                            <button
                              className="btn btn-sm bg-red-500 text-white hover:bg-red-200 hover:text-black hover:font-bold"
                              onClick={() => {
                                document
                                  .getElementById("my_modal_1")
                                  .showModal();
                                setDeleteProductId(product._id);
                              }}
                            >
                              Delete
                            </button>
                            <dialog
                              id="my_modal_1"
                              className="modal modal-bottom sm:modal-middle"
                            >
                              <div className="modal-box">
                                <h3 className="font-bold text-lg">
                                  Attention!
                                </h3>
                                <p className="py-4">
                                  Do you want to delete this product? You can
                                  not take it back the process!
                                </p>
                                <div className="modal-action">
                                  <form className="flex">
                                    <button
                                      className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                                      onClick={() =>
                                        deleteProductHandler(deleteProductId)
                                      }
                                    >
                                      Delete
                                    </button>
                                    <button className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                      Close
                                    </button>
                                  </form>
                                </div>
                              </div>
                            </dialog>
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

export default DashboardProducts;
