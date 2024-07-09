"use client";

import { cn } from "@/lib/utils";
import { useDisconnectWallet } from "@mysten/dapp-kit";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "../ui/dropdown-menu";
import { useMemo } from "react";
import useMeidaSize from "@/hooks/useMeidaSize";
import { toast } from "sonner";
import { ConnectModal } from "@mysten/dapp-kit";
import React from "react";
import "@mysten/dapp-kit/dist/index.css";

interface Props {
  suiWalletAddress?: string;
  ethWalletAddress?: string;
  solWalletAddress?: string;
}

const LoginMenu = ({
  suiWalletAddress,
  ethWalletAddress,
  solWalletAddress,
}: Props) => {
  const screenWidth = useMeidaSize();
  const isDesktop = screenWidth >= 1280;
  const { mutate: disconnectSuiWallet } = useDisconnectWallet();
  const [suiModalOpen, setSuiModalOpen] = React.useState(false);

  return (
    <DropdownMenu>
      {/* Trigger */}
      <DropdownMenuTrigger className="w-full h-full py-2 px-6 outline-none">
        <span>{"Jarek"}</span>
      </DropdownMenuTrigger>
      {/* Content */}
      <DropdownMenuContent className="relative flex w-40 flex-col items-center border-none overflow-hidden">
        <DropdownMenuGroup className="w-full p-0 m-0 flex flex-col gap-2 py-1">
          {/* SUI */}
          <DropdownMenuItem
            className="DropdownMenuItem w-full"
            onSelect={(e) => e.preventDefault()}
          >
            {suiWalletAddress ? (
              <button
                onClick={() => disconnectSuiWallet()}
                className="w-full flex items-center"
              >
                <Image
                  src="/images/sui-logo.svg"
                  alt="sui-log"
                  width={20}
                  height={20}
                />
                <span className="w-2/3 ml-5 text-sm text-black text-left">
                  Sui
                </span>
                <div className="w-2 h-2 rounded-full mr-2 bg-green-300" />
              </button>
            ) : (
              <ConnectModal
                trigger={
                  <button className="w-full flex items-center">
                    <Image
                      src="/images/sui-logo.svg"
                      alt="sui-log"
                      width={20}
                      height={20}
                    />
                    <span className="w-2/3 ml-5 text-sm text-black text-left">
                      Sui
                    </span>
                    <div className="w-2 h-2 rounded-full mr-2 bg-gray-300" />
                  </button>
                }
              />
            )}
          </DropdownMenuItem>
          {/* Ethereum */}
          <DropdownMenuItem className="DropdownMenuItem w-full">
            <button className="w-full flex items-center">
              <svg
                className="w-5"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Ethereum"
                role="img"
                viewBox="0 0 512 512"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path fill="#3C3C3B" d="m256 362v107l131-185z"></path>
                  <path fill="#343434" d="m256 41l131 218-131 78-132-78"></path>
                  <path
                    fill="#8C8C8C"
                    d="m256 41v158l-132 60m0 25l132 78v107"
                  ></path>
                  <path fill="#141414" d="m256 199v138l131-78"></path>
                  <path fill="#393939" d="m124 259l132-60v138"></path>
                </g>
              </svg>
              <span className="w-2/3 ml-5 text-sm text-black text-left">
                Ethereum
              </span>
              <div
                className={cn(
                  "w-2 h-2 rounded-full mr-2",
                  ethWalletAddress ? "bg-green-300" : "bg-gray-300",
                )}
              />
            </button>
          </DropdownMenuItem>
          {/* Solana */}
          <DropdownMenuItem className="DropdownMenuItem w-full">
            <button className="w-full flex items-center">
              <Image
                src="/images/solana-logo.svg"
                alt="solana-log"
                width={20}
                height={20}
              />
              <span className="w-2/3 ml-5 text-sm text-black text-left">
                Solana
              </span>
              <div
                className={cn(
                  "w-2 h-2 rounded-full mr-2",
                  solWalletAddress ? "bg-green-300" : "bg-gray-300",
                )}
              />
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LoginMenu;
