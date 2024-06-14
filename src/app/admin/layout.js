// components/layouts/AdminLayout.js
import React from "react";
import Head from "next/head";
import AdminHeader from "@/components/ui/AdminHeader";
import { getSession } from "@/action";
import {redirect} from "next/navigation"
const AdminLayout =  async ({ children }) => {

   const session = await  getSession() ; 
    if (!session.userid) {
       redirect("/") ;
    }
  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <div>
        <header className="">
          <AdminHeader />
        </header>
        <main className="px-12 py-20 ">{children}</main>
      </div>
    </>
  );
};

export default AdminLayout;
