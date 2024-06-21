"use client";
import React, { useEffect, useState } from "react";
import AdSection from "./AddSection";
import CategoryNews from "./CategoryNews";
import { FaAngleDoubleDown } from "react-icons/fa";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase.config";

const DynamicCategoryContainer = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "news_category"));
         
        const fetchedCategories = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          category: doc.data().newsCategory,
        }));
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        categories.map((category) => (
          <DynamicCategory key={category.id} category={category.category} />
        ))
      )}
    </div>
  );
};

const DynamicCategory = ({ category }) => {
  return (
    <div>
      <div className="md:w-[50%] px-12 flex border-b border-y-gray-400 py-2 items-center md:text-2xl text-xl font-bold gap-4">
        <span className="text-red-500">
          <FaAngleDoubleDown size={25} />
        </span>
        <span>{category} News</span>
      </div>
      <CategoryNews category={category} />
      <AdSection category={category} />
    </div>
  );
};

export default DynamicCategoryContainer;
