import Image from "next/image";
import React from "react";
import CenterNews from "@/components/HomeNewsSection/CenterNews";
import LeftNews from "@/components/HomeNewsSection/LeftNews";
import RightNews from "@/components/HomeNewsSection/RightNews";
import BreakingNews from "./Breaking";
const page = () => {
  return (
    <div className="grid md:grid-cols-7 space-x-4 space-y-10 md:space-y-0 md:px-12 px-4 py-4  scroll-smooth ">
      <div className="md:col-span-5">
        {" "}
        <BreakingNews />
      </div>
      <div className="md:col-span-2">
        <RightNews />
      </div>
    </div>
  );
};
export default page;
