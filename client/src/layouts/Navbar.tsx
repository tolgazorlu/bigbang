import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import { useCookies } from "react-cookie";

const Navbar = ({ isAuth, cookies }: any) => {
  const navbarLinks = [
    { title: "Home", link: "/" },
    { title: "Shop", link: "/shop" },
  ];

  const [cookie, removeCookie] = useCookies([cookies]);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [auth, setAuth] = useState(true);

  const Logout = () => {
    setAuth(false);
  };

  const Login = () => {
    setAuth(true);
  };

  return (
    <nav className="colorChange navbar md:px-12 z-20 font-space bg-black fixed">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          {navbarLinks.map((item, index) => {
            return (
              <ul
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                key={index}
              >
                <li>
                  <div className="text-white hover:bg-white hover:text-black">
                    {<Link to={item.link}>{item.title}</Link>}
                  </div>
                </li>
              </ul>
            );
          })}
        </div>
        <a className="btn btn-ghost btn-sm normal-case md:text-xl text-white">
          bigbang
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        {navbarLinks.map((item, index) => {
          return (
            <ul className="menu menu-horizontal px-1" key={index}>
              <li>
                <div className="text-white hover:bg-white hover:text-black">
                  <Link to={item.link}>{item.title}</Link>
                </div>
              </li>
            </ul>
          );
        })}
        {/* {auth ? (
          <ul className="menu menu-horizontal px-1">
            <li>
              <div className="text-white hover:bg-white hover:text-black">
                <a>Dashboard</a>
              </div>
            </li>
          </ul>
        ) : (
          <></>
        )} */}
      </div>
      <div className="navbar-end">
        {auth ? (
          <Link
            onClick={Logout}
            className="btn btn-sm btn-outline hover:bg-white hover:text-black text-white px-4"
            to="/login"
          >
            Logout
          </Link>
        ) : (
          <Link
            className="btn btn-sm btn-outline hover:bg-white hover:text-black text-white px-4"
            to="/login"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  isAuth: PropTypes.bool,
  cookies: PropTypes.any,
};

export default Navbar;
