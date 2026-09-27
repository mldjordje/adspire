import { PageShellV4 } from "@/components/site/v4/PageShellV4";
import type { LocaleCode } from "@/lib/site-config";
import { CallBookingV4 } from "./CallBookingV4";
import { getCallCopy } from "./callCopy";
import styles from "./CallPageV4.module.css";

/**
 * /razgovor — the no-JavaScript target of every "book a call" button, and the
 * link that goes into mail signatures and ads. With JavaScript most visitors
 * never land here: the drawer opens in place instead.
 */
export function CallPageV4({ locale = "sr" }: { locale?: LocaleCode }) {
  const t = getCallCopy(locale);
  return (
    <PageShellV4
      locale={locale}
      eyebrow={t.eyebrow}
      title={
        <>
          {t.title}
          <span className={styles.dot}>.</span>
        </>
      }
      intro={t.lead}
      callDock={false}
    >
      <section className={styles.wrap}>
        <div className={styles.card}>
          <CallBookingV4 locale={locale} source={locale === "sr" ? "/razgovor" : `/${locale}/razgovor`} />
        </div>
        <aside className={styles.side}>
          <p className={styles.sideTitle}>{t.lang === "sr" ? "Šta se desi na razgovoru" : "What happens on the call"}</p>
          <ol className={styles.sideList}>
            {(t.lang === "sr"
              ? [
                  "Kažete šta vam treba, svojim rečima. Ne morate znati tehničke izraze.",
                  "Kažem vam šta ima smisla, a šta ne, i otprilike koliko košta.",
                  "Ako ima smisla da nastavimo, šaljem ponudu. Ako nema, rekao sam vam to na razgovoru.",
                ]
              : [
                  "You tell me what you need, in your own words. No jargon needed.",
                  "I tell you what makes sense, what does not, and roughly what it costs.",
                  "If it makes sense to continue, you get a written offer. If not, you heard it on the call.",
                ]
            ).map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ol>
        </aside>
      </section>
    </PageShellV4>
  );
}
