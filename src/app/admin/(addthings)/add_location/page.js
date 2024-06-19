"use client";
import { db } from "@/config/firebase.config";
import { Button, Input, FormControl, FormLabel } from "@chakra-ui/react";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CreateLocationPage = () => {
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
    const requiredFields = ["name", "latitude", "longitude"];

    for (let field of requiredFields) {
      if (!formData[field]) {
        setMessage(`Please fill the ${field} field`);
        return;
      }
    }

    try {
      await addDoc(collection(db, "locations"), formData);
      setMessage("Location created successfully");
      router.push("/admin/locations");
    } catch (error) {
      setMessage("Error creating location");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center border-b border-gray-400 md:text-3xl text-2xl font-medium border-t py-1">
        Add New Location
      </div>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-1 gap-4">
        <FormControl>
          <FormLabel>Location Name</FormLabel>
          <Input
            onChange={handleChange}
            id="name"
            placeholder="Enter Location Name"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Latitude</FormLabel>
          <Input
            onChange={handleChange}
            id="latitude"
            placeholder="Enter Latitude"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Longitude</FormLabel>
          <Input
            onChange={handleChange}
            id="longitude"
            placeholder="Enter Longitude"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </FormControl>
        {message && <div className="text-red-600">{message}</div>}
        <div className="flex justify-center">
          <Button type="submit" className="w-[50%]" colorScheme="teal" variant="solid">
            Create Location
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateLocationPage;
