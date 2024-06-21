"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import {
  Box,
  Button,
  HStack,
  Progress,
  Radio,
  RadioGroup,
  Text,
  VStack,
  Spinner,
  SimpleGrid
} from "@chakra-ui/react";

const SurveysPage = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    const fetchSurveys = async () => {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "surveys"));
      let surveysData = [];
      querySnapshot.forEach((doc) => {
        surveysData.push({ id: doc.id, ...doc.data() });
      });
      setSurveys(surveysData);
      setLoading(false);
    };

    fetchSurveys();
  }, []);

  const handleVote = async (surveyId) => {
    const selectedOption = selectedOptions[surveyId];
    if (!selectedOption) return;

    const surveyDoc = doc(collection(db, "surveys"), surveyId);
    const surveySnap = await getDoc(surveyDoc);

    if (surveySnap.exists()) {
      const data = surveySnap.data();
      const updatedOptions = data.options.map((option, index) => {
        if (index === parseInt(selectedOption)) {
          return { ...option, votes: (option.votes || 0) + 1 };
        }
        return option;
      });

      await updateDoc(surveyDoc, { options: updatedOptions });
      setSurveys((prevSurveys) =>
        prevSurveys.map((survey) =>
          survey.id === surveyId ? { ...survey, options: updatedOptions } : survey
        )
      );
    }
  };

  if (loading) {
    return (
      <VStack justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </VStack>
    );
  }

  return (
    <VStack spacing={6} p={4} w="full">
      {surveys.length === 0 ? (
        <Text>No surveys available.</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full">
          {surveys.map((survey) => (
            <Box
              key={survey.id}
              p={5}
              shadow="md"
              borderWidth="1px"
              borderRadius="md"
              w="full"
              maxW="600px"
            >
              <Text fontSize="xl" fontWeight="bold" mb={4}>
                {survey.question}
              </Text>
              <RadioGroup
                onChange={(value) =>
                  setSelectedOptions((prev) => ({ ...prev, [survey.id]: value }))
                }
                value={selectedOptions[survey.id] || ""}
              >
                <VStack align="start" spacing={3}>
                  {survey.options.map((option, index) => (
                    <Radio key={index} value={index.toString()}>
                      {option.text}
                    </Radio>
                  ))}
                </VStack>
              </RadioGroup>
              <Button
                mt={4}
                colorScheme="teal"
                onClick={() => handleVote(survey.id)}
                isDisabled={!selectedOptions[survey.id]}
              >
                Submit
              </Button>
              <Box mt={4}>
                <Text fontSize="xl" fontWeight="bold" mb={4}>
                  Results
                </Text>
                {survey.options.map((option, index) => {
                  const votes = option.votes || 0;
                  const totalVotes = survey.options.reduce((acc, opt) => acc + (opt.votes || 0), 0);
                  const percentage = totalVotes > 0 ? ((votes / totalVotes) * 100).toFixed(2) : 0;
                  return (
                    <Box key={index} mb={4}>
                      <Text>{option.text}</Text>
                      <HStack>
                        <Progress value={percentage} size="sm" flex="1" />
                        <Text>{percentage}%</Text>
                      </HStack>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </VStack>
  );
};

export default SurveysPage;
