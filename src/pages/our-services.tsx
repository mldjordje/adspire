import React from "react";
import { useTranslation } from "next-i18next";
import Layout from "@/components/layout/Layout";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import ServiceMain from "@/components/containers/ServiceMain";
import LocationServiceLinks from "@/components/containers/LocationServiceLinks";
import UxProcessTwo from "@/components/containers/service-details/UxProcessTwo";
import CtaTwo from "@/components/containers/service-details/CtaTwo";

const OurServices = () => {
  const { t } = useTranslation("common");

  return (
    <Layout header={4} footer={5} video={0}>
      <CmnBanner
        title={t("services.pageTitle") as string}
        navigation={t("services.pageNav") as string}
        subtitle={t("banner.servicesSubtitle") as string}
      />
      <ServiceMain />
      <LocationServiceLinks />
      <UxProcessTwo />
      <CtaTwo />
    </Layout>
  );
};

export default OurServices;

export { getCommonStaticProps as getStaticProps } from "@/lib/getCommonStaticProps";
