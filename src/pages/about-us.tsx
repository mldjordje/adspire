import React from "react";
import Layout from "@/components/layout/Layout";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import Agency from "@/components/containers/home/Agency";
import CtaTwo from "@/components/containers/service-details/CtaTwo";

const AboutUs = () => {
  return (
    <Layout header={2} footer={1} video={0}>
      <CmnBanner title="O anma" navigation="O nama" />
      
      <Agency />

      
      <CtaTwo />
    </Layout>
  );
};

export default AboutUs;
