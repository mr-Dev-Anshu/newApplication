import Image from "next/image";
import React from "react";
import ads1 from "@/accets/ads/ads2.jpeg";
import ads2 from "@/accets/ads/ads3.jpeg";
const RightNews = () => {
  return (
    <div>
      <div>
        <div className=" flex justify-center py-4">
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
              <div className="">
                {/* <iframe
                  width={300}
                  className="rounded-md w-[300px] md:w-[300px]"
                  src="https://www.youtube.com/embed/gPLrIJgsJlw?si=Ia1UUtAdv9QEsbSE"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe> */}
              </div>
              <div className="flex justify-center ">
              <Image src={ads1} alt="ads" />
              </div>
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
