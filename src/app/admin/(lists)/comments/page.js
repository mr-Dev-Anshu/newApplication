"use client";
import { db } from "@/config/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

const ListComments = () => {
  const [comments, setComments] = useState([]);

  // Function to fetch comments from Firestore
  const fetchComments = async () => {
    const commentsRef = collection(db, "comments");
    const commentsSnapshot = await getDocs(commentsRef);
    let commentsData = [];

    commentsSnapshot.forEach((doc) => {
      commentsData.push({ id: doc.id, ...doc.data() });
    });

    setComments(commentsData);
  };

  // Fetch comments on component mount
  useEffect(() => {
    fetchComments();
  }, []);

  // Dummy comments data
const dummyComments = [
    {
      email: "john.doe@example.com",
      comments: "This is an interesting article. Thanks for sharing!",
      newsId: "123456789",
      status: "Approved"
    },
    {
      email: "jane.smith@example.com",
      comments: "I have a question about the topic discussed in the article.",
      newsId: "987654321",
      status: "Pending"
    },
    {
      email: "sam.wilson@example.com",
      comments: "Great insights provided in this piece. Well done!",
      newsId: "456789123",
      status: "Approved"
    },
    {
      email: "emma.brown@example.com",
      comments: "Looking forward to more articles like this one!",
      newsId: "789123456",
      status: "Approved"
    },
    {
      email: "alex.jones@example.com",
      comments: "I disagree with some points mentioned. Let's discuss.",
      newsId: "321654987",
      status: "Pending"
    }
  ];
  
  

  return (
    <div className="space-y-6">
      <div className="flex justify-between border-b border-gray-400 md:text-3xl text-2xl font-medium border-t py-1">
        <span>Comments List</span>
      </div>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Sl No.</Th>
            <Th>Email</Th>
            <Th>Comments</Th>
            <Th>News ID</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {dummyComments.map((comment, index) => (
            <Tr key={comment.id}>
              <Td>{index + 1}</Td>
              <Td>{comment.email}</Td>
              <Td>{comment.comments}</Td>
              <Td>{comment.newsId}</Td>
              <Td>{comment.status}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default ListComments;
