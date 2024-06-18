"use client";
import { db } from "@/config/firebase.config";
import { Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const router = useRouter();

  const fetchNews = async () => {
    const newsSnap = await getDocs(collection(db, "news_data"));
    let newsData = [];

    newsSnap.forEach((doc) => {
      newsData.push({ id: doc.id, ...doc.data().formData });
    });
    setNews(newsData);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "news_data", id));
    setNews(news.filter((item) => item.id !== id));
  };

  const handleView = (id) => {
    router.push(`/news/${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between border-b border-gray-400 md:text-3xl text-2xl font-medium border-t py-1">
        <span>News List</span>
        <Button
          onClick={() => router.push("/admin/add_news")}
          colorScheme="teal"
          variant="solid"
        >
          Add New News
        </Button>
      </div>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Category</Th>
            <Th>Title</Th>
            <Th>Author</Th>
            <Th>Active</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {news.map((item) => (
            <Tr key={item.id}>
              <Td>{item.category}</Td>
              <Td>{item.title}</Td>
              <Td>{item.author}</Td>
              <Td>{item.active ? "Yes" : "No"}</Td>
              <Td>
                <Button
                  size="sm"
                  colorScheme="blue"
                  onClick={() => handleView(item.id)}
                >
                  View
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  ml={2}
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

export default NewsPage;
