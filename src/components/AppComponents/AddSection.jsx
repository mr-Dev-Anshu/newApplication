"use client";

import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { Box, Image, Text, HStack, VStack, Spinner } from "@chakra-ui/react";

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

  // if (loading) {
  //   return (
  //     <VStack justifyContent="center" alignItems="center" height="100vh">
  //       <Spinner size="xl" />
  //     </VStack>
  //   );
  // }

  return (
    <VStack spacing={6} p={4}>
      {adData.length === 0 ? (
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
            <HStack spacing={4}>
              <Image
                src={ad.url}
                alt={ad.ad_title}
                boxSize="150px"
                objectFit="cover"
                borderRadius="md"
              />
              <VStack align="start" spacing={2}>
                <Text fontSize="xl" fontWeight="bold">
                  {ad.ad_title}
                </Text>
                <Text>{ad.ad_discription}</Text>
                <Text fontSize="sm" color="gray.500">
                  {ad.advertiser_name} - {ad.publish_date}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Contact: {ad.contact}
                </Text>
              </VStack>
            </HStack>
          </Box>
        ))
      )}
    </VStack>
  );
};

export default AdSection;
