"use client";
import { db } from "@/config/firebase.config";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { Button, Input, Select, Textarea } from "@chakra-ui/react";

const AddSurvey = () => {
  const [language, setLanguage] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = options.slice();
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const surveyData = {
      language,
      question,
      options,
    };

    try {
      await addDoc(collection(db, "surveys"), surveyData);
      alert("Survey added successfully!");
    } catch (error) {
      console.error("Error adding survey: ", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center border-b border-gray-400 md:text-3xl text-2xl font-medium border-t py-1">
        Add New Survey
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            {/* Add more options as needed */}
          </Select>
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            Question <span className="text-red-600">*</span>
          </p>
          <Textarea
            placeholder="Enter Question"
            onChange={(e) => setQuestion(e.target.value)}
            required
            className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          />
        </div>
        <div>
          <p className="md:text-xl font-bold flex">
            Options <span className="text-red-600">*</span>
          </p>
          {options.map((option, index) => (
            <Input
              key={index}
              placeholder={`Enter Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              required
              className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full mt-2"
            />
          ))}
          <Button
            onClick={handleAddOption}
            colorScheme="teal"
            variant="outline"
            className="mt-2"
          >
            Add Another Option
          </Button>
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

export default AddSurvey;
