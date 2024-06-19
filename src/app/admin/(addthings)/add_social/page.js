"use client";
import { db } from "@/config/firebase.config";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { Button, Input, Select } from "@chakra-ui/react";

const AddSocial = () => {
  const [platform, setPlatform] = useState("");
  const [link, setLink] = useState("");
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const socialData = {
      platform,
      link,
      isActive,
    };

    try {
      await addDoc(collection(db, "social_media"), socialData);
      alert("Social media link added successfully!");
      setPlatform("");
      setLink("");
      setIsActive(true);
    } catch (error) {
      console.error("Error adding social media link: ", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center border-b border-gray-400 md:text-3xl text-2xl font-medium border-t py-1">
        Add New Social Media Link
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <p className="md:text-xl font-bold flex">
            Platform <span className="text-red-600">*</span>
          </p>
          <Select
            placeholder="Select Platform"
            onChange={(e) => setPlatform(e.target.value)}
            value={platform}
            required
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          >
            <option value="Facebook">Facebook</option>
            <option value="Twitter">Twitter</option>
            <option value="Instagram">Instagram</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="YouTube">YouTube</option>
            <option value="Other">Other</option>
          </Select>
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            Link <span className="text-red-600">*</span>
          </p>
          <Input
            placeholder="Enter Link"
            onChange={(e) => setLink(e.target.value)}
            value={link}
            required
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            Active
          </p>
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="text-xl"
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

export default AddSocial;
