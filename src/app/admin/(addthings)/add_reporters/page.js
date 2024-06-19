"use client";
import { db } from "@/config/firebase.config";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { Button, Input, Select, Textarea } from "@chakra-ui/react";
 import { useRouter } from "next/navigation";

const CreateReporter = () => {
  const [fullName, setFullName] = useState("");
  const [nickName, setNickName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessCategory, setAccessCategory] = useState("");
  const [sex, setSex] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("Afghanistan");
  const [zip, setZip] = useState("");
  const [verificationDocId, setVerificationDocId] = useState("");
  const [verificationType, setVerificationType] = useState("");
  const [about, setAbout] = useState("");
    const router = useRouter() ; 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const reporterData = {
      fullName,
      nickName,
      mobile,
      email,
      password,
      accessCategory,
      sex,
      bloodGroup,
      birthDate,
      addressLine1,
      addressLine2,
      city,
      state,
      country,
      zip,
      verificationDocId,
      verificationType,
      about,
    };

    try {
      await addDoc(collection(db, "reporters"), reporterData);
      alert("Reporter added successfully!");
      setFullName("");
      setNickName("");
      setMobile("");
      setEmail("");
      setPassword("");
      setAccessCategory("");
      setSex("");
      setBloodGroup("");
      setBirthDate("");
      setAddressLine1("");
      setAddressLine2("");
      setCity("");
      setState("");
      setCountry("Afghanistan");
      setZip("");
      setVerificationDocId("");
      setVerificationType("");
      setAbout("");
    } catch (error) {
      console.error("Error adding reporter: ", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center border-b border-gray-400 md:text-3xl text-2xl font-medium border-t py-1">
        Create New Reporter
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <p className="md:text-xl font-bold flex">
            Full Name <span className="text-red-600">*</span>
          </p>
          <Input
            placeholder="Enter Full Name"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            required
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            Nick Name
          </p>
          <Input
            placeholder="Enter Nick Name"
            onChange={(e) => setNickName(e.target.value)}
            value={nickName}
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            Mobile
          </p>
          <Input
            placeholder="Enter Mobile Number"
            onChange={(e) => setMobile(e.target.value)}
            value={mobile}
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            Email <span className="text-red-600">*</span>
          </p>
          <Input
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            Password <span className="text-red-600">*</span>
          </p>
          <Input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            Access Category <span className="text-red-600">*</span>
          </p>
          <Input
            placeholder="Enter Access Category"
            onChange={(e) => setAccessCategory(e.target.value)}
            value={accessCategory}
            required
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            Sex
          </p>
          <Select
            placeholder="Select Sex"
            onChange={(e) => setSex(e.target.value)}
            value={sex}
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Select>
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            Blood Group
          </p>
          <Input
            placeholder="Enter Blood Group"
            onChange={(e) => setBloodGroup(e.target.value)}
            value={bloodGroup}
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            Birth Date
          </p>
          <Input
            type="date"
            placeholder="Enter Birth Date"
            onChange={(e) => setBirthDate(e.target.value)}
            value={birthDate}
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            Address Line One
          </p>
          <Input
            placeholder="Enter Address Line One"
            onChange={(e) => setAddressLine1(e.target.value)}
            value={addressLine1}
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            Address Line Two
          </p>
          <Input
            placeholder="Enter Address Line Two"
            onChange={(e) => setAddressLine2(e.target.value)}
            value={addressLine2}
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            City
          </p>
          <Input
            placeholder="Enter City"
            onChange={(e) => setCity(e.target.value)}
            value={city}
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            State
          </p>
          <Input
            placeholder="Enter State"
            onChange={(e) => setState(e.target.value)}
            value={state}
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            Country
          </p>
          <Select
            onChange={(e) => setCountry(e.target.value)}
            value={country}
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          >
            <option value="Afghanistan">Afghanistan</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="India">India</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Other">Other</option>
          </Select>
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            Zip
          </p>
          <Input
            placeholder="Enter Zip Code"
            onChange={(e) => setZip(e.target.value)}
            value={zip}
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            Verification Document Id
          </p>
          <Input
            placeholder="Enter Verification Document Id"
            onChange={(e) => setVerificationDocId(e.target.value)}
            value={verificationDocId}
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            Verification Type
          </p>
          <Select
            placeholder="Select Verification Type"
            onChange={(e) => setVerificationType(e.target.value)}
            value={verificationType}
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          >
            <option value="Passport">Passport</option>
            <option value="Driver License">Driver License</option>
            <option value="National ID">National ID</option>
            <option value="Other">Other</option>
          </Select>
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            About
          </p>
          <Textarea
            placeholder="Enter About Information"
            onChange={(e) => setAbout(e.target.value)}
            value={about}
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

export default CreateReporter;
