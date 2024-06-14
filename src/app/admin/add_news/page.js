import { Button, Input } from "@chakra-ui/react";
import React from "react";

const page = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-center border-b border-gray-400  md:text-3xl text-2xl  font-medium border-t py-2">
        Add News Here
      </div>
      <div className="grid md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <p className="md:text-2xl font-medium flex  ">
            {" "}
            <span>News title </span> <span className="text-red-600">*</span>
          </p>
          <input
            id="title"
            placeholder="Enter title here "
            className="border  border-gray-400 text-xl  focus:border focus:border-blue-500 focus:outline-none rounded-md px-4  py-2 w-full"
            type="text"
          />
        </div>
        <div className="">
          <p className="md:text-2xl font-medium flex  ">
            {" "}
            <span>Author's Name </span> <span className="text-red-600">*</span>
          </p>
          <input
            id="author"
            placeholder="Enter Author's  Name "
            className="border  border-gray-400 text-xl  focus:border focus:border-blue-500 focus:outline-none rounded-md px-4  py-2 w-full"
            type="text"
          />
        </div>
        <div>
          <p className="md:text-2xl font-medium flex  ">
            {" "}
            <span>News Category </span> <span className="text-red-600">*</span>
          </p>
          <input
            id="category"
            placeholder="Enter Category "
            className="border lowercase border-gray-400 text-xl  focus:border focus:border-blue-500 focus:outline-none rounded-md px-4  py-2 w-full"
            type="text"
          />
        </div>
        <div className="md:col-span-2">
          <p className="md:text-2xl font-medium flex  ">
            {" "}
            <span> News Body </span> <span className="text-red-600">*</span>
          </p>
          <textarea
            placeholder="Enter News Body "
            className="border  border-gray-400 text-xl  focus:border focus:border-blue-500 focus:outline-none rounded-md px-4  py-2 w-full"
            id="news_body"
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <div className="md:col-span-2">
          <p className="md:text-2xl font-medium flex  ">
            {" "}
            <span> News Summary </span> <span className="text-red-600">*</span>
          </p>
          <textarea
            placeholder="Enter News Summary "
            className="border  border-gray-400 text-xl  focus:border focus:border-blue-500 focus:outline-none rounded-md px-4  py-2 w-full"
            id="news_summry"
            cols="30"
            rows="10"
          ></textarea>
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
            <span>News Images  </span> <span className="text-red-600">*</span>
          </p>
          <input
            id="category"
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
