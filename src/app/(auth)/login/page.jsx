"use client";

import React, { useContext, useEffect, useState } from "react";

import Cookies from "cookies-js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { db } from "@/config/firebase.config";
import { admin } from "@/context/admin";
const page = () => {
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState();
  const [formData, setFromData] = useState();
  const handleChange = (e) => {
    setFromData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    console.log(formData);
  };

  const navigate = useRouter();
  const { setAdminData } = useContext(admin);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.email.trim() || !formData.password.trim()) {
        Swal.fire({
          title: "Error!",
          text: "All fields are required.",
          icon: "error",
        });
        setLoading(false);
        return;
      }

      Swal.fire({
        title: "Loading...",
        text: "Please wait while we process your request.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const q = query(
        collection(db, "admin"),
        where("email", "==", formData.email)
      );
      const userSnap = await getDocs(q);

      let user;
      userSnap.forEach((doc) => {
        user = doc.data();
      });

      if (!user || user.password !== formData.password) {
        Swal.fire({
          title: "Error!",
          text: "Invalid Password.",
          icon: "error",
        });
        setLoading(false);
        return;
      }

      Cookies.set("email", user.email, {
        expires: 36500,
        path: "/",
        secure: false,
      });

      Swal.fire({
        title: "Good job!",
        text: "You are successfully logged in!",
        icon: "success",
      });

      setAdminData(user);
      navigate.push("/");
    } catch (error) {
      console.log("Error during login:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center md:mt-36    ">
      <div className="grid md:grid-cols-1 gap-4 w-[40%] p-4   shadow-2xl ">
        <div className="flex flex-col space-y-1">
          <label className="text-xl font-medium">
            Enter User Name <span className="text-red-600">*</span>
          </label>
          <input
            onChange={handleChange}
            placeholder="Enter Name of Employee"
            required
            className="py-2 focus:outline-none px-4 border-2 border-gray-300 rounded-md"
            type="text"
            id="email"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-xl font-medium">
            Enter Password <span className="text-red-600">*</span>
          </label>
          <input
            onChange={handleChange}
            required
            placeholder="..........."
            className="py-2 items-center  focus:outline-none px-4 border-2 border-gray-300 rounded-md placeholder:text-2xl"
            id="password"
            type="password"
          />
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleSubmit}
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            disabled={loading}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
        {message && <div className="text-red-600 mt-4">{message}</div>}
      </div>
    </div>
  );
};

export default page;
