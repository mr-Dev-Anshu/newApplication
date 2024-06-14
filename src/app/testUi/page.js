"use client";
import React from "react";
import newsImage from "@/accets/newsImage/img2.jpeg";
import adsImage from "@/accets/ads/ads2.jpeg";
import Image from "next/image";
import HeaderAds from "@/components/adds/HeaderAds";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
} from "@chakra-ui/react";
const Page = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <div className="flex flex-col min-h-screen ">
      {/* <div className="md:block hidden "><HeaderAds /></div> */}

      <div className={`flex-1 px-12 md:w-[70%] space-y-4 `}>
        <div className="md:text-4xl text-xl font-bold">
          Local Community Garden Thrives Amid Urban Development
        </div>
        <div className="md:text-xl text-gray-500">
          Looking for something specific? Use our Search News feature to find
          articles, reports, and updates on the topics that matter most to you.
          Simply enter your keywords and discover a wealth of information.
        </div>
        <div className="rounded-md cursor-pointer flex justify-center">
          <Image className="rounded-lg" width={600} src={newsImage} alt="img" />
        </div>
        <p className="text-gray-500 text-xl md:text-2xl">Read More About it </p>
        <div className="md:text-xl text-gray-500">
          In a remarkable advancement in renewable energy, scientists have
          achieved a significant milestone by doubling the efficiency of solar
          power technology. This breakthrough promises to revolutionize the
          solar energy sector and accelerate the transition to a sustainable
          future. Researchers at the International Renewable Energy Laboratory
          (IREL) announced that they have successfully developed a new type of
          solar cell that can convert sunlight into electricity with
          unprecedented efficiency. The new cells utilize a novel material,
          perovskite, which has demonstrated remarkable photovoltaic properties.
          This material, combined with innovative engineering techniques, has
          resulted in solar panels that can achieve an efficiency rate of over
          40%, a substantial increase from the current average of 20-22%.
        </div>

        <div className="flex justify-center">
          <Image className="rounded-md" width={300} src={adsImage} alt="adss" />
        </div>
        <div className="md:text-xl text-gray-500">
          Dr. Amanda Clark, the lead scientist on the project, explained the
          significance of this development: "The efficiency of solar panels has
          always been a limiting factor in the widespread adoption of solar
          energy. With our new technology, we can produce more electricity from
          the same amount of sunlight, making solar power a more viable and
          cost-effective option for both residential and commercial use."
        </div>
      </div>
      <div className="flex justify-center mt-6 ">
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
          <DrawerCloseButton />
          <DrawerHeader>Comments </DrawerHeader>

          <DrawerBody className="space-y-4">
            <div className="border border-gray-300 px-4 py-2 ">
              <div className="flex gap-4  items-center">
                <p className="h-12 w-12 bg-orange-700/90 text-white rounded-full flex justify-center items-center  ">
                  A
                </p>
                <div>
                  <p className="text-xl font-bold ">Ashvini Kumar </p>
                  <p>45 min Ago </p>
                </div>
              </div>
              <div className="mt-4 md:text-xl font-medium md:pl-16">
                Mujhe 15 Lakh Kab Milega Modi ji , is Bar to PM bhi ban gaye
                Please de do .{" "}
              </div>
            </div>
            <div className="border border-gray-300 px-4 py-2 ">
              <div className="flex gap-4  items-center">
                <p className="h-12 w-12 bg-orange-700/90 text-white rounded-full flex justify-center items-center  ">
                  A
                </p>
                <div>
                  <p className="text-xl font-bold ">Ashvini Kumar </p>
                  <p>45 min Ago </p>
                </div>
              </div>
              <div className="mt-4 md:text-xl font-medium md:pl-16">
                Mujhe 15 Lakh Kab Milega Modi ji , is Bar to PM bhi ban gaye
                Please de do .{" "}
              </div>
            </div>
            <div className="border border-gray-300 px-4 py-2 ">
              <div className="flex gap-4  items-center">
                <p className="h-12 w-12 bg-orange-700/90 text-white rounded-full flex justify-center items-center  ">
                  A
                </p>
                <div>
                  <p className="text-xl font-bold ">Ashvini Kumar </p>
                  <p>45 min Ago </p>
                </div>
              </div>
              <div className="mt-4 md:text-xl font-medium md:pl-16">
                Mujhe 15 Lakh Kab Milega Modi ji , is Bar to PM bhi ban gaye
                Please de do .{" "}
              </div>
            </div>
            <div className="border border-gray-300 px-4 py-2 ">
              <div className="flex gap-4  items-center">
                <p className="h-12 w-12 bg-orange-700/90 text-white rounded-full flex justify-center items-center  ">
                  A
                </p>
                <div>
                  <p className="text-xl font-bold ">Ashvini Kumar </p>
                  <p>45 min Ago </p>
                </div>
              </div>
              <div className="mt-4 md:text-xl font-medium md:pl-16">
                Mujhe 15 Lakh Kab Milega Modi ji , is Bar to PM bhi ban gaye
                Please de do .
              </div>
            </div>
          </DrawerBody>

          <DrawerFooter className="">
            <div className="flex  w-full gap-4 md:px-14  ">
              <Input
                placeholder="Leave your  Comment...."
                className="px-4 w-full  py-2 border-2 border-gray-500 rounded-md md:placeholder:text-xl "
                type="text"
              />
              <button className="px-4 py-2 bg-sky-700 text-white font-medium rounded-md  ">
                Send
              </button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <div></div>

      <button>click me </button>
    </div>
  );
};

export default Page;
