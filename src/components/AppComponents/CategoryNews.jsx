// components/CategoryNews.js
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import {
  Box,
  Image,
  Text,
  VStack,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";

const CategoryNews = ({ category }) => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsData = async () => {
      setLoading(true);
      const q = query(
        collection(db, "news_data"),
        where("formData.category", "==", category)
      );
      const newsDataSnap = await getDocs(q);
      let data = [];
      newsDataSnap.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data().formData });
      });
      setNewsData(data);
      setLoading(false);
    };

    fetchNewsData();
  }, [category]);

  if (loading) {
    return (
      <VStack justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </VStack>
    );
  }

  return (
    <VStack spacing={6} p={4} align="stretch">
      {newsData.length === 0 ? (
        <Text>No news available for this category.</Text>
      ) : (
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={6} w="full">
          {newsData.map((news) => (
            <Box
              key={news.id}
              p={3}
              shadow="md"
              borderWidth="1px"
              borderRadius="md"
              overflow="hidden"
              w="full"
            >
              <Link href={`/news/newsid/?id=${news.id}`}>
                <Image
                  src={news.heading_image}
                  alt={news.title}
                  height="150px"
                  width="full"
                  objectFit="cover"
                  borderRadius="md"
                />
                <Text mt={2} fontSize="md" fontWeight="bold">
                  {news.title}
                </Text>
                <Text mt={1} fontSize="sm">
                  {news.news_summry}
                </Text>
                <Text mt={2} fontSize="xs" color="gray.500">
                  {news.author} - {news.publish_date}
                </Text>
              </Link>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </VStack>
  );
};

export default CategoryNews;
