"use client";
import { db } from "@/config/firebase.config";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
const ListSocial = () => {
  const router = useRouter();
  const [socialMedia, setSocialMedia] = useState([]);

  const fetchSocialMedia = async () => {
    const socialMediaSnap = await getDocs(collection(db, "social_media"));
    let socialMediaData = [];

    socialMediaSnap.forEach((doc) => {
      socialMediaData.push({ id: doc.id, ...doc.data() });
    });
    setSocialMedia(socialMediaData);
  };

  useEffect(() => {
    fetchSocialMedia();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "social_media", id));
    setSocialMedia(socialMedia.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between border-b border-gray-400 md:text-3xl text-2xl font-medium border-t py-1">
        <span>Social Media Links</span>
        <Button
          onClick={() => router.push("/admin/add_social")}
          colorScheme="teal"
          variant="solid"
        >
          Add New Social Media
        </Button>
      </div>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Platform</Th>
            <Th>Link</Th>
            <Th>Active</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {socialMedia.map((item) => (
            <Tr key={item.id}>
              <Td>{item.platform}</Td>
              <Td>{item.link}</Td>
              <Td>{item.isActive ? "Yes" : "No"}</Td>
              <Td>
                <Button
                  size="sm"
                  colorScheme="red"
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

export default ListSocial;
