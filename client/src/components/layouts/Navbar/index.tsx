import React from "react";
import Lottie from 'lottie-react'
import animationData from '../../../assets/lotties/infinity.json'

const Navbar = () => {
  const navbarLinks = [
    { title: "Home" },
    { title: "Shop" },
    { title: "About" },
    { title: "Contact" },
  ];

  return (
    <div className="navbar bg-base-100 px-20">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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
              <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52" key={index}>
                <li>
                  <a>{item.title}</a>
                </li>
              </ul>
            );
          })}
        </div>
        <Lottie className='w-16' animationData={animationData}/>
        <a className="btn btn-ghost btn-sm normal-case text-xl">bigbang</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        {navbarLinks.map((item, index) => {
          return (
            <ul className="menu menu-horizontal px-1" key={index}>
              <li>
                <a>{item.title}</a>
              </li>
            </ul>
          );
        })}
      </div>
      <div className="navbar-end">
        <a className="btn btn-sm btn-outline">Login</a>
      </div>
    </div>
  );
};

export default Navbar;
