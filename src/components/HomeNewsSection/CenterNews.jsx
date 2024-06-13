import React from "react";
import Image from "next/image";
import  {data} from "@/constant/newsData"
import Link from "next/link";

const CenterNews = () => {
  return (
    <div>
      <div className="flex flex-col space-y-4 h-screen w-fit scroll-smooth  overflow-y-scroll ">
      {data.map((item) => (
        <Link href={"/testUi"}>
         <div className="flex md:max-w-[450px] md:min-w-[450px] min-h-[90px] max-h-[90px]  gap-2 ring-1 cursor-pointer  ring-gray-300 py-2 px-2  ">
          <div className="w-[30%]">
            <Image className="rounded" src={item.img} width={150} />
          </div>
          <div className="w-[70%]">{item.heading}</div>
        </div>
        </Link>
      ))}
      </div>
    </div>
  );
};
export default CenterNews;
