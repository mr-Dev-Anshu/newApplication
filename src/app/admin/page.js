"use client";
import React from "react";
import { ChakraProvider, Box, SimpleGrid, Text, theme } from "@chakra-ui/react";
import CountUp from "react-countup";
import { TbCategory } from "react-icons/tb";

const Dashboard = () => {
  const stats = [
    { label: "Total Categories", value: 5 },
    { label: "Total News", value: 13 },
    { label: "Total Breaking News", value: 5 },
    { label: "Total Reels", value: 14 },
    { label: "Total Sliders", value: 11 },
    { label: "Total Languages", value: 4 },
    { label: "Total Locations", value: 5 },
    { label: "Total Tags", value: 31 },
    { label: "Total Admins", value: 2 },
    { label: "Total Users", value: 5 },
    { label: "Total Pages", value: 2 },
    { label: "Total Emails", value: 5 },
  ];

  return (
    <div>
      <p className="md:text-3xl font-bold ">DasshBoard</p>
      <ChakraProvider theme={theme}>
        <Box p={5}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
            {stats.map((stat, index) => (
              <Box
                key={index}
                p={5}
                shadow="md"
                borderWidth="1px"
                borderRadius="lg"
                textAlign="center"
              >
                <div>
                  <div>
                    <Text fontSize="2xl" fontWeight="bold">
                      <CountUp start={0} end={stat.value} duration={2.75} />
                    </Text>
                    <Text mt={2} color="gray.500">
                      {stat.label}
                    </Text>
                  </div>
                </div>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </ChakraProvider>
    </div>
  );
};

export default Dashboard;
