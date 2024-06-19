"use client";
import { db } from "@/config/firebase.config";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const ListLanguages = () => {
  const [languages, setLanguages] = useState([]);
  const router = useRouter();

  const fetchLanguages = async () => {
    const languagesSnap = await getDocs(collection(db, "languages"));
    let languagesData = [];

    languagesSnap.forEach((doc) => {
      languagesData.push({ id: doc.id, ...doc.data() });
    });
    setLanguages(languagesData);
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "languages", id));
    setLanguages(languages.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between border-b border-gray-400 md:text-3xl text-2xl font-medium border-t py-1">
        <span>Languages List</span>
        <Button
          onClick={() => router.push("/admin/add_language")}
          colorScheme="teal"
          variant="solid"
        >
          Add New Language
        </Button>
      </div>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Display Name</Th>
            <Th>Code</Th>
            <Th>RTL</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {languages.map((language) => (
            <Tr key={language.id}>
              <Td>{language.name}</Td>
              <Td>{language.displayName}</Td>
              <Td>{language.code}</Td>
              <Td>{language.isRTL ? "Yes" : "No"}</Td>
              <Td>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleDelete(language.id)}
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

export default ListLanguages;
