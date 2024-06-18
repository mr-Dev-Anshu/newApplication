"use client";
import React, { useState, useRef } from "react";
import { CiMenuFries } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineUser } from "react-icons/ai";
import { MdAddBox, MdWidgets, MdLogout } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import Link from "next/link";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarRef = useRef(null);

  // Function to handle logout
  const handleLogout = async () => {
    localStorage.removeItem("token");
    dispatch(setToken(null));
    dispatch(setUser(null));
  };

  // Function to toggle sidebar collapse
  const handleToggle = () => {
    const collapsed = !isCollapsed;
    setIsCollapsed(collapsed);
    localStorage.setItem("sidebarCollapsed", collapsed.toString());
  };

  // Effect to close sidebar when clicking outside

  return (
    <div
      ref={sidebarRef}
      className={`fixed h-screen top-0 ${
        isCollapsed ? "w-16" : "w-64"
      } bg-[#0E2B44] transition-all duration-300`}
    >
      <div className="flex items-center justify-between p-4">
        {/* Logo section */}
        <div
          className={`${
            isCollapsed ? "hidden" : "block"
          } text-white font-bold text-xl`}
        >
          <img
            src="https://i.ibb.co/W0v3fWm/Team-LOGO-page-0001.jpg"
            alt=""
            className="w-[50px] h-[50px] lg:w-12 lg:h-12 object-cover rounded-full"
          />
        </div>
        {/* Toggle button */}
        <button
          onClick={handleToggle}
          className="bg-transparent border-none w-8 h-8 flex justify-center items-center cursor-pointer text-white"
        >
          {isCollapsed ? <CiMenuFries size={22} /> : <RxCross1 size={22} />}
        </button>
      </div>

      {/* Navigation links */}
      <ul className="text-white list-none flex flex-col gap-2 p-4">
        {[
          { to: "/admin", icon: <FaHome />, label: "Home" },
          { to: "/admin/news_list", icon: <MdAddBox />, label: "Add News " },
          { to: "/admin/ads_list", icon: <MdWidgets />, label: "Add Ads" },
          {
            to: "/admin/createcategory",
            icon: <MdAddBox />,
            label: "Create Category",
          },
        ].map((item) => (
          <Link
            key={item.to}
            href={item.to}
            className={`text-white py-4 flex items-center hover:border-r-4 hover:border-white`}
          >
            <div className="text-2xl">{item.icon}</div>
            <span
              className={`ml-4 text-xl ${isCollapsed ? "hidden" : "block"}`}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </ul>

      {/* User and logout section */}
      <div className="absolute bottom-2 left-2 right-2 overflow-hidden">
        <div
          className={`flex items-center justify-center w-full ${
            isCollapsed
              ? "w-11 h-11 rounded-full bg-slate-400 "
              : "bg-slate-400 py-2 px-4 rounded-lg"
          }`}
        >
          <div
            className={`cursor-pointer flex items-center justify-center text-black ${
              isCollapsed ? "w-10 h-10 rounded-full" : ""
            }`}
          >
            {isCollapsed ? (
              <AiOutlineUser size={20} />
            ) : (
              <span className="text-xl"></span>
            )}
          </div>
        </div>
        <button
          onClick={handleLogout}
          className={`bg-red-600 text-white text-xl flex items-center justify-center mt-2 ${
            isCollapsed
              ? "w-12 h-12 rounded-full"
              : "py-2 px-4 w-full rounded-lg"
          }`}
        >
          {isCollapsed ? (
            <MdLogout />
          ) : (
            <span className="flex gap-1 items-center text-xl">
              <MdLogout /> Logout
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
export default Sidebar;
