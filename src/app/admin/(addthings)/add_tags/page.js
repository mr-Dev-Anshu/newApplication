"use client";
import { db } from "@/config/firebase.config";
import { Button, Input, FormControl, FormLabel } from "@chakra-ui/react";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CreateTagPage = () => {
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = ["name"];

    for (let field of requiredFields) {
      if (!formData[field]) {
        setMessage(`Please fill the ${field} field`);
        return;
      }
    }

    try {
      await addDoc(collection(db, "tags"), formData);
      setMessage("Tag created successfully");
      router.push("/admin/tags");
    } catch (error) {
      setMessage("Error creating tag");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center border-b border-gray-400 md:text-3xl text-2xl font-medium border-t py-1">
        Create Tag
      </div>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-1 gap-4">
        <FormControl>
          <FormLabel>Tag Name</FormLabel>
          <Input
            onChange={handleChange}
            id="name"
            placeholder="Enter Tag Name"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </FormControl>
        {message && <div className="text-red-600">{message}</div>}
        <div className="flex justify-center">
          <Button type="submit" className="w-[50%]" colorScheme="teal" variant="solid">
            Create Tag
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTagPage;
