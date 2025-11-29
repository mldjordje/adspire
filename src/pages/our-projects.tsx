import React from "react";
import Layout from "@/components/layout/Layout";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import ProjectMain from "@/components/containers/project/ProjectMain";

import CtaTwo from "@/components/containers/service-details/CtaTwo";
import UxProcessTwo from "@/components/containers/service-details/UxProcessTwo";

const OurProjects = () => {
  return (
    <Layout header={2} footer={5} video={0}>
      <CmnBanner title="Gotovi projekti" navigation="Gotovi projekti" />
      <ProjectMain />
      <UxProcessTwo />
      <CtaTwo />
    </Layout>
  );
};

export default OurProjects;

export { getCommonStaticProps as getStaticProps } from "@/lib/getCommonStaticProps";
