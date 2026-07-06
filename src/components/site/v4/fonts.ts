import { Syne, Inter } from "next/font/google";

/** Shared OBSIDIAN font variables for all v4 pages. */
export const v4Display = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display-v4",
  display: "swap",
});

export const v4Body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body-v4",
  display: "swap",
});

export const v4FontClass = `${v4Display.variable} ${v4Body.variable}`;
