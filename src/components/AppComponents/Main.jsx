import React from "react";
import { BiSolidRightArrow } from "react-icons/bi";
import { FaAngleDoubleDown } from "react-icons/fa";
import HomePage from "@/components/AppComponents/Home";
import AdSection from "./AddSection";
import CategoryNews from "./CategoryNews";
import DynamicCategoryContainer from "./DynamicCategory";

const Main = () => {
  return (
    <div className="">
      <div className="md:w-[50%] px-12 border-b border-y-gray-400 py-2 flex items-center md:text-2xl text-xl font-bold gap-4">
        <span className="text-red-500">
          <FaAngleDoubleDown size={25} />
        </span>
        <span>Breaking News</span>
      </div>
      <HomePage />
      <AdSection />
      <DynamicCategoryContainer />
      {/* <div className="md:w-[50%] border-b border-y-gray-400 py-2 px-12 flex items-center md:text-2xl text-xl font-bold gap-4">
        <span className="text-red-500">
          <FaAngleDoubleDown size={25} />
        </span>
        <span>Tech  News</span>
      </div>
      <CategoryNews category={"Technology"} />
      <AdSection />
      <div className="md:w-[50%] border-b border-y-gray-400 py-2 px-12 flex items-center md:text-2xl text-xl font-bold gap-4">
        <span className="text-red-500">
          <FaAngleDoubleDown size={25} />
        </span>
        <span> Health News</span>
      </div>
      <CategoryNews category={"Health"} />
      <AdSection />
      <div className="md:w-[50%] px-12 flex border-b border-y-gray-400 py-2 items-center md:text-2xl text-xl font-bold gap-4">
        <span className="text-red-500">
          <FaAngleDoubleDown size={25} />
        </span>
        <span>Education News </span>
      </div>
      <CategoryNews category={"Education "} />
      <AdSection />
      <div className="md:w-[50%] px-12 flex border-b border-y-gray-400 py-2 items-center md:text-2xl text-xl font-bold gap-4">
        <span className="text-red-500">
          <FaAngleDoubleDown size={25} />
        </span>
        <span> Sports   News </span>
      </div>
      <CategoryNews category={"sports"} />
      <AdSection />
      <div className="md:w-[50%] px-12 flex border-b border-y-gray-400 py-2 items-center md:text-2xl text-xl font-bold gap-4">
        <span className="text-red-500">
          <FaAngleDoubleDown size={25} />
        </span>
        <span>  Political  News </span>
      </div>
      <CategoryNews category={"Politics"} />
      <AdSection />
      <div className="md:w-[50%] px-12 flex border-b border-y-gray-400 py-2 items-center md:text-2xl text-xl font-bold gap-4">
        <span className="text-red-500">
          <FaAngleDoubleDown size={25} />
        </span>
        <span> Weather  News </span>
      </div>
      <CategoryNews category={"Weather"} />
      <AdSection /> */}
    </div>
  );
};
export default Main;