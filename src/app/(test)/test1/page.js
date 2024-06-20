"use client";
import DynamicCategoryContainer from "@/components/AppComponents/DynamicCategory";
import { db } from "@/config/firebase.config";
import {
  Box,
  Button,
  Image,
  Text,
  VStack,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

const NewsList = () => {
  return (
    <div>
      <DynamicCategoryContainer />
    </div>
  );
};

export default NewsList;
