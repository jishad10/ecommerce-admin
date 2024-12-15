"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navLinks } from "@/lib/constants";

const LeftSideBar = () => {
  const pathname = usePathname();

  return (
    <div className="h-screen w-60 left-0 top-0 sticky bg-blue-2 shadow-xl max-lg:hidden flex flex-col">
      
      <div className="p-6">
        <Image src="/logo.png" alt="logo" width={188} height={50} />
      </div>

      <div className="flex flex-col gap-2">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`w-full block px-10 py-3 text-body-medium rounded-lg ${
              pathname === link.url
                ? "bg-green-600 text-white shadow-lg"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            <div className="flex items-center gap-4">
              {link.icon}
              <span>{link.label}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-40 px-10 py-3 flex items-center gap-4 text-body-medium">
        <UserButton />
        <span>Edit Profile</span>
      </div>
    </div>
  );
};

export default LeftSideBar;
