"use client";
import Image from "next/image";
import logo from "../../public/images/logo.png";
import { IoNotificationsOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="min-w-full max-h-20 bg-slate-100 p-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-12">
            <Image
              src={logo}
              alt="indian-sarkari-logo"
              className="relative h-16 w-16 overflow-hidden rounded-full bg-slate-100 border-2 border-blue-500 ml-4"
            />
            <h1 className="font-extrabold text-3xl">
              Welcome To Indian Sarkari Naukri
            </h1>
          </div>
          <div className="flex items-center gap-9">
            <IoNotificationsOutline className="cursor-pointer text-3xl text-gray-800 hover:text-gray-600 transition duration-200 shadow-md rounded-lg p-1" />
            <div className="relative flex items-center gap-3">
              <RxAvatar className="cursor-pointer text-3xl text-gray-800 hover:text-gray-600 transition duration-200 shadow-md rounded-lg p-1" />
              <div
                className="ml-2 flex items-center cursor-pointer font-semibold"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                Profile
                <IoMdArrowDropdown className="ml-1" />
              </div>
              {isOpen && (
                <div className="absolute right-0 top-0 z-10 w-48 bg-white shadow-lg rounded-md p-2 mt-12">
                  <p className="hover:bg-slate-100 transition duration-150 cursor-pointer p-2 rounded-md font-bold">
                    Profile Details
                  </p>
                  <p className="hover:bg-slate-100 transition duration-150 cursor-pointer p-2 rounded-md font-bold">
                    Logout
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
