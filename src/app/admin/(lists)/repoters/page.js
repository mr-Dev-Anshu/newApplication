"use client";
import { db } from "@/config/firebase.config";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
const ListReporters = () => {
    const router = useRouter()  ;
  const [reporters, setReporters] = useState([]);

  const fetchReporters = async () => {
    const reportersSnap = await getDocs(collection(db, "reporters"));
    let reportersData = [];

    reportersSnap.forEach((doc) => {
      reportersData.push({ id: doc.id, ...doc.data() });
    });
    setReporters(reportersData);
  };

  useEffect(() => {
    fetchReporters();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "reporters", id));
    setReporters(reporters.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between border-b border-gray-400 md:text-3xl text-2xl font-medium border-t py-1">
        <span>Reporters List</span>
        <Button
          onClick={() => router.push("/admin/add_reporters")}
          colorScheme="teal"
          variant="solid"
        >
          Create New Reporter
        </Button>
      </div>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>S. No.</Th>
            <Th>Full Name</Th>
            <Th>Email</Th>
            <Th>Country</Th>
            <Th>Status</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {reporters.map((reporter, index) => (
            <Tr key={reporter.id}>
              <Td>{index + 1}</Td>
              <Td>{reporter.fullName}</Td>
              <Td>{reporter.email}</Td>
              <Td>{reporter.country}</Td>
              <Td>Active</Td>
              <Td>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleDelete(reporter.id)}
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

export default ListReporters;
