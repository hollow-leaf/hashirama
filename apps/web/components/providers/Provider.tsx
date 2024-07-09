"use client";

import { cn } from "@/lib/utils";
import { type AppType } from "next/dist/shared/lib/utils";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";
import ToastProvider from "./ToastProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Toaster from "../shared/Toaster";
import EthWalletProvider from "./EthProvider";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});
const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
        <EthWalletProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </EthWalletProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
    </QueryClientProvider>
  );
};

export default Provider;
