"use client";

import { db, storage } from "@/config/firebase.config";
import { Button } from "@chakra-ui/react";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";

const Page = () => {
  const [files, setFiles] = useState([]);
  const [urls, setUrls] = useState([]);
  const [toggle, setToggle] = useState(false);

  const handleChange = (e) => {
    setFiles(e.target.files);
  };

  const uploadFiles = async () => {
    const uploadPromises = [];
    const fileUrls = [];

    for (const file of files) {
      const storageRef = ref(storage, `uploads/${file.name}`);
      const uploadTask = uploadBytes(storageRef, file);

      uploadPromises.push(
        uploadTask.then(async (snapshot) => {
          const downloadURL = await getDownloadURL(snapshot.ref);
          fileUrls.push(downloadURL);

          // Save the URL to Firestore
          try {
            await addDoc(collection(db, "images"), {
              name: file.name,
              url: downloadURL,
              timestamp: new Date(),
            });
          } catch (error) {
            console.error("Error adding document: ", error);
          }
        })
      );
    }

    try {
      await Promise.all(uploadPromises);
      setUrls(fileUrls);
      console.log("File URLs:", fileUrls);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div>
      <input onChange={handleChange} multiple type="file" />
      <Button onClick={uploadFiles} color={"red"}>
        Upload
      </Button>
      {urls.length > 0 && (
        <div>
          <h3>Uploaded File URLs:</h3>
          <ul>
            {urls.map((url, index) => (
              <li key={index}>
                <img src={url} alt="img" />
              </li>
            ))}
          </ul>
        </div>
      )}

      <Button onClick={handleToggle} color={"blue"}>
        Toggle Modal
      </Button>

      {toggle && (
        <div
          id="info-popup"
          className="fixed  top-0 right-0 left-0 z-50 w-full md:inset-0 h-full flex justify-center items-center"
          aria-modal="true"
        >
          hey this is anshu Pandey 
        </div>
      )}
    </div>
  );
};

export default Page;
