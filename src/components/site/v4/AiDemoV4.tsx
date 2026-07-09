"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HomeV4.module.css";
import { getV4Copy } from "./copy";
import { defaultLocale, type LocaleCode } from "@/lib/site-config";

/**
 * Live AI-agent chat demo — ported from the "Signal" concept landing.
 * Four scripted conversations play out with typing indicators; carousel
 * auto-advances, arrows/dots for manual control. Playback starts when the
 * section scrolls into view. Copy is localized via copy.ts (getV4Copy).
 */

type Shown = { who: "agent" | "user"; text: string } | { who: "typing" };

export function AiDemoV4({ locale = defaultLocale }: { locale?: LocaleCode } = {}) {
  const t = getV4Copy(locale);
  const CHATS = t.aiDemo.chats;
  const [cur, setCur] = useState(0);
  const [shown, setShown] = useState<Shown[]>([]);
  const timersRef = useRef<number[]>([]);
  const startedRef = useRef(false);
  const curRef = useRef(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const clr = () => {
    timersRef.current.forEach(window.clearTimeout);
    timersRef.current = [];
  };

  const go = (i: number) => {
    const next = (i + CHATS.length) % CHATS.length;
    curRef.current = next;
    setCur(next);
    play(next);
  };

  const play = (i: number) => {
    clr();
    setShown([]);
    let d = 350;
    const push = (fn: () => void, at: number) => {
      timersRef.current.push(window.setTimeout(fn, at));
    };
    CHATS[i].msgs.forEach(([who, text]) => {
      if (who === "agent") {
        push(() => setShown((s) => [...s, { who: "typing" }]), d);
        d += 700;
        push(
          () => setShown((s) => [...s.filter((m) => m.who !== "typing"), { who: "agent", text }]),
          d,
        );
        d += 800 + text.length * 6;
      } else {
        push(() => setShown((s) => [...s, { who: "user", text }]), d);
        d += 700;
      }
    });
    push(() => {
      if (curRef.current === i) go(i + 1);
    }, d + 3200);
  };

  // start playback when scrolled into view
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !startedRef.current) {
          startedRef.current = true;
          go(0);
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clr();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // keep newest message in view
  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [shown]);

  return (
    <div ref={wrapRef} className={styles.chatWrap}>
      <div className={styles.chatTrack} style={{ transform: `translateX(${-cur * 100}%)` }}>
        {CHATS.map((ch, i) => (
          <div key={ch.name} className={styles.chatSlide} aria-hidden={i !== cur}>
            <div className={styles.chat}>
              <div className={styles.chatHead}>
                <div className={styles.chatAvatar}>
                  <span className={styles.chatDot} />
                </div>
                <div className={styles.chatMeta}>
                  <b>{ch.name}</b>
                  <span>{ch.solve}</span>
                </div>
              </div>
              <div ref={i === cur ? bodyRef : undefined} className={styles.chatBody}>
                {i === cur &&
                  shown.map((m, k) =>
                    m.who === "typing" ? (
                      <div key={k} className={`${styles.chatMsg} ${styles.chatMsgAgent} ${styles.chatTyping}`}>
                        <i />
                        <i />
                        <i />
                      </div>
                    ) : (
                      <div
                        key={k}
                        className={`${styles.chatMsg} ${m.who === "agent" ? styles.chatMsgAgent : styles.chatMsgUser}`}
                      >
                        {m.text}
                      </div>
                    ),
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.chatNav}>
        <button className={styles.chatArrow} aria-label={t.aiDemo.prev} data-cursor="on" onClick={() => go(cur - 1)}>
          ←
        </button>
        <div className={styles.chatDots}>
          {CHATS.map((_, i) => (
            <button
              key={i}
              aria-label={`Chat ${i + 1}`}
              className={i === cur ? styles.chatDotOn : undefined}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <button className={styles.chatArrow} aria-label={t.aiDemo.next} data-cursor="on" onClick={() => go(cur + 1)}>
          →
        </button>
      </div>
    </div>
  );
}
