import React from "react";
import { BiSolidRightArrow } from "react-icons/bi";
import { FaAngleDoubleDown } from "react-icons/fa";
import HomePage from "@/components/AppComponents/Home"
const Main = () => {
  return (
    <div className="md:mt-4 ">
      <div className="md:w-[50%] px-12 border-b border-y-gray-400 py-2 flex  items-center md:text-2xl text-xl font-bold gap-4 ">
        <span className="text-red-500 ">
          <FaAngleDoubleDown size={25} />
        </span>
        <span>Breaking News</span>
      </div>
      <HomePage />
      <div className="md:w-[50%] border-b border-y-gray-400 py-2  px-12 flex  items-center md:text-2xl text-xl font-bold gap-4 ">
        <span className="text-red-500 ">
          <FaAngleDoubleDown size={25} />
        </span>
        <span>Political News </span>
      </div>
      <HomePage />
      <div className="md:w-[50%] px-12 flex border-b border-y-gray-400 py-2   items-center md:text-2xl text-xl font-bold gap-4 ">
        <span className="text-red-500 ">
          <FaAngleDoubleDown size={25} />
        </span>
        <span>Helth News </span>
      </div>
      <HomePage />
    </div>
  );
};

export default Main;
