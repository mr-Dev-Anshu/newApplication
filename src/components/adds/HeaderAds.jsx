import Image from "next/image";
import React from "react";
import ads1 from "@/accets/ads/ads2.jpeg";
const HeaderAds = () => {
  return (
    <div>
      <div className=" -z-50 bg-gray-200 rounded-md shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]   md:mx-14  text-white mb-6   px-4   ">
        <marquee scrollamount="20"  behavior="" direction="left">
          <div className="flex justify-between  gap-4 md:gap-0  items-center md:h-[180px] h-[150px] overflow-x-scroll   ">
            <div>
              <Image  className="rounded-lg   md:w-[150px]"  src={ads1} alt="ads2" />
            </div>
            <div>
              <Image className="rounded-lg  md:w-[150px]"  src={ads1} alt="ads2" />
            </div>
            <div>
              <Image className="rounded-lg  md:w-[150px]"  src={ads1} alt="ads2" />
            </div>
            <div>
              <Image className="rounded-lg  md:w-[150px]"  src={ads1} alt="ads2" />
            </div>
            <div>
              <Image className="rounded-lg  md:w-[150px]"  src={ads1} alt="ads2" />
            </div>
            <div>
              <Image className="rounded-lg  md:w-[150px]"  src={ads1} alt="ads2" />
            </div>
            <div>
              <Image className="rounded-lg  md:w-[150px]"  src={ads1} alt="ads2" />
            </div>
          </div>
        </marquee>
      </div>
    </div>
  );
};

export default HeaderAds;
