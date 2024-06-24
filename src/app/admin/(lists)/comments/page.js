"use client";
import { db } from "@/config/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

const ListComments = () => {
  const [comments, setComments] = useState([]);

  // Function to fetch comments from Firestore
  const fetchComments = async () => {
    const commentsRef = collection(db, "Comments");
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
            <Th>Comment</Th>
            <Th>News ID</Th>
            <Th>Likes</Th>
            <Th>Dislikes</Th>
          </Tr>
        </Thead>
        <Tbody>
          {comments.map((comment, index) => (
            <Tr key={comment.id}>
              <Td>{index + 1}</Td>
              <Td>{comment.email}</Td>
              <Td>{comment.comment}</Td>
              <Td>{comment.newsId}</Td>
              <Td>{comment.like}</Td>
              <Td>{comment.dislike}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default ListComments;
