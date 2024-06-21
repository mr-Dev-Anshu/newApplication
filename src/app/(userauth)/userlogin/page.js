"use client";
import { useState } from "react";
import { login } from "@/action";
import Swal  from "sweetalert2" ; 
import Link from "next/link";
const Page = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
 const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    Swal.fire({
      title: "Loading...",
      text: "Please wait while we process your request.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });


    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    Swal.fire
    if (
      !email ||
      !password ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      setErrorMessage("Please fill in the credentials!");
      setLoading(false);
      Swal.fire({
        title: "Error!",
        text: "All fields are required.",
        icon: "error",
      });
      return;
    }
    try {
      await login(formData);
      Swal.fire({
        title: "Good job!",
        text: "You are successfully logged in!",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
      setErrorMessage(error?.message);
      Swal.fire({
        title: "Error!",
        text: error?.message,
        icon: "error",
      });
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-20  md:mt-24  ">
      <form
        onSubmit={handleLogin}
        className="md:w-[40%] border border-gray-800 shadow-2xl flex justify-center flex-col items-center md:py-12 py-6 px-4 space-y-6 rounded-md"
      >
        <p className="text-2xl md:text-3xl   font-medium">Login Here</p>
        <input
          className="bg-transparent focus:outline border border-gray-600 px-6 py-2 placeholder:text-gray-500 placeholder:text-xl placeholder:font-bold rounded-md md:w-[70%]"
          placeholder="Enter User id"
          type="email"
          name="email"
        />
        <input
          className="bg-transparent focus:outline border border-gray-600 px-6 py-2 placeholder:text-gray-500 placeholder:text-xl placeholder:font-bold rounded-md md:w-[70%]"
          placeholder="Enter Password"
          type="password"
          name="password"
        />
        <button
          className="bg-green-700 py-2 px-4 rounded-md md:w-[70%] w-[90%]"
          type="submit"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
      <p>Don't have an Account <Link className="text-red-600 font-bold text-xl " href={"usersignup"}>Signup</Link> </p>
      {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
    </div>
  );
};

export default Page;