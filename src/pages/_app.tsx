import React, { Suspense } from "react";
import App, { AppProps, AppContext } from "next/app";
import { appWithTranslation } from "next-i18next";
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
    </Suspense>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const locale = appContext.ctx.locale || appContext.router?.locale || "sr";

  const { serverSideTranslations } = await import(
    "next-i18next/serverSideTranslations"
  );
  const translations = await serverSideTranslations(locale, ["common"], nextI18NextConfig);

  return {
    ...appProps,
    pageProps: {
      ...appProps.pageProps,
      ...translations,
    },
  };
};

export default appWithTranslation(MyApp, nextI18NextConfig);
