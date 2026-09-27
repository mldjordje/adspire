import { localePath, type LocaleCode } from "@/lib/site-config";
import { getCallCopy } from "./callCopy";
import styles from "./CallBannerV4.module.css";

/**
 * "No time to write? Book a call." — for pages whose main job is a form.
 * Some visitors would rather talk for twenty minutes than type a brief; this
 * gives them that door without taking the form away from the rest.
 */
export function CallBannerV4({
  locale = "sr",
  cta,
  topic = "",
}: {
  locale?: LocaleCode;
  /** data-cta name, e.g. "upit-brzo-razgovor". */
  cta: string;
  topic?: string;
}) {
  const t = getCallCopy(locale);
  const sr = t.lang === "sr";
  return (
    <aside className={styles.banner}>
      <span className={styles.live} aria-hidden="true" />
      <p className={styles.text}>
        <strong>{sr ? "Nemate vremena da pišete?" : "No time to write it all down?"}</strong>
        <span>
          {sr
            ? "Zakažite razgovor od 20 minuta, telefonom ili preko Google Meet-a."
            : "Book a 20-minute call, by phone or Google Meet."}
        </span>
      </p>
      <a className={styles.btn} href={localePath("/razgovor", locale)} data-call={topic} data-cta={cta} data-cursor="on">
        {t.ctaShort}
        <span aria-hidden="true">→</span>
      </a>
    </aside>
  );
}
