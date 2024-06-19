"use client";
import { db } from "@/config/firebase.config";
import { Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const LocationListPage = () => {
  const [locations, setLocations] = useState([]);
  const router = useRouter();

  const fetchLocations = async () => {
    const locationSnap = await getDocs(collection(db, "locations"));
    let locationData = [];

    locationSnap.forEach((doc) => {
      locationData.push({ id: doc.id, ...doc.data() });
    });
    setLocations(locationData);
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "locations", id));
    setLocations(locations.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between border-b border-gray-400 md:text-3xl text-2xl font-medium border-t py-1">
        <span>Location List</span>
        <Button
          onClick={() => router.push("/admin/add_location")}
          colorScheme="teal"
          variant="solid"
        >
          Create Location
        </Button>
      </div>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Location Name</Th>
            <Th>Latitude</Th>
            <Th>Longitude</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {locations.map((item) => (
            <Tr key={item.id}>
              <Td>{item.name}</Td>
              <Td>{item.latitude}</Td>
              <Td>{item.longitude}</Td>
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

export default LocationListPage;
