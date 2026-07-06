"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HomeV4.module.css";

/**
 * Live AI-agent chat demo — ported from the "Signal" concept landing.
 * Four scripted conversations play out with typing indicators; carousel
 * auto-advances, arrows/dots for manual control. Playback starts when the
 * section scrolls into view.
 */

type Msg = readonly [who: "agent" | "user", text: string];

const CHATS: { name: string; solve: string; msgs: Msg[] }[] = [
  {
    name: "AI agent · Zakazivanje",
    solve: "Rešava: propuštene termine i duple rezervacije",
    msgs: [
      ["agent", "Zdravo! Koliko termina vodite dnevno?"],
      ["user", "Oko 30, sve preko telefona."],
      ["agent", "To pravi duple rezervacije i jede vreme. AI agent + booking preuzima zakazivanje 24/7 — bez osoblja."],
      ["user", "Koliko brzo se postavlja?"],
      ["agent", "MVP za 2 nedelje. Da rezervišem besplatnu konsultaciju?"],
      ["user", "Može, sutra."],
      ["agent", "Zakazano ✓ Sutra 15h. Potvrda na mejlu. Vidimo se!"],
    ],
  },
  {
    name: "AI agent · Podrška",
    solve: "Rešava: sporu podršku i ponavljajuća pitanja",
    msgs: [
      ["agent", "Koliko upita podrške dobijate dnevno na webshopu?"],
      ["user", "Previše — gde mi je porudžbina, povraćaj, dostupnost..."],
      ["agent", "90% toga je ponavljajuće. AI agent odgovara odmah, na srpskom, 24/7 — a čoveku predaje samo složeno."],
      ["user", "A integracija sa našim sistemom?"],
      ["agent", "Povezujemo se na shop i CRM preko API-ja. Tiketi se sami kategorišu."],
      ["agent", "Hoćete primer na vašim podacima?"],
    ],
  },
  {
    name: "AI agent · Leadovi",
    solve: "Rešava: nekvalifikovane upite i izgubljeno vreme",
    msgs: [
      ["agent", "Koliko upita za nekretnine dobijate nedeljno?"],
      ["user", "Mnogo, ali većina nije ozbiljna."],
      ["agent", "AI agent kvalifikuje svaki upit — budžet, lokacija, rok — i zakazuje obilazak samo sa ozbiljnima."],
      ["user", "Znači filtrira umesto agenta?"],
      ["agent", "Tako je. Tim priča samo sa spremnim kupcima, ostalo agent neguje automatski."],
      ["agent", "Da pokažem na vašoj ponudi?"],
    ],
  },
  {
    name: "AI agent · Dokumenti",
    solve: "Rešava: ručno čitanje ugovora i dosijea",
    msgs: [
      ["agent", "Koliko vremena trošite na čitanje ugovora i dosijea?"],
      ["user", "Sate. Sve ručno."],
      ["agent", "AI čita, sumira i vadi ključne klauzule i rokove — za sekunde, sa referencama na izvor."],
      ["user", "A poverljivost podataka?"],
      ["agent", "Radi privatno, na vašoj infrastrukturi. Ništa ne napušta firmu."],
      ["agent", "Hoćete demo na jednom vašem dokumentu?"],
    ],
  },
];

type Shown = { who: "agent" | "user"; text: string } | { who: "typing" };

export function AiDemoV4() {
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
        <button className={styles.chatArrow} aria-label="Prethodni" data-cursor="on" onClick={() => go(cur - 1)}>
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
        <button className={styles.chatArrow} aria-label="Sledeći" data-cursor="on" onClick={() => go(cur + 1)}>
          →
        </button>
      </div>
    </div>
  );
}
