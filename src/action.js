"use server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcryptjs from "bcryptjs";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./config/firebase.config";

export const getSession = async () => {
  const session = await getIronSession(cookies(), sessionOptions);
  session.res?.setHeader("Cache-Control", "no-store, must-revalidate");
  return session;
};

export const login = async (formData) => {
  const session = await getSession();
  const userid = formData.get("userid");
  const password = formData.get("password");
  console.log(userid, password);
  const q = query(collection(db, "admin"), where("userid", "==", userid));
  const dataSnap = await getDocs(q);
   let user ; 
  dataSnap.forEach((doc) => {
    console.log(doc.data());
     user = doc.data()  ;
  });
   if(!user) {
     throw new Error("Admin not Found ")
   }

     if (password !== user.password) {
       throw new Error ("Incorrect Password ! Please try again ")
     }
     session.userid = user.userid; 
     console.log(session) ; 

    await  session.save() ; 
    redirect("/admin")
};

export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/");
};
