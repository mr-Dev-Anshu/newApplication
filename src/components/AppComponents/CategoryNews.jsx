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
  Button,
  HStack,
} from "@chakra-ui/react";

const CategoryNews = ({ category }) => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = newsData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(newsData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <VStack spacing={6} p={2} align="stretch">
      {currentItems.length === 0 ? (
        <Text>No news available for this category.</Text>
      ) : (
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={6} w="full">
          {currentItems.map((news) => (
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
      <HStack spacing={2} mt={4} justify="center">
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            isDisabled={currentPage === index + 1}
          >
            {index + 1}
          </Button>
        ))}
      </HStack>
    </VStack>
  );
};

export default CategoryNews;
