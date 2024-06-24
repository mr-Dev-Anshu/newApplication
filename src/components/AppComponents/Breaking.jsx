"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
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

const BreakingNews = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  useEffect(() => {
    const fetchNewsData = async () => {
      setLoading(true);
      const newsDataSnap = await getDocs(collection(db, "breaking_news"));
      let data = [];
      newsDataSnap.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setNewsData(data);
      setLoading(false);
    };
    fetchNewsData();
  }, []);

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
        <Text>No breaking news available.</Text>
      ) : (
        <SimpleGrid columns={[1, 2, 3 ]} spacing={6} w="full">
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

export default BreakingNews;
