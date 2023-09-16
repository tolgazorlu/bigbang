import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Searchbox = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const submitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    navigate(query ? `/search?query=${query}` : "/search");
  };

  return (
    <form onSubmit={submitHandler} className="mr-8">
      <div className="flex">
        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            onChange={(e) => setQuery(e.target.value)}
            className="block p-1.5 w-[40vh] z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Search"
            required
          />
          <button
            type="submit"
            className="absolute top-0 right-0 p-2 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-3 h-3"
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
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Searchbox;
