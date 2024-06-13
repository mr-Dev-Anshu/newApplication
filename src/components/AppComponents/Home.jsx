import Image from "next/image";
import React from "react";
import CenterNews from "@/components/HomeNewsSection/CenterNews";
import LeftNews from "@/components/HomeNewsSection/LeftNews";
import RightNews from "@/components/HomeNewsSection/RightNews";
const page = () => {
  return ( 
    <div className="grid md:grid-cols-7 space-x-4 space-y-10 md:space-y-0 md:px-12 px-4 py-4 scroll-smooth ">
        <div className="col-span-2"> <LeftNews /> </div>
        <div className="col-span-3 flex justify-center "><CenterNews /></div>
        <div className="col-span-2"><RightNews /></div>
    </div>
  );
};
export default page;