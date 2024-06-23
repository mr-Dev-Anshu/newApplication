"use client";

import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { Box, Image, Text, HStack, VStack, Spinner, Stack } from "@chakra-ui/react";

const AdSection = ({ category }) => {
  const [adData, setAdData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdData = async () => {
      setLoading(true);
      if (category) {
        const q = query(
          collection(db, "ads_data"), // Assuming your ad collection is called 'ads_data'
          where("category", "==", category)
        );
        const adDataSnap = await getDocs(q);
        let data = [];
        adDataSnap.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setAdData(data);
        setLoading(false);
      }
    };

    fetchAdData();
  }, [category]);

  return (
    <VStack spacing={6} p={4} w="full">
      {loading ? (
        <Spinner size="xl" />
      ) : adData.length === 0 ? (
        <Text>No ads available for this category.</Text>
      ) : (
        adData.map((ad) => (
          <Box
            key={ad.id}
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            w="full"
          >
            <Stack
              spacing={4}
              direction={{ base: "column", md: "row" }}
              align="center"
            >
              <Image
                src={ad.url}
                alt={ad.ad_title}
                boxSize={{ base: "100%", md: "150px" }}
                objectFit="cover"
                borderRadius="md"
              />
              <VStack align="start" spacing={2} w="full">
                <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold">
                  {ad.ad_title}
                </Text>
                <Text fontSize={{ base: "sm", md: "md" }}>
                  {ad.ad_discription}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {ad.advertiser_name} - {ad.publish_date}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Contact: {ad.contact}
                </Text>
              </VStack>
            </Stack>
          </Box>
        ))
      )}
    </VStack>
  );
};

export default AdSection;
