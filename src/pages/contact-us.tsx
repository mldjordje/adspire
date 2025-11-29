import React from "react";
import { useTranslation } from "next-i18next";
import Layout from "@/components/layout/Layout";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import ContactMain from "@/components/containers/ContactMain";

const ContactUs = () => {
  const { t } = useTranslation("common");

  return (
    <Layout header={2} footer={5} video={0}>
      <CmnBanner
        title={t("contact.pageTitle") as string}
        navigation={t("contact.pageNav") as string}
        subtitle={t("banner.servicesSubtitle") as string}
      />
      <ContactMain />
    </Layout>
  );
};

export default ContactUs;

export { getCommonStaticProps as getStaticProps } from "@/lib/getCommonStaticProps";
