"use client";
import { db } from "@/config/firebase.config";
import { uploadFiles } from "@/controller/uploadFiles";
import { Button, Input } from "@chakra-ui/react";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";

const page = () => {
  const [formData, setFormData] = useState();
  const [toggle, setToggle] = useState();
  const [files, setFiles] = useState();
  const [message , setMessage] = useState() ; 
  
  const handleFiles = (e) => {
    setFiles(e.target.files);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });

    console.log(formData);
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };


  const handleSubmit = async (e) => {

    // console.lot("chala jiii ")
    e.preventDefault() ; 
    setMessage(null);

    if (!files) {
      console.log("file is not there ");
      setMessage("Please select the Images ");
      return;
    }

    // return

    e.preventDefault();
    const docRef = await addDoc(collection(db, "ads_data"), {
      formData,
    });
    console.log(docRef.id);
    const id = docRef.id;
    await uploadFiles(files, id);
    console.log("files has been uploaded dude ")
    try {
       setMessage(null)
    } catch (error) {
      
    }

  };
  return (
    <div className="space-y-6">
      <div className="flex justify-center border-b border-gray-400  md:text-3xl text-2xl  font-medium border-t py-2">
        Add Ads Here
      </div>
      <div className="grid md:grid-cols-4 md:px-12  gap-4">
        <div className="md:col-span-2">
          <p className="md:text-2xl font-medium flex  ">
            {" "}
            <span>Ad Title </span> <span className="text-red-600">*</span>
          </p>
          <input
            onChange={handleChange}
            id="ad_title"
            placeholder="Enter Ad title"
            className="border  border-gray-400 text-xl  focus:border focus:border-blue-500 focus:outline-none rounded-md px-4  py-2 w-full"
            type="text"
          />
        </div>
        <div className="md:col-span-2 ">
          <p className="md:text-2xl font-medium flex  ">
            {" "}
            <span> Ads Category </span> <span className="text-red-600">*</span>
          </p>
          <input
            onChange={handleChange}
            id="ads_category"
            placeholder="Enter Ads Category"
            className="border  border-gray-400 text-xl  focus:border focus:border-blue-500 focus:outline-none rounded-md px-4  py-2 w-full"
            type="text"
          />
        </div>
        <div className="">
          <p className="md:text-2xl font-medium flex  ">
            {" "}
            <span> Advertiser's Name </span>{" "}
            <span className="text-red-600">*</span>
          </p>
          <input
            onChange={handleChange}
            id="advertiser_name"
            placeholder="Enter Advertiser's  Name "
            className="border  border-gray-400 text-xl  focus:border focus:border-blue-500 focus:outline-none rounded-md px-4  py-2 w-full"
            type="text"
          />
        </div>
        <div>
          <p className="md:text-2xl font-medium flex  ">
            {" "}
            <span> Contact information </span>{" "}
            <span className="text-red-600">*</span>
          </p>
          <input
            onChange={handleChange}
            id="contact"
            placeholder="Enter Contact info... "
            className="border  border-gray-400 text-xl  focus:border focus:border-blue-500 focus:outline-none rounded-md px-4  py-2 w-full"
            type="Number"
          />
        </div>

        <div className="md:col-span-2  ">
          <p className="md:text-2xl font-medium flex  ">
            {" "}
            <span> Target URL</span> <span className="text-red-600">*</span>
          </p>
          <input
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
            id="expiry_date"
            placeholder="Enter Category "
            className="border lowercase border-gray-400 text-xl  focus:border focus:border-blue-500 focus:outline-none rounded-md px-4  py-2 w-full"
            type="date"
          />
        </div>
        <div className="md:col-span-2">
          <p className="md:text-2xl font-medium flex  ">
            {" "}
            <span> Ad Images </span> <span className="text-red-600">*</span>
          </p>
          <input
            onChange={handleFiles}
            id="files"
            placeholder="Enter Category"
            className="border lowercase border-gray-400 text-xl focus:border focus:border-blue-500 focus:outline-none rounded-md px-4 py-2 w-full"
            type="file"
            multiple
          />
        </div>

        <div className="md:col-span-2">
          <p className="md:text-2xl font-medium flex  ">
            {" "}
            <span> Ad Description</span> <span className="text-red-600">*</span>
          </p>
          <textarea
            onChange={handleChange}
            placeholder="Enter Ad Discription  "
            className="border  border-gray-400 text-xl  focus:border focus:border-blue-500 focus:outline-none rounded-md px-4  py-2 w-full"
            id="ad_discription"
            cols="30"
            rows="4"
          ></textarea>
        </div>
      </div>
      <div className="flex justify-center ">
        <Button
          onClick={handleToggle}
          className="w-[50%]"
          colorScheme="teal"
          variant="solid"
        >
          Submit
        </Button>
        {toggle && (
          <div
            id="info-popup"
            tabindex="-1"
            class=" flex justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
          >
            <div class="relative p-4 w-full max-w-lg h-full md:h-auto">
              <div class="relative p-4 bg-white rounded-lg shadow border border-gray-300  md:p-8">
                <div class="mb-4 text-sm font-light text-gray-500 ">
                  <h3 class="mb-3 text-2xl font-bold text-gray-900 ">
                    Please Confirm
                  </h3>
                  {/* <p className="text-red-500 font-medium text-xl">{message}</p> */}
                </div>
                <div class="justify-between items-center pt-0 space-y-4 sm:flex sm:space-y-0">
                  <a
                    href="#"
                    class="font-medium text-primary-600 dark:text-primary-500 hover:underline"
                  >
                    Learn more about privacy
                  </a>
                  <div class="items-center space-y-4 sm:space-x-4 sm:flex sm:space-y-0">
                    <button
                      onClick={() => handleToggle()}
                      type="button"
                      class="py-2 px-4 w-full text-sm font-medium text-gray-500 bg-white rounded-lg border  border-gray-300 sm:w-auto hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      id="confirm-button"
                      type="button"
                      class="py-2 px-4 w-full text-sm font-medium text-center text-white rounded-lg bg-gray-700 "
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
