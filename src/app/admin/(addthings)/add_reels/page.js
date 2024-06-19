"use client";
import { db, storage } from "@/config/firebase.config";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { Button, Input, Select, Textarea } from "@chakra-ui/react";

const AddReel = () => {
  const [title, setTitle] = useState("");
  const [contentType, setContentType] = useState("");
  const [language, setLanguage] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reelData = {
      title,
      contentType,
      language,
      description,
      image: image ? image.name : "",
    };

    try {
      const docRef = await addDoc(collection(db, "reels"), reelData);
      // Upload the image if it exists
      if (image) {
        const storageRef = ref(storage, `reels/${docRef.id}`);
        await uploadBytes(storageRef, image);
      }
      alert("Reel added successfully!");
    } catch (error) {
      console.error("Error adding reel: ", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center border-b border-gray-400 md:text-3xl text-2xl font-medium border-t py-1">
        Add New Reel
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <p className="md:text-xl font-bold flex">
            Title <span className="text-red-600">*</span>
          </p>
          <Input
            placeholder="Enter Title"
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            Content Type <span className="text-red-600">*</span>
          </p>
          <Select
            placeholder="Select Content Type"
            onChange={(e) => setContentType(e.target.value)}
            required
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          >
            <option value="video">Video</option>
            <option value="image">Image</option>
          </Select>
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            Language <span className="text-red-600">*</span>
          </p>
          <Select
            placeholder="Select Language"
            onChange={(e) => setLanguage(e.target.value)}
            required
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </Select>
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            Image
          </p>
          <Input
            type="file"
            onChange={handleFileChange}
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            Description
          </p>
          <Textarea
            placeholder="Enter Description"
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div className="flex justify-center">
          <Button type="submit" colorScheme="teal" variant="solid">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddReel;
