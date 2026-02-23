import React, { Suspense } from "react";
import { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { Analytics } from "@vercel/analytics/react";
import nextI18NextConfig from "../../next-i18next.config.js";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// font awesome 6
import "public/icons/font-awesome/css/all.css";

// custom icons
import "public/icons/glyphter/css/xpovio.css";

// main scss
import "@/styles/main.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...pageProps} />
      <Analytics />
    </Suspense>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);
