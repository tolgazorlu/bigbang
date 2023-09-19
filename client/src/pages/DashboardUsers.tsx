import React from "react";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { getError } from "../utils/getError";
import { ApiError } from "../types/ApiError";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import { useGetUsersQuery } from "../hooks/userHooks";
import Sidebar from "../components/Sidebar";

const DashboardUsers = () => {
  const { data: users, isLoading, error } = useGetUsersQuery();

  console.log(users);

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
                        <tr className="bg-white border-b ">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                          >
                            {user.firstName}
                            {user.lastName}
                          </th>
                          <td className="px-6 py-4">{user.email}</td>
                          <td className="px-6 py-4">{user.phoneNumber}</td>
                          <td className="px-6 py-4">
                            {user.createdAt.substring(0, 10)}
                          </td>
                          <td className="px-6 py-4 flex gap-2">
                            <a
                              href="#"
                              className="font-medium text-blue-600  hover:underline"
                            >
                              Edit
                            </a>
                            <a
                              href="#"
                              className="font-medium text-red-600  hover:underline"
                            >
                              Remove
                            </a>
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
