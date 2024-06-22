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
      <AdSection category={"Breaking_News"} />
      <DynamicCategoryContainer />
    </div>
  );
};
export default Main;
