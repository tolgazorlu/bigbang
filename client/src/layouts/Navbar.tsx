import { Fragment, useState, useContext } from "react";
import { Dialog, Menu, Popover, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Store } from "../Store";
import { Link, useLocation } from "react-router-dom";

const navigation = {
  pages: [
    { name: "Project", href: "/" },
    { name: "Stores", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const {
    state: { cart },
  } = useContext(Store);

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const signoutHandler = () => {
    dispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    window.location.href = "/login";
  };

  const location = useLocation().pathname;

  return (
    <div className={location === "/" ? "bg-black" : "bg-white"}>
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <a
                      href="#"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Sign in
                    </a>
                  </div>
                  <div className="flow-root">
                    <a
                      href="#"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Create account
                    </a>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6">
                  <a href="#" className="-m-2 flex items-center p-2">
                    <img
                      src="https://tailwindui.com/img/flags/flag-canada.svg"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-medium text-gray-900">
                      CAD
                    </span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header
        className={location === "/" ? "relative bg-black" : "relative bg-white"}
      >
        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div
            className={
              location === "/"
                ? "border-b border-gray-700"
                : "border-b border-gray-200"
            }
          >
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="#" className="flex items-center gap-2">
                  <span
                    className={
                      location === "/"
                        ? "text-gray-300 text-xl font-space"
                        : "text-gray-700 text-xl font-space"
                    }
                  >
                    Bigbang
                  </span>
                </a>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className={
                        location === "/"
                          ? "flex items-center text-sm font-medium text-gray-200 hover:text-gray-50"
                          : "flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                      }
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                {userInfo ? (
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <Menu as="div" className="relative inline-block text-left">
                      <Menu.Button>
                        <img
                          alt="User dropdown"
                          className="w-6 h-6 rounded-full mt-2 ring ring-blue-700"
                          src={userInfo.avatar}
                        />
                      </Menu.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            <Menu.Item>
                              {() => (
                                <div className="px-4 py-3 text-sm text-gray-900 flex items-center justify-between">
                                  <div>
                                    <div>
                                      {userInfo.firstName} {userInfo.lastName}
                                    </div>
                                    <div className="font-medium truncate">
                                      {userInfo.email}
                                    </div>
                                  </div>
                                  <div>
                                    <img
                                      alt="User dropdown"
                                      className="w-10 h-10 rounded-full ring ring-blue-700"
                                      src={userInfo.avatar}
                                    />
                                  </div>
                                </div>
                              )}
                            </Menu.Item>
                            <hr></hr>
                            {userInfo.isAdmin ? (
                              <Link to="/dashboard" className="w-full">
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      type="submit"
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700",
                                        "block w-full px-4 py-2 text-left text-sm"
                                      )}
                                    >
                                      Dashboard
                                    </button>
                                  )}
                                </Menu.Item>
                              </Link>
                            ) : (
                              <></>
                            )}
                            <Link to="/profile" className="w-full">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    type="submit"
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "block w-full px-4 py-2 text-left text-sm"
                                    )}
                                  >
                                    Profile
                                  </button>
                                )}
                              </Menu.Item>
                            </Link>
                            <button onClick={signoutHandler} className="w-full">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    type="submit"
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "block w-full px-4 py-2 text-left text-sm"
                                    )}
                                  >
                                    Sign out
                                  </button>
                                )}
                              </Menu.Item>
                            </button>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  </div>
                ) : (
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <Link
                      to="/login"
                      className={
                        location === "/"
                          ? "text-sm font-medium text-gray-300 hover:text-gray-50"
                          : "text-sm font-medium text-gray-700 hover:text-gray-800"
                      }
                    >
                      Login
                    </Link>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                    <Link
                      to="/register"
                      className={
                        location === "/"
                          ? "text-sm font-medium text-gray-300 hover:text-gray-50"
                          : "text-sm font-medium text-gray-700 hover:text-gray-800"
                      }
                    >
                      Register
                    </Link>
                  </div>
                )}

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link to="/cart" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    {cart.cartItems.length > 0 ? (
                      <span
                        className={
                          location === "/"
                            ? "ml-2 text-sm font-medium text-gray-200 group-hover:text-gray-800"
                            : "ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800"
                        }
                      >
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </span>
                    ) : (
                      <span
                        className={
                          location === "/"
                            ? "ml-2 text-sm font-medium text-gray-200 group-hover:text-gray-800"
                            : "ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800"
                        }
                      >
                        0
                      </span>
                    )}
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
