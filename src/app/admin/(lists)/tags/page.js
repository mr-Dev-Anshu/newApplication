"use client";
import { db } from "@/config/firebase.config";
import { Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const TagListPage = () => {
  const [tags, setTags] = useState([]);
  const router = useRouter();

  const fetchTags = async () => {
    const tagSnap = await getDocs(collection(db, "tags"));
    let tagData = [];

    tagSnap.forEach((doc) => {
      tagData.push({ id: doc.id, ...doc.data() });
    });
    setTags(tagData);
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "tags", id));
    setTags(tags.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between border-b border-gray-400 md:text-3xl text-2xl font-medium border-t py-1">
        <span>Tag List</span>
        <Button
          onClick={() => router.push("/admin/add_tags")}
          colorScheme="teal"
          variant="solid"
        >
          Create Tag
        </Button>
      </div>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tags.map((item) => (
            <Tr key={item.id}>
              <Td>{item.name}</Td>
              <Td>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleDelete(item.id)}
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

export default TagListPage;
