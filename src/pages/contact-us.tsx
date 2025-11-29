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
        title={t("contact.pageTitle")}
        navigation={t("contact.pageNav")}
        subtitle={t("banner.servicesSubtitle")}
      />
      <ContactMain />
    </Layout>
  );
};

export default ContactUs;
