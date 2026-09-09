import Image from "next/image";
import { hotelCopy, HOTEL_PATH } from "@/content/site/hotel";
import { localePath, type LocaleCode } from "@/lib/site-config";
import styles from "./HotelExperience.module.css";

export function HotelPromo({ locale }: { locale: LocaleCode }) {
  const t = hotelCopy[locale];
  return <section className={styles.promo}>
    <div><h2>{t.headline[0]}<br />{t.headline[2]}</h2><p>{t.intro}</p><a className={styles.primary} href={localePath(HOTEL_PATH, locale)} data-cta="hotel-promo">{t.explore}<span>↗</span></a></div>
    <div className={styles.promoImage}><Image src="/images/hotel/maison.webp" alt="" fill sizes="(max-width: 800px) 90vw, 40vw" /><span>{t.ui.direct} ↗</span></div>
  </section>;
}
