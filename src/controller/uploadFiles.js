import { db, storage } from "@/config/firebase.config";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

  export const uploadFiles = async (files, id) => {
  const uploadPromises = [];
  const fileUrls = [];
  
  for (const file of files) {
    const storageRef = ref(storage, `uploads/${file.name}`);
    const uploadTask = uploadBytes(storageRef, file);
    uploadPromises.push(
      uploadTask.then(async (snapshot) => {
        const downloadURL = await getDownloadURL(snapshot.ref);
        fileUrls.push(downloadURL);
        try {
          await addDoc(collection(db, "ads_images"), {
            news_id: id,
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

export const uploadImage = async (file, id) => {
  if (!file) {
    throw new Error("No file provided");
  }
  const storageRef = ref(storage, `images/${file.name}`);
  try {
    // Upload the file to Firebase Storage
    const snapshot = await uploadBytes(storageRef, file);

    // Get the download URL
    const url = await getDownloadURL(snapshot.ref);
    console.log("File available at", url);
    await addDoc(collection(db, "news_image_heading"), {
      news_id: id,
      url: url,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};








