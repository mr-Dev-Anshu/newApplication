"use client";
import { db } from "@/config/firebase.config";
import { Button, Input, FormControl, FormLabel } from "@chakra-ui/react";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { uploadImage } from "@/controller/uploadFiles";

const CreateBreakingNewsPage = () => {
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState(null);
  const [file , setFile ] = useState() ; 

  const handleFile = (e) => {
       setFile(e.target.files[0]) ; 
  }
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = ["title", "description"];

    for (let field of requiredFields) {
      if (!formData[field]) {
        setMessage(`Please fill the ${field} field`);
        return;
      }
    }
      const url =  await uploadImage(file)
      formData.heading_image = url ; 
    try {
      await addDoc(collection(db, "breaking_news"), formData);
      setMessage("Breaking news created successfully");
      router.push("/admin/breaking_news");
    } catch (error) {
      setMessage("Error creating breaking news");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center border-b border-gray-400 md:text-3xl text-2xl font-medium border-t py-1">
        Create Breaking News
      </div>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-1 gap-4">
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            onChange={handleChange}
            id="title"
            placeholder="Enter Breaking News Title"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Input
            onChange={handleChange}
            id="description"
            placeholder="Enter Breaking News Description"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Heading Image </FormLabel>
          <Input
            onChange={handleFile}
            id="bn_heading"
            placeholder="Enter Breaking News Description"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
            type="file"
          />
        </FormControl>
        {message && <div className="text-red-600">{message}</div>}
        <div className="flex justify-center">
          <Button
            type="submit"
            className="w-[50%]"
            colorScheme="teal"
            variant="solid"
          >
            Create Breaking News
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateBreakingNewsPage;
