"use client";

import useSWR from "swr";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";

function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <div className="bg-navbar-shade flex h-20 justify-between items-center border shadow">
      <div className="flex flex-row items-center">
        <Image src={"/logo-icon.png"} alt="logo" width={130} height={130} />
        <span className="text-blue-900 font-bold text-xxl">FinVise</span>
      </div>

      <div className="flex gap-3 items-center">
        {isSignedIn ? (
          <>
            {/* Show UserButton when signed in  */}
            <Link href="/dashboard">
              <Button
                variant="Outline"
                className="rounded-full border text-white hover:bg-navy-900"
              >
                Dashboard
              </Button>
            </Link>
            <UserButton />
          </>
        ) : (
          <>
            {/* Show "Dashboard" and "Get Started" when not signed in */}
            <div className="flex gap-3 items-center">
              <Link href="/dashboard">
                <Button
                  variant="Outline"
                  className="rounded-full border text-white hover:bg-navy-900"
                >
                  Dashboard
                </Button>
              </Link>
              <Link href={"/sign-in"}>
                <Button className="rounded-full border hover:bg-navy-900">
                  Get Started
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
