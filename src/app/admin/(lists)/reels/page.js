"use client";
import { db, storage } from "@/config/firebase.config";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const ListReels = () => {
  const [reels, setReels] = useState([]);
  const router = useRouter();

  const fetchReels = async () => {
    const reelsSnap = await getDocs(collection(db, "reels"));
    let reelsData = [];

    reelsSnap.forEach((doc) => {
      reelsData.push({ id: doc.id, ...doc.data() });
    });
    setReels(reelsData);
  };

  useEffect(() => {
    fetchReels();
  }, []);

  const handleDelete = async (id, imageName) => {
    await deleteDoc(doc(db, "reels", id));
    if (imageName) {
      const storageRef = ref(storage, `reels/${id}`);
      await deleteObject(storageRef);
    }
    setReels(reels.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between border-b border-gray-400 md:text-3xl text-2xl font-medium border-t py-1">
        <span>Reels List</span>
        <Button
          onClick={() => router.push("/admin/add_reels")}
          colorScheme="teal"
          variant="solid"
        >
          Add New Reel
        </Button>
      </div>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Content Type</Th>
            <Th>Language</Th>
            <Th>Description</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {reels.map((reel) => (
            <Tr key={reel.id}>
              <Td>{reel.title}</Td>
              <Td>{reel.contentType}</Td>
              <Td>{reel.language}</Td>
              <Td>{reel.description}</Td>
              <Td>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleDelete(reel.id, reel.image)}
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

export default ListReels;
