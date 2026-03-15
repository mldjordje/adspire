"use client";

import { useTheme } from "@/components/site/ThemeProvider";

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className="mxd-round-btn"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      aria-pressed={theme === "dark"}
    >
      {theme === "dark" ? "LIGHT" : "DARK"}
    </button>
  );
}
