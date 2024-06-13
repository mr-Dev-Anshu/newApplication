"use client";
import React, { useState, useEffect, useRef } from "react";
import newsImage from "@/accets/newsImage/img2.jpeg";
import adsImage from "@/accets/ads/ads2.jpeg";
import Image from "next/image";
import HeaderAds from "@/components/adds/HeaderAds";

const Page = () => {
  const [toggle, setToggle] = useState(false);
  const modalRef = useRef(null);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setToggle(false);
    }
  };

  useEffect(() => {
    if (toggle) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggle]);

  return (
    <div className="flex flex-col min-h-screen ">
      <HeaderAds />
      <div
        className={`flex-1 px-12 md:w-[70%] space-y-4 ${
          toggle ? "blur-md" : ""
        }`}
      >
        <div className="md:text-4xl text-xl font-bold">
          Local Community Garden Thrives Amid Urban Development
        </div>
        <div className="md:text-xl text-gray-500">
          Looking for something specific? Use our Search News feature to find
          articles, reports, and updates on the topics that matter most to
          you. Simply enter your keywords and discover a wealth of information.
        </div>
        <div className="rounded-md cursor-pointer flex justify-center">
          <Image className="rounded-lg" width={600} src={newsImage} alt="img" />
        </div>
        <p className="text-gray-500 text-xl md:text-2xl">Read More About it </p>
        <div className="md:text-xl text-gray-500">
          In a remarkable advancement in renewable energy, scientists have
          achieved a significant milestone by doubling the efficiency of solar
          power technology. This breakthrough promises to revolutionize the
          solar energy sector and accelerate the transition to a sustainable
          future. Researchers at the International Renewable Energy Laboratory
          (IREL) announced that they have successfully developed a new type of
          solar cell that can convert sunlight into electricity with
          unprecedented efficiency. The new cells utilize a novel material,
          perovskite, which has demonstrated remarkable photovoltaic properties.
          This material, combined with innovative engineering techniques, has
          resulted in solar panels that can achieve an efficiency rate of over
          40%, a substantial increase from the current average of 20-22%.
        </div>

        <div className="flex justify-center">
          <Image className="rounded-md" width={300} src={adsImage} alt="adss" />
        </div>
        <div className="md:text-xl text-gray-500">
          Dr. Amanda Clark, the lead scientist on the project, explained the
          significance of this development: "The efficiency of solar panels has
          always been a limiting factor in the widespread adoption of solar
          energy. With our new technology, we can produce more electricity from
          the same amount of sunlight, making solar power a more viable and
          cost-effective option for both residential and commercial use."
        </div>
      </div>
      {toggle && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div
            ref={modalRef}
            className="relative h-[500px] w-96 bg-white text-black p-4 rounded-md"
          >
            This is testing
            <button onClick={handleToggle}>Close</button>
          </div>
        </div>
      )}
      <div className="flex justify-center md:mt-6 mt-4">
        <button
          onClick={handleToggle}
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm md:text-2xl px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Post a Comment
        </button>
      </div>
    </div>
  );
};

export default Page;
