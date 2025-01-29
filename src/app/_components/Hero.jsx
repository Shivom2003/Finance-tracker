"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Carousel } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";

export function Hero() {
  const isSignedIn = useUser();
  const slideData = [
    {
      title: "Powered by AI",
      button: "Get Started",
      src: "/ai.jpg",
    },
    {
      title: "Track Your Expenses",
      button: "Get Started",
      src: "/expenses.jpg",
    },
    {
      title: "Invest Smartly",
      button: "Get Started",
      src: "/investment.jpg",
    },
    {
      title: "Manage Your Finance",
      button: "Get Started",
      src: "/finance.jpg",
    },
  ];

  return (
    <section className="bg-page-gradient">
      <div className="relative w-full h-screen flex flex-col items-center justify-center py-20">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-white dark:text-white">
                Enhance your Financial Management with AI <br />
                <span className="text-4xl md:text-[4rem] text-white font-bold mt-1 leading-none">
                  FinVise: Your Finance Advisor
                </span>
              </h1>
            </>
          }
        >
          <Image
            src="/stock.jpg"
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
        <Carousel slides={slideData} />
      </div>
    </section>
  );
}

export default Hero;
