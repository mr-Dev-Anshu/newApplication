'use client'
import React, { useState } from "react";
import { Button, Input, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

const UsersList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const dummyUsers = [
    { id: 1, name: "Abu Motaleb", email: "abumotaleb1111@gmail.com", country: "America", status: "Active" },
    { id: 2, name: "b", email: "aa@gmail.com", country: "c", status: "Active" },
    { id: 3, name: "Bokul Khan", email: "bokul@gmail.com", country: "Bangladesh", status: "Active" },
    { id: 4, name: "Dadu", email: "stationdbug@gmail.com", country: "Bangladesh", status: "Active" },
    { id: 5, name: "Mridul", email: "dbugsta.store003@gmail.com", country: "Bangladesh", status: "Active" },
  ];

  const filteredUsers = dummyUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-gray-400 md:text-3xl text-2xl font-medium border-t py-1">
        <span>Users List</span>
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-400 text-xl focus:border-blue-500 focus:outline-none rounded-md px-4 py-1 w-full"
          width="200px"
        />
      </div>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>S. No.</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Country</Th>
            <Th>Status</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredUsers.map((user, index) => (
            <Tr key={user.id}>
              <Td>{index + 1}</Td>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.country}</Td>
              <Td>{user.status}</Td>
              <Td>
                <Button size="sm" colorScheme="blue">Edit</Button>
                <Button size="sm" colorScheme="red" ml={2}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default UsersList;
