import React from "react";
import Layout from "@/components/layout/Layout";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import ServiceMain from "@/components/containers/ServiceMain";

import UxProcessTwo from "@/components/containers/service-details/UxProcessTwo";

import CtaTwo from "@/components/containers/service-details/CtaTwo";

const OurServices = () => {
  return (
    <Layout header={4} footer={5} video={0}>
      <CmnBanner title="Naše usluge" navigation="Naše usluge" />
      <ServiceMain />

      <UxProcessTwo />

      <CtaTwo />
    </Layout>
  );
};

export default OurServices;
