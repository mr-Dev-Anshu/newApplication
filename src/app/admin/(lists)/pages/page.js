"use client";
import { db } from "@/config/firebase.config";
import { Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ListPages = () => {
  const [pages, setPages] = useState([]);
  const router = useRouter();

  const fetchPages = async () => {
    const pagesSnap = await getDocs(collection(db, "pages"));
    let pagesData = [];

    pagesSnap.forEach((doc) => {
      pagesData.push({ id: doc.id, ...doc.data() });
    });
    setPages(pagesData);
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "pages", id));
    setPages(pages.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between border-b border-gray-400 md:text-3xl text-2xl font-medium border-t py-1">
        <span>Pages List</span>
        <Button
          onClick={() => router.push("/admin/add_page")}
          colorScheme="teal"
          variant="solid"
        >
          Add New Page
        </Button>
      </div>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Slug</Th>
            <Th>Language</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {pages.map((item) => (
            <Tr key={item.id}>
              <Td>{item.title}</Td>
              <Td>{item.slug}</Td>
              <Td>{item.language}</Td>
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

export default ListPages;
