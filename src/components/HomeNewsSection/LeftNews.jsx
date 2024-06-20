"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/config/firebase.config";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Image from "next/image";
import { Spinner } from "@chakra-ui/react";

const LeftNews = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNewsData = async () => {
    setLoading(true);

    const querySnapshot = await getDocs(collection(db, "breaking_news"));
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    console.log(data);
    setNewsData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchNewsData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-scroll scroll-smooth">
      {newsData.map((item) => (
        <div
          key={item.id}
          className="w-full ring-1 ring-gray-300 rounded-lg mb-4"
        >
          <div className="rounded-md border-b border-gray-300">
            <img
              className="w-full rounded-lg"
              src={item.heading_image}
              alt={item.title}
              width={500}
              height={300}
            />
          </div>
          <p className="text-xl font-medium px-2 py-2">{item.title}</p>
        </div>
      ))}
    </div>
  );
};

export default LeftNews;
