'use client'
import React from "react";
import {
  ChakraProvider,
  Box,
  SimpleGrid,
  Text,
  theme,
} from "@chakra-ui/react";
import CountUp from "react-countup";
import { TbCategory } from "react-icons/tb";
import { SiPowerpages } from "react-icons/si";
import { GiBreakingChain } from "react-icons/gi";
import { BsCameraReelsFill } from "react-icons/bs";
import { MdAddBox, MdWidgets, MdLogout } from "react-icons/md";
import { FcSurvey } from "react-icons/fc";
import { FaHome, FaComments } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";
import { SlSocialFacebook } from "react-icons/sl";

const Dashboard = () => {
  const stats = [
    { label: "Total Categories", value: 5, icon: <TbCategory size={24} color="blue" /> },
    { label: "Total News", value: 13, icon: <MdAddBox size={24} color="green" /> },
    { label: "Total Breaking News", value: 5, icon: <GiBreakingChain size={24} color="orange" /> },
    { label: "Total Reels", value: 14, icon: <BsCameraReelsFill size={24} color="purple" /> },
    { label: "Total Sliders", value: 11, icon: <MdWidgets size={24} color="teal" /> },
    { label: "Total Languages", value: 4, icon: <FcSurvey size={24} color="pink" /> },
    { label: "Total Locations", value: 5, icon: <FaHome size={24} color="cyan" /> },
    { label: "Total Tags", value: 31, icon: <FaComments size={24} color="yellow" /> },
    { label: "Total Admins", value: 2, icon: <GrUserWorker size={24} color="red" /> },
    { label: "Total Users", value: 5, icon: <SlSocialFacebook size={24} color="blue" /> },
    { label: "Total Pages", value: 2, icon: <SiPowerpages size={24} color="green" /> },
    { label: "Total Emails", value: 5, icon: <MdLogout size={24} color="orange" /> },
  ];

  return (
    <div>
      <p className="md:text-3xl font-bold">Dashboard</p>
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
                  {stat.icon}
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