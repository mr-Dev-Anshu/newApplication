import React from "react";
import { DirectionAwareHover } from "../ui/image";
import img1 from "@/accets/newsImage/img2.jpeg";
import RightNews from "./RightNews";
import CenterNews from "./CenterNews";
import Image from "next/image";
import { data } from "@/constant/newsData";
const LeftNews = () => {
  return (
    <div>
      <div className="h-screen  overflow-y-scroll scroll-smooth">
        {data.map((item) => (
          <div className=" w-full  ring-1 ring-gray-300 rounded-lg ">
            <div className=" rounded-md border-b border-gray-300   ">
              <Image className="w-full rounded-lg" src={item.img} />
            </div>
            <p className="text-xl font-medium px-2  py-2 ">{item.heading}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default LeftNews;
