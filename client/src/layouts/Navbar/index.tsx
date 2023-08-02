import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navbarLinks = [
    { title: "Home", link: "/" },
    { title: "Shop", link: "/shop" },
    { title: "About", link: "/about" },
    { title: "Contact", link: "/contact" },
  ];

  const [colorChange, setColorChange] = useState(false);

  useEffect(() => {
    const changeNavbarColor = () => {
      if(window.scrollY >= 80){
        setColorChange(true)
      }
      else{
        setColorChange(false)
      }
    };
    window.addEventListener('scroll', changeNavbarColor);
  }, [])

  return (
    <nav className={colorChange ? 'colorChange navbar md:px-24 z-20 font-space bg-black fixed' : 'navbar md:px-24 fixed z-20 font-space '}>
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
      </div>
      <div className="navbar-end">
        <a className="btn btn-sm btn-outline hover:bg-white hover:text-black text-white px-4">
          Login
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
