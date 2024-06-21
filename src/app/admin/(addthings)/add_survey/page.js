"use client";

import { db } from "@/config/firebase.config";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { Button, Input, Select, Textarea, VStack } from "@chakra-ui/react";

const AddSurvey = () => {
  const [language, setLanguage] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([{ text: "", votes: 0 }]);

  const handleAddOption = () => {
    setOptions([...options, { text: "", votes: 0 }]);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = options.slice();
    newOptions[index].text = value;
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
      setLanguage("");
      setQuestion("");
      setOptions([{ text: "", votes: 0 }]);
    } catch (error) {
      console.error("Error adding survey: ", error);
    }
  };

  return (
    <VStack spacing={6} className="space-y-6">
      <div className="flex justify-center border-b border-gray-400 md:text-3xl text-2xl font-medium border-t py-1">
        Add New Survey
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 w-full px-4">
        <div>
          <p className="md:text-xl font-bold flex">
            Language <span className="text-red-600">*</span>
          </p>
          <Select
            placeholder="Select Language"
            value={language}
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
            value={question}
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
              value={option.text}
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
    </VStack>
  );
};

export default AddSurvey;
