"use client";
import React, { useState, useRef } from "react";
import { CiMenuFries } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import {
  FaTags,
  FaLocationDot,
  FaLanguage,
  FaCircleUser,
} from "react-icons/fa6";
import { SiPowerpages } from "react-icons/si";
import { GiBreakingChain } from "react-icons/gi";
import { BsCameraReelsFill } from "react-icons/bs";
import { MdAddBox, MdWidgets, MdLogout } from "react-icons/md";
import { FcSurvey } from "react-icons/fc";
import { FaHome, FaComments } from "react-icons/fa";
import Link from "next/link";
import { GrUserWorker } from "react-icons/gr";
import { SlSocialFacebook } from "react-icons/sl";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarRef = useRef(null);

  // Function to handle logout

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
      } bg-[#0E2B44] transition-all duration-300 h-screen overflow-y-scroll`}
    >
      <div className="flex items-center justify-between p-4">
        {/* Logo section */}
        <div
          className={`${
            isCollapsed ? "hidden" : "block"
          } text-white font-bold text-xl`}
        >
          Logo
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
      <ul className="text-gray-700 list-none flex flex-col gap-2 p-4">
        {[
          { to: "/admin", icon: <FaHome />, label: "Home" },
          { to: "/admin/news_list", icon: <MdAddBox />, label: " News " },
          { to: "/admin/ads_list", icon: <MdWidgets />, label: " Ads" },
          {
            to: "/admin/breaking_news",
            icon: <GiBreakingChain />,
            label: " Breaking News",
          },
          {
            to: "/admin/createcategory",
            icon: <MdAddBox />,
            label: " Category",
          },
          {
            to: "/admin/tags",
            icon: <FaTags />,
            label: "Tags",
          },
          {
            to: "/admin/locations",
            icon: <FaLocationDot />,
            label: "Location",
          },
          {
            to: "/admin/languages",
            icon: <FaLanguage />,
            label: "Language",
          },
          {
            to: "/admin/user",
            icon: <FaCircleUser />,
            label: "Users",
          },
          {
            to: "/admin/admins",
            icon: <MdAddBox />,
            label: "Admins",
          },
          {
            to: "/admin/pages",
            icon: <SiPowerpages />,
            label: "Pages",
          },
          {
            to: "/admin/surveyies",
            icon: <FcSurvey />,
            label: "Survey",
          },
          {
            to: "/admin/reels",
            icon: <BsCameraReelsFill />,
            label: "Reels",
          },
          {
            to: "/admin/social",
            icon: <SlSocialFacebook />,
            label: "Social Media",
          },
          {
            to: "/admin/repoters",
            icon: <GrUserWorker />,
            label: "Repoters",
          },
          {
            to: "/admin/comments",
            icon: <FaComments />,
            label: "Comments",
          },
        ].map((item) => (
          <Link
            key={item.to}
            href={item.to}
            className={`text-gray-300 py-4 flex items-center hover:border-r-4 hover:border-white`}
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
    </div>
  );
};
export default Sidebar;
