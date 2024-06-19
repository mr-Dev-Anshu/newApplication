"use client";
import { db } from "@/config/firebase.config";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const ListSurveys = () => {
  const [surveys, setSurveys] = useState([]);
  const router = useRouter();
  const fetchSurveys = async () => {
    const surveysSnap = await getDocs(collection(db, "surveys"));
    let surveysData = [];

    surveysSnap.forEach((doc) => {
      surveysData.push({ id: doc.id, ...doc.data() });
    });
    setSurveys(surveysData);
  };
  useEffect(() => {
    fetchSurveys();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "surveys", id));
    setSurveys(surveys.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between border-b border-gray-400 md:text-3xl text-2xl font-medium border-t py-1">
        <span>Surveys List</span>
        <Button
          onClick={() => router.push("/admin/add_survey")}
          colorScheme="teal"
          variant="solid"
        >
          Add New Survey
        </Button>
      </div>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Language</Th>
            <Th>Question</Th>
            <Th>Options</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {surveys.map((survey) => (
            <Tr key={survey.id}>
              <Td>{survey.language}</Td>
              <Td>{survey.question}</Td>
              <Td>{survey.options.join(", ")}</Td>
              <Td>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleDelete(survey.id)}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default ListSurveys;
