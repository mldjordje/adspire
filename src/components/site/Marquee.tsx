import React from "react";

type MarqueeProps = {
  items: string[];
};

export function Marquee({ items }: MarqueeProps) {
  const loop = [...items, ...items];

  return (
    <div className="mxd-marquee" aria-hidden>
      <div className="mxd-marquee__track">
        {loop.map((item, index) => (
          <span key={`${item}-${index}`}>
            {item}
            <i aria-hidden>*</i>
          </span>
        ))}
      </div>
    </div>
  );
}
