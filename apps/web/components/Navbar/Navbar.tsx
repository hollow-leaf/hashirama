"use client";
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useLoginStore } from '@/stores/useUserStore';

const NAV_LIST: Nav[] = [
  { name: "Home", link: "/" },
  { name: "Profile", link: "/profile" },
  { name: "DAO", link: "/dao" },
  { name: "Explore", link: "/explore" },
];

interface Nav {
  name: string;
  link: string;
}

export function Navbar() {
  // Sui wallet
  const routerLink = usePathname();
  const {ethUserInfo, userInfo, logout} = useLoginStore();

  const [closed, setClosed] = useState<Boolean>(true);
  function toggle() {
    setClosed(!closed);
  }

  // MOCK_DATA
  const ethWalletAddress = undefined;

  return (
    <nav className="relative z-40 glass2 border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4">
        <div className="flex items-center rtl:space-x-reverse">
          <Image
            className="rounded-full"
            src="/girudo.png"
            width={80}
            height={80}
            alt="Picture of the author"
          />
          <Link
            className="self-center text-black text-2xl font-semibold whitespace-nowrap"
            href="/"
          >
            Hashirama
          </Link>
        </div>
        <button
          onClick={toggle}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:items-center md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            {NAV_LIST.map((nav) => (
              <li key={nav.name}>
                <Link
                  className={cn(
                    "block py-2 px-3 text-black hover:text-cBlue bg-blue-700 rounded md:bg-transparent md:p-0",
                    nav.link === routerLink ? "text-cBlue" : "text-black",
                  )}
                  aria-current="page"
                  href={nav.link}
                >
                  {nav.name}
                </Link>
              </li>
            ))}
            <ConnectButton />
          </ul>
        </div>
        {!closed && (
          <div className="absolute right-[7%] top-[90%] w-[340px] md:hidden md:w-auto">
            <ul className="bg-white/90 font-medium flex flex-col p-4 md:items-center md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
              {NAV_LIST.map((nav) => (
                <li key={nav.name}>
                  <Link
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-cBlue hover:text-white md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                    href={nav.link}
                  >
                    {nav.name}
                  </Link>
                </li>
              ))}
              <ConnectButton />
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
