import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { getError } from "../utils/getError";
import { ApiError } from "../types/ApiError";
import { Helmet } from "react-helmet-async";
import { ToastContainer, toast } from "react-toastify";
import { useDeleteUserMutation, useGetUsersQuery } from "../hooks/userHooks";
import Sidebar from "../components/Sidebar";

const DashboardUsers = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();
  const {mutateAsync: deleteUser, isLoading: loadingDelete} = useDeleteUserMutation()

  const userDeleteHandler = async (id: string) => {
    try {
      await deleteUser(id)
      refetch()
      toast.success('User deleted successfully')
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
          {loadingDelete && <Loading></Loading>}
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
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Phone Number
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Account Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users!.map((user) => {
                      return (
                        <tr key={user._id} className="bg-white border-b ">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                          >
                            {user.firstName + " " + user.lastName}
                          </th>
                          <td className="px-6 py-4">{user.email}</td>
                          <td className="px-6 py-4">{user.phoneNumber}</td>
                          <td className="px-6 py-4">
                            {user.createdAt.substring(0, 10)}
                          </td>
                          <td className="px-6 py-4 flex gap-2">
                            <button onClick={() => userDeleteHandler(user._id)}>
                              delete
                            </button>

                            {/* MODAL */}

                            <button
                              className="block text-red-600 hover:text-white hover:bg-red-600 font-medium rounded-lg text-sm px-4 py-1.5 text-center"
                              type="button"
                              onClick={()=> document.getElementById('my_modal_1').showModal()}
                            >
                              Remove
                            </button>
                            <dialog
                              id="my_modal_1"
                              className="modal"
                            >
                              <div className="relative w-full max-w-md max-h-full">
                                <form className="relative bg-white rounded-lg shadow dialog">
                                  <div className="p-6 text-center">
                                    <svg
                                      className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                      />
                                    </svg>
                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                      Are you sure you want to delete this
                                      user?
                                    </h3>
                                    <button
                                      type="button"
                                      onClick={() => {userDeleteHandler(user._id)}}
                                      className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                                    >
                                      Yes, I'm sure
                                    </button>
                                    <button
                                      className="text-gray-500 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 focus:z-10"
                                    >
                                      No, cancel
                                    </button>
                                  </div>
                                </form>
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

export default DashboardUsers;
