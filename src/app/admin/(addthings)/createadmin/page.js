"use client";
import { db } from "@/config/firebase.config";
import { Button, Input, Select, FormControl, FormLabel } from "@chakra-ui/react";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CreateAdminPage = () => {
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
    const requiredFields = ["name", "email", "role"];

    for (let field of requiredFields) {
      if (!formData[field]) {
        setMessage(`Please fill the ${field} field`);
        return;
      }
    }

    try {
      await addDoc(collection(db, "admin"), formData);
      setMessage("Admin created successfully");
      router.push("/admin/admins");
    } catch (error) {
      setMessage("Error creating admin");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center border-b border-gray-400 md:text-3xl text-2xl font-medium border-t py-1">
        Create Admin
      </div>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-1 gap-4">
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            onChange={handleChange}
            id="name"
            placeholder="Enter Admin Name"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            onChange={handleChange}
            id="email"
            placeholder="Enter Admin Email"
            type="email"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            onChange={handleChange}
            id="password"
            placeholder="Enter Admin Password"
            type="password"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Role</FormLabel>
          <Select
            onChange={handleChange}
            id="role"
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-2 w-full"
          >
            <option value="">Select Role</option>
            <option value="super_admin">Super Admin</option>
            <option value="admin">Admin</option>
          </Select>
        </FormControl>
        {message && <div className="text-red-600">{message}</div>}
        <div className="flex justify-center">
          <Button type="submit" className="w-[50%]" colorScheme="teal" variant="solid">
            Create Admin
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateAdminPage;
