"use client";
import { db } from "@/config/firebase.config";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { Button, Checkbox, Input } from "@chakra-ui/react";

const AddLanguage = () => {
  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [code, setCode] = useState("");
  const [flag, setFlag] = useState(null);
  const [isRTL, setIsRTL] = useState(false);

  const handleFileChange = (e) => {
    setFlag(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const languageData = {
      name,
      displayName,
      code,
      isRTL,
      flag: flag ? flag.name : "",
    };

    try {
      const docRef = await addDoc(collection(db, "languages"), languageData);
      // Upload the flag image if it exists
      if (flag) {
        const storageRef = ref(storage, `flags/${docRef.id}`);
        await uploadBytes(storageRef, flag);
      }
      alert("Language added successfully!");
    } catch (error) {
      console.error("Error adding language: ", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center border-b border-gray-400 md:text-3xl text-2xl font-medium border-t py-1">
        Add New Language
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <p className="md:text-xl font-bold flex">
            Language Name <span className="text-red-600">*</span>
          </p>
          <Input
            placeholder="Enter Language Name"
            onChange={(e) => setName(e.target.value)}
            required
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            Display Name (Display in app/web) <span className="text-red-600">*</span>
          </p>
          <Input
            placeholder="Enter Display Name"
            onChange={(e) => setDisplayName(e.target.value)}
            required
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            Code <span className="text-red-600">*</span>
          </p>
          <Input
            placeholder="Enter Code"
            onChange={(e) => setCode(e.target.value)}
            required
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            Flag
          </p>
          <Input
            type="file"
            onChange={handleFileChange}
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            Is RTL?
          </p>
          <Checkbox
            onChange={(e) => setIsRTL(e.target.checked)}
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

export default AddLanguage;
