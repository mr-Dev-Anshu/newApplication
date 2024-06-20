import React from 'react';
import { Flex, Box, Text, Link, VStack, Divider } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box bg="gray.800" color="white" py={8}>
      <VStack spacing={4} align="stretch" maxW="6xl" mx="auto" px={4}>
        <Flex justify="space-between" align="center">
          <Text fontSize="xl" fontWeight="bold">
            Company Name
          </Text>
          <Box>
            <Link mr={4} href="/about">
              About Us
            </Link>
            <Link href="/contact">
              Contact Us
            </Link>
          </Box>
        </Flex>
        <Divider />
        <Text fontSize="sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque est eu semper
          hendrerit. Phasellus ultricies sapien a neque vulputate, sit amet venenatis purus
          pellentesque.
        </Text>
        <Flex justify="space-between" mt={4}>
          <Text>&copy; 2024 Company Name. All rights reserved.</Text>
          <Text>
            Designed by{' '}
            <Link href="https://yourwebsite.com" isExternal>
              Your Name
            </Link>
          </Text>
        </Flex>
      </VStack>
    </Box>
  );
};

export default Footer;
