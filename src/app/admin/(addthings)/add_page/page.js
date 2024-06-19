"use client";
import { db } from "@/config/firebase.config";
import { Button, Input, FormControl, FormLabel, Textarea, Select } from "@chakra-ui/react";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CreatePage = () => {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = ["title", "slug", "metaDescription", "metaKeywords", "language", "pageContent"];

    for (let field of requiredFields) {
      if (!formData[field]) {
        setMessage(`Please fill the ${field} field`);
        return;
      }
    }

    try {
      const docRef = await addDoc(collection(db, "pages"), { ...formData, icon: file?.name });
      setMessage("Page created successfully");
      router.push("/admin/pages");
    } catch (error) {
      setMessage("Error creating page");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center border-b border-gray-400 md:text-3xl text-2xl font-medium border-t py-1">
        Add New Page
      </div>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-1 gap-4">
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            onChange={handleChange}
            id="title"
            placeholder="Enter Title"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Slug</FormLabel>
          <Input
            onChange={handleChange}
            id="slug"
            placeholder="Enter Slug"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Meta Description</FormLabel>
          <Textarea
            onChange={handleChange}
            id="metaDescription"
            placeholder="Enter Meta Description"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Meta Keywords</FormLabel>
          <Input
            onChange={handleChange}
            id="metaKeywords"
            placeholder="Enter Meta Keywords"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Language</FormLabel>
          <Select
            onChange={handleChange}
            id="language"
            placeholder="Select Language"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            {/* Add more languages as needed */}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Page Icon</FormLabel>
          <Input
            onChange={handleFileChange}
            type="file"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Page Content</FormLabel>
          <Textarea
            onChange={handleChange}
            id="pageContent"
            placeholder="Enter Page Content"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </FormControl>
        {message && <div className="text-red-600">{message}</div>}
        <div className="flex justify-center">
          <Button type="submit" className="w-[50%]" colorScheme="teal" variant="solid">
            Create Page
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePage;
