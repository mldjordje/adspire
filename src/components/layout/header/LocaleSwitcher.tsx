import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

type LocaleSwitcherProps = {
  className?: string;
};

const SUPPORTED_LOCALES = [
  { code: "sr", label: "SR" },
  { code: "en", label: "EN" },
];

const LocaleSwitcher = ({ className = "" }: LocaleSwitcherProps) => {
  const router = useRouter();
  const { locale, asPath } = router;

  return (
    <div className={`locale-switcher d-flex gap-2 ${className}`.trim()}>
      {SUPPORTED_LOCALES.map(({ code, label }) => {
        const isActive = locale === code;
        return (
          <Link
            key={code}
            href={asPath || "/"}
            locale={code}
            className={`btn btn-sm ${isActive ? "btn--primary" : "btn--secondary"}`}
            aria-current={isActive ? "true" : "false"}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
};

export default LocaleSwitcher;
