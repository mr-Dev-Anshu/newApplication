"use client";
import { db } from "@/config/firebase.config";
import { Button } from "@chakra-ui/react";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { BiMessageAltEdit } from "react-icons/bi";

const Page = () => {
  const [newsCategory, setNewsCategory] = useState("");
  const [adsCategory, setAdsCategory] = useState("");
  const [newsLoading, setNewsLoading] = useState(false);
  const [adsLoading, setAdsLoading] = useState(false);
  const [newsMessage, setNewsMessage] = useState("");
  const [adsMessage, setAdsMessage] = useState("");

  const adsHandleChange = (e) => {
    setAdsCategory(e.target.value);
  };

  const newsHandleChange = (e) => {
    setNewsCategory(e.target.value);
  };

  const handleAdsCategory = async (e) => {
    e.preventDefault();
    setAdsLoading(true);
    setAdsMessage("");
    try {
      if (adsCategory === "" || adsCategory.trim() === "") {
        setAdsMessage("Please Enter Ads Category");
        setAdsLoading(false);
        return;
      }
      await addDoc(collection(db, "ads_category"), { adsCategory });
      console.log("Ads category added");
      setAdsCategory("");
      setAdsMessage("Ads Category added successfully");
      setAdsLoading(false);
    } catch (error) {
      console.error("Error adding ads category:", error);
      setAdsMessage("Error adding ads category");
      setAdsLoading(false);
    }
  };

  const handleNewsCategory = async (e) => {
    e.preventDefault();
    setNewsLoading(true);
    setNewsMessage("");
    try {
      if (newsCategory === "" || newsCategory.trim() === "") {
        setNewsMessage("Please Enter News Category");
        setNewsLoading(false);
        return;
      }
      await addDoc(collection(db, "news_category"), { newsCategory });
      console.log("News category added");
      setNewsCategory("");
      setNewsMessage("News Category added successfully");
      setNewsLoading(false);
    } catch (error) {
      console.error("Error adding news category:", error);
      setNewsMessage("Error adding news category");
      setNewsLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-center border-b border-gray-400 md:text-3xl text-2xl font-medium border-t py-2">
        Create Category here
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-2 space-y-6">
          <div>
            <p className="md:text-2xl text-xl font-medium flex items-center">
              <span>News Category</span>
              <span className="text-red-600 ml-1">*</span>
            </p>
            <input
              value={newsCategory}
              onChange={newsHandleChange}
              id="news_category"
              placeholder="Enter News Category"
              className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-2 w-full mt-2"
              type="text"
            />
          </div>
          <div>
            <Button
              onClick={handleNewsCategory}
              className="w-full"
              colorScheme="teal"
              variant="solid"
              isLoading={newsLoading}
            >
              Submit
            </Button>
            <p className="text-green-800">{newsMessage}</p>
          </div>
        </div>
        <div className="col-span-2 space-y-6">
          <div>
            <p className="md:text-2xl text-xl font-medium flex items-center">
              <span>Ads Category</span>
              <span className="text-red-600 ml-1">*</span>
            </p>
            <input
              value={adsCategory}
              onChange={adsHandleChange}
              id="ads_category"
              placeholder="Enter Ads Category"
              className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-2 w-full mt-2"
              type="text"
            />
          </div>

          <div>
            <Button
              onClick={handleAdsCategory}
              className="w-full"
              colorScheme="teal"
              variant="solid"
              isLoading={adsLoading}
            >
              Submit
            </Button>
            <p className="text-green-700">{adsMessage}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
