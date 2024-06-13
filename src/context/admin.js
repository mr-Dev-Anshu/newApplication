"use client"
import { createContext, useEffect, useState } from "react";
import Cookies from "cookies-js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebase.config";

export const admin = createContext();

const AdminContextProvider = ({ children }) => {
  const [adminData, setAdminData] = useState();
  const getCurrentUser = async () => {
    const email = Cookies?.get("email");
    //  console.log(email) ; 
    if (email) {
      const q = query(collection(db, "admin"), where("email", "==", email));
      const dataSnap = await getDocs(q);
      dataSnap.forEach((doc) => {
        setAdminData(doc.data());
      });
    }
  };
  useEffect(() => {
    getCurrentUser();
  }, []);
  return <admin.Provider value={{ adminData, setAdminData }}>{children}</admin.Provider>;
};
export default AdminContextProvider;