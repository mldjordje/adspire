import React from "react";
import Layout from "@/components/layout/Layout";
import HomeOneBanner from "@/components/layout/banner/HomeOneBanner";
import Agency from "@/components/containers/home/Agency";
import PortfolioText from "@/components/containers/home/PortfolioText";
import HomeOffer from "@/components/containers/home/HomeOffer";
import LocalRecommendation from "@/components/containers/home/LocalRecommendation";
import NextPage from "@/components/containers/home/NextPage";
import ContactMain from "@/components/containers/ContactMain";

const Home = () => {
  return (
    <Layout header={1} footer={4} video={false}>
      <HomeOneBanner />
      <PortfolioText />
      <Agency />
      <HomeOffer />
      <LocalRecommendation />
      <ContactMain />
      <NextPage />
    </Layout>
  );
};

export default Home;

export { getCommonStaticProps as getStaticProps } from "@/lib/getCommonStaticProps";
