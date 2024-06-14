import { Button, Input } from "@chakra-ui/react";
import React from "react";

const page = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-center border-b border-gray-400  md:text-3xl text-2xl  font-medium border-t py-2">
        Add Ads  Here
      </div>
      <div className="grid md:grid-cols-4 md:px-12  gap-4">
        <div className="md:col-span-2">
          <p className="md:text-2xl font-medium flex  ">
            {" "}
            <span>Ad Title </span> <span className="text-red-600">*</span>
          </p>
          <input
            id="ad_title"
            placeholder="Enter Ad title   "
            className="border  border-gray-400 text-xl  focus:border focus:border-blue-500 focus:outline-none rounded-md px-4  py-2 w-full"
            type="text"
          />
        </div>
        <div className="">
          <p className="md:text-2xl font-medium flex  ">
            {" "}
            <span> Advertiser's  Name </span> <span className="text-red-600">*</span>
          </p>
          <input
            id="advertiser_name"
            placeholder="Enter Advertiser's  Name "
            className="border  border-gray-400 text-xl  focus:border focus:border-blue-500 focus:outline-none rounded-md px-4  py-2 w-full"
            type="text"
          />
        </div>
        <div>
          <p className="md:text-2xl font-medium flex  ">
            {" "}
            <span> Contact information </span> <span className="text-red-600">*</span>
          </p>
          <input
            id="contact"
            placeholder="Enter Contact info... "
            className="border  border-gray-400 text-xl  focus:border focus:border-blue-500 focus:outline-none rounded-md px-4  py-2 w-full"
            type="Number"
          />
        </div>
        <div className="md:col-span-2">
          <p className="md:text-2xl font-medium flex  ">
            {" "}
            <span> Ad Description</span> <span className="text-red-600">*</span>
          </p>
          <textarea
            placeholder="Enter Ad Discription  "
            className="border  border-gray-400 text-xl  focus:border focus:border-blue-500 focus:outline-none rounded-md px-4  py-2 w-full"
            id="ad_discription"
            cols="30"
            rows="4"
          ></textarea>
        </div>
        <div className="md:col-span-2  md:mt-8">
          <p className="md:text-2xl font-medium flex  ">
            {" "}
            <span> Target URL</span> <span className="text-red-600">*</span>
          </p>
          <input
            id="url"
            placeholder=" add_target.com "
            className="border  border-gray-400 text-xl  focus:border focus:border-blue-500 focus:outline-none rounded-md px-4  py-2 w-full"
            type="text"
          />
        </div>
        <div>
          <p className="md:text-2xl font-medium flex  ">
            {" "}
            <span> Publish Date </span> <span className="text-red-600">*</span>
          </p>
          <input
            id="publish_date"
            placeholder="Enter Category "
            className="border lowercase border-gray-400 text-xl  focus:border focus:border-blue-500 focus:outline-none rounded-md px-4  py-2 w-full"
            type="date"
          />
        </div>
        <div>
          <p className="md:text-2xl font-medium flex  ">
            {" "}
            <span>Expiry Date </span> <span className="text-red-600">*</span>
          </p>
          <input
            id="expiry_date"
            placeholder="Enter Category "
            className="border lowercase border-gray-400 text-xl  focus:border focus:border-blue-500 focus:outline-none rounded-md px-4  py-2 w-full"
            type="date"
          />
        </div>
        <div className="md:col-span-2">
          <p className="md:text-2xl font-medium flex  ">
            {" "}
            <span> Ad   Images   </span> <span className="text-red-600">*</span>
          </p>
          <input
            id="files"
            placeholder="Enter Category"
            className="border lowercase border-gray-400 text-xl focus:border focus:border-blue-500 focus:outline-none rounded-md px-4 py-2 w-full"
            type="file"
            multiple
          />
        </div>
      </div>
      <div className="flex justify-center ">
        <Button className="w-[50%]"  colorScheme="teal" variant="solid">
            Submit 
        </Button>
      </div>
    </div>
  );
};

export default page;
