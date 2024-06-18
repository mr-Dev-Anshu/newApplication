"use client";
import { db } from "@/config/firebase.config";
import { Button, Input } from "@chakra-ui/react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { uploadFiles, uploadImage } from "@/controller/uploadFiles";
const page = () => {
  const [toggle, setToggle] = useState();
  const [formData, setFormData] = useState();
  const [files, setFiles] = useState();
  const [file, setFile] = useState();
  const [message, setMessage] = useState();
  const [newsCategory, setNewsCategory] = useState();

  const getData = async () => {
    const newsCategoryDataSnap = await getDocs(collection(db, "news_category"));
    let data = [{newsCategory:"Select News Category"}];

    newsCategoryDataSnap.forEach((doc) => {
      data.push(doc.data());
    });
    console.log(data);
    setNewsCategory(data);
    data = [];
  };

  useEffect(() => {
    getData();
  }, []);

  const handelToggle = () => {
    setToggle(!toggle);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    console.log(formData);
  };

  const handleFilesChange = (e) => {
    setFiles(e.target.files);
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    setMessage(null);

    if (!files || !file) {
      console.log("file is not there ");
      setMessage("Please select the Images ");
      return;
    }

    // return

    e.preventDefault();
    const imageUrl = await uploadImage(file);
    formData.heading_image = imageUrl;
    const docRef = await addDoc(collection(db, "news_data"), {
      formData,
    });
    console.log(docRef.id);
    const id = docRef.id;
    await uploadFiles(files);
    console.log("Sab thik hai bro :::::) ");
    handelToggle();
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-center border-b border-gray-400  md:text-3xl text-2xl  font-medium border-t py-2 mx-2">
          Add News Here
        </div>
        <div className="grid md:grid-cols-1 gap-4">
          <div className="">
            <p className="md:text:xl font-bold flex  ">
              {" "}
              <span>News title </span> <span className="text-red-600">*</span>
            </p>
            <input
              onChange={handleChange}
              required
              id="title"
              placeholder="Enter title here "
              className="border  border-gray-400 text-xl  focus:border focus:border-blue-500 focus:outline-none rounded-md px-4  py-2 w-full"
              type="text"
            />
          </div>
          <div className="">
            <p className="md:text:xl font-bold flex  ">
              {" "}
              <span>Author's Name </span>{" "}
              <span className="text-red-600">*</span>
            </p>
            <input
              onChange={handleChange}
              required
              id="author"
              placeholder="Enter Author's  Name "
              className="border  border-gray-400 text-xl  focus:border focus:border-blue-500 focus:outline-none rounded-md px-4  py-1 w-full"
              type="text"
            />
          </div>
          <div>
            <p className="md:text:xl font-bold flex  ">
              {" "}
              <span>News Category </span>{" "}
              <span className="text-red-600">*</span>
            </p>

            <select
              onChange={handleChange}
              className="border  border-gray-400 text-xl  focus:border focus:border-blue-500 focus:outline-none rounded-md px-4  py-2 w-full"
              id="category"
            >
              {newsCategory?.map((item, index) => (
                <option value={item}>{item.newsCategory}</option>
              ))}
            </select>
          </div>
          <div className="">
            <p className="md:text:xl font-bold flex  ">
              {" "}
              <span> News Body </span> <span className="text-red-600">*</span>
            </p>
            <textarea
              required
              onChange={handleChange}
              placeholder="Enter News Body "
              className="border  border-gray-400 text-xl  focus:border focus:border-blue-500 focus:outline-none rounded-md px-4  py-2 w-full"
              id="news_body"
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <div className="">
            <p className="md:text:xl font-bold flex">
              {" "}
              <span> News Summary </span>{" "}
              <span className="text-red-600">*</span>
            </p>
            <textarea
              onChange={handleChange}
              required
              placeholder="Enter News Summary "
              className="border  border-gray-400 text-xl  focus:border focus:border-blue-500 focus:outline-none rounded-md px-4  py-2 w-full"
              id="news_summry"
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <div className=" ">
            <p className="md:text:xl font-bold flex  ">
              {" "}
              <span> Publish Date </span>{" "}
              <span className="text-red-600">*</span>
            </p>
            <input
              onChange={handleChange}
              required
              id="publish_date"
              placeholder="Enter Category "
              className="border lowercase border-gray-400 text-xl  focus:border focus:border-blue-500 focus:outline-none rounded-md px-4  py-2 w-full"
              type="date"
            />
          </div>
          <div className="">
            <p className="md:text:xl font-bold flex  ">
              {" "}
              <span>Expiry Date </span> <span className="text-red-600">*</span>
            </p>
            <input
              onChange={handleChange}
              required
              id="expiry_date"
              placeholder="Enter Category "
              className="border lowercase border-gray-400 text-xl  focus:border focus:border-blue-500 focus:outline-none rounded-md px-4  py-2 w-full"
              type="date"
            />
          </div>
          <div className="">
            <p className="md:text:xl font-bold flex  ">
              {" "}
              <span>News Heading Images </span>{" "}
              <span className="text-red-600">*</span>
            </p>
            <input
              onChange={handleFileChange}
              required
              id="Heading_image"
              placeholder="Enter Category"
              className="border lowercase border-gray-400 text-xl focus:border focus:border-blue-500 focus:outline-none rounded-md px-4 py-2 w-full"
              type="file"
            />
          </div>
          <div className="">
            <p className="md:text:xl font-bold flex  ">
              {" "}
              <span>News Releted Images </span>{" "}
              <span className="text-red-600">*</span>
            </p>
            <input
              onChange={handleFilesChange}
              required
              id="all_image"
              placeholder="Enter Category"
              className="border lowercase border-gray-400 text-xl focus:border focus:border-blue-500 focus:outline-none rounded-md px-4 py-2 w-full"
              type="file"
              multiple
            />
          </div>
        </div>
        <div className="flex justify-center ">
          <Button
            onClick={handelToggle}
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
                    <p className="text-red-500 font-medium text-xl">
                      {message}
                    </p>
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
                        onClick={() => handelToggle()}
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
    </div>
  );
};

export default page;
