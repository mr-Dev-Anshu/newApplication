"use client";
import { db } from "@/config/firebase.config";
import { Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const BreakingNewsListPage = () => {
  const [breakingNews, setBreakingNews] = useState([]);
  const router = useRouter();

  const fetchBreakingNews = async () => {
    const newsSnap = await getDocs(collection(db, "breaking_news"));
    let newsData = [];

    newsSnap.forEach((doc) => {
      newsData.push({ id: doc.id, ...doc.data() });
    });
    setBreakingNews(newsData);
  };

  useEffect(() => {
    fetchBreakingNews();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "breaking_news", id));
    setBreakingNews(breakingNews.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between border-b border-gray-400 md:text-3xl text-2xl font-medium border-t py-1">
        <span>Breaking News List</span>
        <Button
          onClick={() => router.push("/admin/add_breakingnews")}
          colorScheme="teal"
          variant="solid"
        >
          Create Breaking News
        </Button>
      </div>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Description</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {breakingNews.map((item) => (
            <Tr key={item.id}>
              <Td>{item.title}</Td>
              <Td>{item.description}</Td>
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

export default BreakingNewsListPage;
