"use client";
import { Menu, MenuItem, ProductItem } from "@/components/ui/nav-manu";
import React, { useState } from "react";
import Link from "next/link";
import { navlist } from "@/constant/Navlist";
import { FaChevronDown } from "react-icons/fa";
const Header = () => {
  const [active, setActive] = useState();
  return (
    <div>
      <div className="fixed z-50 top-0 left-0 right-0 ">
        <Menu setActive={setActive}>
          <div className="flex gap-2 items-center ">
            <MenuItem setActive={setActive} active={active} item="Options">
              <div className="">
                <ul className="space-y-4">
                  <li className="cursor-pointer text-xl font-medium hover:bg-gray-300  p-2 rounded-md ">
                    <Link href={"/"}>Home</Link>
                  </li>
                  <li className="cursor-pointer text-xl font-medium hover:bg-gray-300  p-2 rounded-md ">
                    Search News
                  </li>
                  <li className="cursor-pointer text-xl font-medium  p-2 hover:bg-gray-300 rounded-md">
                    Latest News
                  </li>
                  <li className="cursor-pointer text-xl font-medium  p-2 hover:bg-gray-300 rounded-md">
                    Contact
                  </li>
                </ul>
              </div>
            </MenuItem>
            <span>
              <FaChevronDown size={20} />
            </span>
          </div>
          <div className="flex  items-center gap-2 ">
            <MenuItem setActive={setActive} active={active} item="Category">
              <div className=" grid md:grid-cols-4  grid-cols-1 gap-3 h-[400px] overflow-y-scroll py-4  md:px-20 md:pl-32 ">
                {navlist.map((item) => (
                  <div className="ring-1 ring-slate-700 rounded-md max-h-30  p-2">
                    <ProductItem
                      title={item.title}
                      description={item.description}
                      href={item.link}
                      src={item.img}
                    />
                  </div>
                ))}
              </div>
            </MenuItem>
            <span>
              <FaChevronDown size={20} />
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MenuItem setActive={setActive} active={active} item="Pages">
              <div className="">
                <ul className="space-y-4">
                  <Link href={"/login"}>
                    {" "}
                    <li className="cursor-pointer text-xl font-medium hover:text-red-500   p-2 ">
                      Login As Admin
                    </li>
                  </Link>
                  <Link href={"/userlogin"}>
                    {" "}
                    <li className="cursor-pointer text-xl font-medium hover:text-red-500   p-2 ">
                      Login As User 
                    </li>
                  </Link>
                  <Link href={"/servey"}>
                    {" "}
                    <li className="cursor-pointer text-xl font-medium hover:text-red-500   p-2 ">
                      Servey
                    </li>
                  </Link>
                  <li className="cursor-pointer text-xl font-medium  p-2 hover:text-red-500 ">
                    Privecy and Policy
                  </li>
                  <li className="cursor-pointer text-xl font-medium  p-2 hover:text-red-500 rounded-md">
                    Term & Conditions
                  </li>
                </ul>
              </div>
            </MenuItem>
            <span>
              <FaChevronDown size={20} />
            </span>
          </div>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
