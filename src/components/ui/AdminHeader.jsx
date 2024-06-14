"use client";
import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import { IoLogoDesignernews } from "react-icons/io5";
import { logout } from "@/action";
const NavList = [
  {
    title: "Add News ",
    link: "/admin/add_news",
  },
  {
    title: "Add Ads",
    link: "/admin/add_ads",
  },
  {
    title: "Add Blogs ",
    link: "/admin/add_news",
  },
  {
    title: "Add  Employies  ",
    link: "/admin/add_news",
  },
];
const AdminHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <div>
      <div>
        <div className="bg-gray-600 px-12 py-2  fixed top-0 right-0 left-0  ">
          <Button className=" " ref={btnRef} onClick={onOpen}>
            <RxHamburgerMenu />
          </Button>
        </div>
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <div className="bg-black h-screen text-white ">
              <DrawerCloseButton />
              <DrawerHeader>All List for Admin </DrawerHeader>
              <DrawerBody>
                <div className="md:text-2xl text-xl ">
                  <ul className="">
                    {NavList.map((item) => (
                      <Link href={item.link}>
                        <li className="mt-4 flex gap-2 border rounded-md hover:bg-sky-600 hover:text-white  border-gray-600 px-3 py-2">
                          <span>
                            <IoLogoDesignernews />
                          </span>
                          <span>{item.title}</span>
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              </DrawerBody>
            </div>
            <DrawerFooter
              onClick={async () => await logout()}
              className="bg-black"
            >
              <Button className="w-full" colorScheme="red">
                Logout
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default AdminHeader;
