"use client";
import { db } from "@/config/firebase.config";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const ListAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const router = useRouter();

  const fetchAdmins = async () => {
    const adminsSnap = await getDocs(collection(db, "admins"));
    let adminsData = [];

    adminsSnap.forEach((doc) => {
      adminsData.push({ id: doc.id, ...doc.data() });
    });
    setAdmins(adminsData);
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "admins", id));
    setAdmins(admins.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between border-b border-gray-400 md:text-3xl text-2xl font-medium border-t py-1">
        <span>Admins List</span>
        <Button
          onClick={() => router.push("/admin/createadmin")}
          colorScheme="teal"
          variant="solid"
        >
          Add New Admin
        </Button>
      </div>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Active</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {admins.map((admin) => (
            <Tr key={admin.id}>
              <Td>{admin.name}</Td>
              <Td>{admin.email}</Td>
              <Td>{admin.role}</Td>
              <Td>{admin.isActive ? "Yes" : "No"}</Td>
              <Td>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleDelete(admin.id)}
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

export default ListAdmins;
