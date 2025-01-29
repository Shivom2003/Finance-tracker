import React, { useEffect } from "react";
import Image from "next/image";
import {
  LayoutGrid,
  PiggyBank,
  ReceiptText,
  ShieldCheck,
  BadgeIndianRupee,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { index } from "drizzle-orm/mysql-core";

function SideNav() {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Incomes",
      icon: BadgeIndianRupee,
      path: "/dashboard/incomes",
    },
    {
      id: 3,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 4,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
  ];

  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className="h-screen p-5 border shadow-sm bg-sidenav-light text-white">
      <Link href={"/"}>
        <div className="flex flex-row items-center">
          <Image
            src={"/logo-icon.png"}
            alt="logo"
            width={200}
            height={200}
            style={{ marginLeft: 5 }}
          />
        </div>
        <div
          className="text-blue-800 font-bold text-xl"
          style={{ marginLeft: "65px", marginTop: -35 }}
        >
          FinVise
        </div>
      </Link>

      <div className="mt-5">
        {menuList.map((menu, index) => (
          <Link href={menu.path} key={index}>
            <h2
              className={`flex gap-2 items-center text-blue-900 font-medium mb-2 p-4 cursor-pointer rounded-full hover:text-primary hover:bg-blue-100 ${
                path == menu.path && "text-primary bg-blue-100"
              } `}
            >
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className="fixed bottom-10 p-5 flex gap-2 items-center">
        <UserButton />
        Profile
      </div>
    </div>
  );
}

export default SideNav;
