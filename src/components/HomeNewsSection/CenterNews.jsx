"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebase.config";

const CenterNews = () => {
  const [data, setData] = useState([]);

  

    // dataSnap.forEach((doc) => {
    //   allData.push(doc.data());
    // });

    // const q = query(
    //   collection(db, "news_image_heading"),
    //   where("news_id", "==", id)
    // );

    // const headingImageSnap = await getDocs(q) ; 
    // headingImageSnap.forEach((doc)=> {
       
    // })

   
 
    const getData = async () => {
      try {
        const allData = [];
        const dataSnap = await getDocs(collection(db, "news_data")); // Adjust collection name
    
          dataSnap.forEach(doc=> {
              allData.push(doc.data().formData) ; 
          })
        console.log(allData); // Log allData to verify all entries are present
        setData(allData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    useEffect(() => {
      getData();
    }, []);

  return (
    <div>
      <div className="flex flex-col space-y-4 h-screen w-fit scroll-smooth overflow-y-scroll">
        {data.map((item, index) => (
          <Link href="/testUi" key={index}>
            <div className="flex md:max-w-[450px] md:min-w-[450px] min-h-[90px] max-h-[90px] gap-2 ring-1 cursor-pointer ring-gray-300 py-2 px-2">
              <div className="w-[30%]">
                <img
                  src={item.heading_image}
                  width={150}
                  height={90}
                  className="rounded-md"
                  alt=""
                />
              </div>
              <div className="w-[70%]">{item.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CenterNews;
