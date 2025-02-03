import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { RiLoginCircleLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function PublicNavbar() {
  return (
    <Disclosure as="nav" className="bg-gray-800 shadow-lg">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              <div className="flex items-center">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              {/* Navigation Links */}
              <div className="hidden md:flex md:space-x-8 md:ml-auto">
                <Link
                  to="/register"
                  className="text-white font-semibold py-2 px-4 rounded-md bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  <FaRegUser className="inline-block mr-2" />
                  Register
                </Link>
                <Link
                  to="/login"
                  className="text-white font-semibold py-2 px-4 rounded-md bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  <RiLoginCircleLine className="inline-block mr-2" />
                  Login
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Panel */}
          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pt-2 pb-3">
              <Link to="/register">
                <Disclosure.Button className="block py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                  Register
                </Disclosure.Button>
              </Link>
              <Link to="/login">
                <Disclosure.Button className="block py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                  Login
                </Disclosure.Button>
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
