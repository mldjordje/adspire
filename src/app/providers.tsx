"use client";

import React from "react";
import { usePathname } from "next/navigation";
import PageTransition from "@/components/motion/PageTransition";
import { ThemeProvider } from "@/components/site/ThemeProvider";

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  const pathname = usePathname() || "/";

  return (
    <ThemeProvider>
      <PageTransition pathKey={pathname}>{children}</PageTransition>
    </ThemeProvider>
  );
};

export default Providers;
