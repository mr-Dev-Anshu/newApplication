import Image from "next/image";
import React from "react";
import ads1 from "@/accets/ads/ads2.jpeg";
import ads2 from "@/accets/ads/ads3.jpeg";
const RightNews = () => {
  return (
    <div>
      <div>
        <div className=" flex justify-center md:py-4">
          <div className="">
            <p className="  text-center">
              <span className="border-4   border-gray-600 rounded-lg px-6  py-1 mb-4">
                <span className="bg-red-600 h-5 w-5 text-red-600 rounded-full mr-2">
                  *
                </span>
                Live
              </span>
            </p>

            <div className="py-4 space-y-6 ">
              <div className=""></div>

              <div className="flex justify-center ">
                <Image src={ads2} alt="ads" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RightNews;
