"use client";
import { db } from "@/config/firebase.config";
import { uploadFiles } from "@/controller/uploadFiles";
import { Button, Input } from "@chakra-ui/react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const page = () => {
  const [formData, setFormData] = useState();
  const [toggle, setToggle] = useState();
  const [files, setFiles] = useState();
  const [message, setMessage] = useState();
  const [adsCategory, setAdsCategory] = useState();

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

  const getData = async () => {
    const newsCategoryDataSnap = await getDocs(collection(db, "ads_category"));
    let data = [{ adsCategory: "Select Ads  Category" }];

    newsCategoryDataSnap.forEach((doc) => {
      data.push(doc.data());
    });
    console.log(data);
    setAdsCategory(data);
    data = [];
  };
  useEffect(() => {
    getData();
  }, []);
  const handleSubmit = async (e) => {
    // console.lot("chala jiii ")
    const requiredFields = [
      "ad_title",
      "category",
      "advertiser_name",
      "contact",
      "url",
      "publish_date",
      "expiry_date",
      "ad_discription",
    ];

    if (
      requiredFields.map((item) => {
        formData?.item === null;
        return true;
      })
    ) {
      setMessage("Please fill the all filed ");
      return;
    }

    console.log("chala");
    return;
    e.preventDefault();
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
    console.log("files has been uploaded dude ");
    try {
      setMessage(null);
    } catch (error) {}
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-center border-b border-gray-400  md:text-3xl text-2xl  font-medium border-t py-1">
        Add Ads Here
      </div>
      <div className="grid md:grid-cols-1   gap-4">
        <div className="">
          <p className="md:text-xl font-bold flex  ">
            {" "}
            <span>Ad Title </span> <span className="text-red-600">*</span>
          </p>
          <input
            onChange={handleChange}
            id="ad_title"
            placeholder="Enter Ad title"
            className="border  border-gray-400 text-xl  focus:border focus:border-blue-500 focus:outline-none rounded-md px-4  py-1 w-full"
            type="text"
          />
        </div>
        <div className=" ">
          <p className="md:text-xl font-bold flex  ">
            {" "}
            <span> Ads Category </span> <span className="text-red-600">*</span>
          </p>
          <select
            onChange={handleChange}
            className="border  border-gray-400 text-xl  focus:border focus:border-blue-500 focus:outline-none rounded-md px-4  py-2 w-full"
            id="category"
          >
            {adsCategory?.map((item, index) => (
              <option value={item}>{item.adsCategory}</option>
            ))}
          </select>
        </div>
        <div className="">
          <p className="md:text-xl font-bold flex  ">
            {" "}
            <span> Advertiser's Name </span>{" "}
            <span className="text-red-600">*</span>
          </p>
          <input
            onChange={handleChange}
            id="advertiser_name"
            placeholder="Enter Advertiser's  Name "
            className="border  border-gray-400 text-xl  focus:border focus:border-blue-500 focus:outline-none rounded-md px-4  py-1 w-full"
            type="text"
          />
        </div>
        <div>
          <p className="md:text-xl font-bold flex  ">
            {" "}
            <span> Contact information </span>{" "}
            <span className="text-red-600">*</span>
          </p>
          <input
            onChange={handleChange}
            id="contact"
            placeholder="Enter Contact info... "
            className="border  border-gray-400 text-xl  focus:border focus:border-blue-500 focus:outline-none rounded-md px-4  py-1 w-full"
            type="Number"
          />
        </div>

        <div className="  ">
          <p className="md:text-xl font-bold flex  ">
            {" "}
            <span> Target URL</span> <span className="text-red-600">*</span>
          </p>
          <input
            onChange={handleChange}
            id="url"
            placeholder=" add_target.com "
            className="border  border-gray-400 text-xl  focus:border focus:border-blue-500 focus:outline-none rounded-md px-4  py-1 w-full"
            type="text"
          />
        </div>
        <div>
          <p className="md:text-xl font-bold flex  ">
            {" "}
            <span> Publish Date </span> <span className="text-red-600">*</span>
          </p>
          <input
            onChange={handleChange}
            id="publish_date"
            placeholder="Enter Category "
            className="border lowercase border-gray-400 text-xl  focus:border focus:border-blue-500 focus:outline-none rounded-md px-4  py-1 w-full"
            type="date"
          />
        </div>
        <div>
          <p className="md:text-xl font-bold flex  ">
            {" "}
            <span>Expiry Date </span> <span className="text-red-600">*</span>
          </p>
          <input
            onChange={handleChange}
            id="expiry_date"
            placeholder="Enter Category "
            className="border lowercase border-gray-400 text-xl  focus:border focus:border-blue-500 focus:outline-none rounded-md px-4  py-1 w-full"
            type="date"
          />
        </div>
        <div className="">
          <p className="md:text-xl font-bold flex  ">
            {" "}
            <span> Ad Images </span> <span className="text-red-600">*</span>
          </p>
          <input
            onChange={handleFiles}
            id="files"
            placeholder="Enter Category"
            className="border lowercase border-gray-400 text-xl focus:border focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
            type="file"
            multiple
          />
        </div>

        <div className="">
          <p className="md:text-xl font-bold flex  ">
            {" "}
            <span> Ad Description</span> <span className="text-red-600">*</span>
          </p>
          <textarea
            onChange={handleChange}
            placeholder="Enter Ad Discription  "
            className="border  border-gray-400 text-xl  focus:border focus:border-blue-500 focus:outline-none rounded-md px-4  py-1 w-full"
            id="ad_discription"
            cols="30"
            rows="4"
          ></textarea>
        </div>
      </div>
      <div className="flex justify-center ">
        <Button
          onClick={handleSubmit}
          className="w-[50%]"
          colorScheme="teal"
          variant="solid"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default page;
