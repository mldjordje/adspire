"use client";

import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { easeOut } from "@/lib/motion";

type PageTransitionProps = {
  children: React.ReactNode;
  pathKey: string;
};

const PageTransition = ({ children, pathKey }: PageTransitionProps) => {
  const shouldReduce = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathKey}
        initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
        animate={shouldReduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={easeOut}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
