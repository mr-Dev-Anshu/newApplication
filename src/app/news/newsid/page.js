"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Image,
  Input,
  Spinner,
  Text,
  useDisclosure,
  VStack,
  IconButton,
  HStack,
  Flex,
} from "@chakra-ui/react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { getSession } from "@/action";
import { FaShareAlt } from "react-icons/fa";
import Link from "next/link";
import AdSection from "@/components/AppComponents/AddSection";

const NewComponent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [loading, setLoading] = useState(true);
  const [newsData, setNewsData] = useState(null);
  const [error, setError] = useState(null);
  const [newsImages, setNewsImages] = useState([]);
  const [comment, setComment] = useState("");
  const [userEmail, setUserEmail] = useState(null);
  const [comments, setComments] = useState(null);
  const [cLoading, setCloading] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await getSession();
        if (session) {
          const email = session.email;
          setUserEmail(email);
          console.log("this is from news  ", email);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    fetchSession();
  }, []);

  const fetchCommentData = async () => {
    try {
      const q = query(collection(db, "Comments"), where("newsId", "==", id));
      const dataSnap = await getDocs(q);
      const commentsData = [];
      dataSnap.forEach((doc) => {
        commentsData.push({ id: doc.id, ...doc.data() });
      });
      console.log("this is comments data ", commentsData);
      setComments(commentsData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        setLoading(true);
        const docRef = doc(db, "news_data", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const newsData = { id: docSnap.id, ...docSnap.data().formData };
          setNewsData(newsData);
          
          // Fetch associated images
          const q = query(
            collection(db, "news_images"),
            where("news_id", "==", id)
          );
          console.log(q);
          const imageSnap = await getDocs(q);
          console.log(imageSnap.empty);
          const images = imageSnap.docs.map((doc) => ({
            id: doc.id,
            url: doc.data().url,
          }));
          console.log("this is Image -> ", images);
          setNewsImages(images);
        } else {
          setError("No such document exists!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
        setError("Error fetching document");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNewsData();
      fetchCommentData();
    }
  }, [id]);

  const handleComment = async () => {
    setCloading(true);
    const docRef = collection(db, "Comments");
    await addDoc(docRef, {
      comment,
      newsId: id,
      email: userEmail,
      like: 0,
      dislike: 0,
    });
    setComment("");
    setCloading(false);
    fetchCommentData();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: newsData.title,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      console.log("Web Share API not supported in this browser.");
    }
  };

  if (loading) {
    return (
      <VStack justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </VStack>
    );
  }

  if (error) {
    return (
      <VStack justifyContent="center" alignItems="center" height="100vh">
        <Text>Error: {error}</Text>
      </VStack>
    );
  }

  if (!newsData) {
    return (
      <VStack justifyContent="center" alignItems="center" height="100vh">
        <Text>No news data found for this ID.</Text>
      </VStack>
    );
  }

  return (
   <>
    <Link href={"/"}>
    <button  className="p-2 rounded-md bg-sky-600 text-white font-medium ">Back </button>
    </Link>
    <div className="flex flex-col md:mt-12 mt-6">
     <div>
       <AdSection category={newsData.category}/> 
     </div>
<div className="flex-1 px-4 md:px-12 md:w-[90%] w-[90%] border border-gray-200 space-y-4 mx-auto">

  <p className="md:text-4xl text-2xl mb-4 font-bold ">{newsData.title}</p>
  <p className="font-bold  md:text-xl ">{newsData.subtitle}</p>
  {newsImages.length > 0 && (
    <Box className="rounded-md cursor-pointer flex justify-center">
      <img
        className="rounded-lg"
        src={newsImages[0].url}
        alt={newsData.title}
        width={600}
        height={400}
        style={{ objectFit: "cover" }}
      />
    </Box>
  )}  
  <Text fontSize="xl" color="gray.500" mb={4}>
    Read More About It
  </Text>
  <Text fontSize="xl">{newsData.news_body}</Text>
  <Text fontSize="xl" color="gray.500" mb={4}>
    {newsData.author} - {newsData.publish_date}
  </Text>
  <HStack justifyContent="center" mt={6} spacing={4}>
    <IconButton
      icon={<FaShareAlt />}
      onClick={handleShare}
      colorScheme="teal"
      aria-label="Share"
    />
  </HStack>
</div>
<div className="flex justify-center mt-6">
  <Button
    className="w-fit"
    ref={btnRef}
    colorScheme="teal"
    onClick={onOpen}
  >
    Leave Your Comment
  </Button>
</div>

<Drawer
  isOpen={isOpen}
  placement="right"
  onClose={onClose}
  finalFocusRef={btnRef}
  size={"lg"}
>
  <DrawerOverlay />
  <DrawerContent>
    {userEmail ? (
      <>
        <DrawerCloseButton />
        <DrawerHeader>Comments</DrawerHeader>

        <DrawerBody className="space-y-4">
          {comments.map((item, index) => (
            <div key={index} className="border border-gray-300 px-4 py-2">
              <div className="flex gap-4 items-center">
                <p className="h-12 w-12 bg-orange-700/90 text-white rounded-full flex justify-center items-center">
                  .
                </p>
                <div>
                  <p className="text-xl font-bold">{item.email}</p>
                  {/* <p>45 min Ago</p> */}
                </div>
              </div>
              <div className="mt-4 md:text-xl font-medium md:pl-16">
                {item.comment}
              </div>
            </div>
          ))}
        </DrawerBody>

        <DrawerFooter>
          <div className="flex w-full gap-4 px-4">
            <Input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Leave your comment...."
              className="px-4 w-full py-2 border-2 border-gray-500 rounded-md"
              type="text"
            />
            <Button
              colorScheme={"teal"}
              isLoading={cLoading}
              onClick={handleComment}
              className="bg-sky-700 text-white p-2 rounded-md"
            >
              Send
            </Button>
          </div>
        </DrawerFooter>
      </>
    ) : (
      <Flex
        justify="center"
        align="center"
        height="100vh"
        bg="gray.50"
        p={4}
        color="red.600"
      >
        <Box textAlign="center">
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            Please Login First
          </Text>

          <Link href={"/userlogin"}>
            {" "}
            <Button
              fontSize="xl"
              fontWeight="bold"
              bg="gray.800"
              color="white"
              py={2}
              px={4}
              rounded="md"
              _hover={{ bg: "gray.700" }}
            >
              Login
            </Button>
          </Link>
        </Box>
      </Flex>
    )}
  </DrawerContent>
</Drawer>
</div>
   </>
  );
};

const Page = () => {
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    setShowComponent(true);
  }, []);

  return <div>{showComponent && <NewComponent />}</div>;
};

export default Page;
