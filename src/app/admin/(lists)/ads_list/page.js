"use client";
import { db } from "@/config/firebase.config";
import { Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AdsPage = () => {
  const [ads, setAds] = useState([]);
  const router = useRouter();

  const fetchAds = async () => {
    const adsSnap = await getDocs(collection(db, "ads_data"));
    let adsData = [];

    adsSnap.forEach((doc) => {
      adsData.push({ id: doc.id, ...doc.data() });
    });
    setAds(adsData);
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "ads_data", id));
    setAds(ads.filter((item) => item.id !== id));
  };

  const handleView = (id) => {
    router.push(`/ads/${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between border-b border-gray-400 md:text-3xl text-2xl font-medium border-t py-1">
        <span>Ads List</span>
        <Button
          onClick={() => router.push("/admin/add_ads")}
          colorScheme="teal"
          variant="solid"
        >
          Add New Ad
        </Button>
      </div>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Category</Th>
            <Th>Ad Title</Th>
            <Th>Advertiser Name</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {ads.map((item) => (
            <Tr key={item.id}>
              <Td>{item.formData.category}</Td>
              <Td>{item.formData?.ad_title}</Td>
              <Td>{item.formData?.advertiser_name}</Td>
              <Td>{item.active ? "Active" : "Inactive"}</Td>
              <Td>
                <Button
                  size="sm"
                  colorScheme="blue"
                  onClick={() => handleView(item.id)}
                >
                  View
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  ml={2}
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default AdsPage;
