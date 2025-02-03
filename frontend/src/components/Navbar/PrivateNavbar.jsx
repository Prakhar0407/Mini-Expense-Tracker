import { Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoLogOutOutline } from "react-icons/io5";
import { logoutAction } from "../../redux/slice/authSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PrivateNavbar() {
  // Dispatch
  const dispatch = useDispatch();

  // Logout handler
  const logoutHandler = () => {
    dispatch(logoutAction());
    // Remove the user from storage
    localStorage.removeItem("userInfo");
  };

  return (
    <Disclosure as="nav" className="bg-gray-800 shadow-md">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              <div className="flex justify-start flex-row w-full">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset rounded-md">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                <div className="hidden md:flex md:space-x-6">
                  <Link
                    to="/add-transaction"
                    className="text-white text-sm font-medium hover:text-indigo-300"
                  >
                    Add Transaction
                  </Link>
                  <Link
                    to="/add-category"
                    className="text-white text-sm font-medium hover:text-indigo-300"
                  >
                    Add Category
                  </Link>
                  <Link
                    to="/categories"
                    className="text-white text-sm font-medium hover:text-indigo-300"
                  >
                    Categories
                  </Link>
                  <Link
                    to="/profile"
                    className="text-white text-sm font-medium hover:text-indigo-300"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    className="text-white text-sm font-medium hover:text-indigo-300"
                  >
                    Dashboard
                  </Link>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Logout Button */}
                <button
                  onClick={logoutHandler}
                  type="button"
                  className="flex items-center gap-x-2 text-white bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md text-sm font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <IoLogOutOutline className="h-5 w-5" aria-hidden="true" />
                  <span>Logout</span>
                </button>

                {/* Profile Dropdown */}
                <Menu as="div" className="relative ml-1">
                  <Menu.Button className="flex items-center text-sm rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span className="sr-only">Open user menu</span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/student-dashboard"
                            className={classNames(
                              active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            My Dashboard
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={logoutHandler}
                            className={classNames(
                              active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                              "block px-4 py-2 text-sm w-full text-left"
                            )}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          {/* Mobile Navs */}
          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">
              <Link
                to="/add-transaction"
                className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                Add Transaction
              </Link>
              <Link
                to="/add-category"
                className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                Add Category
              </Link>
              <Link
                to="/categories"
                className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                Categories
              </Link>
              <Link
                to="/profile"
                className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                Profile
              </Link>
              <Link
                to="/dashboard"
                className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                My Dashboard
              </Link>
            </div>
            <div className="border-t border-gray-200 pb-3 pt-4">
              <button
                onClick={logoutHandler}
                className="block w-full px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                Sign out
              </button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
