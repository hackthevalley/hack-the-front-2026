"use client";

type Sticker = {
  id: string;
  src: string;
  className: string;
};

const STICKERS: Sticker[] = [
  { id: "top-blueleaf", src: "/application/blueLeaf.svg", className: "absolute left-[14%] top-[-60px] w-[90px] -rotate-12 opacity-90" },
  { id: "top-clover", src: "/application/clover.svg", className: "absolute left-[19%] top-[-20px] w-[60px] opacity-90" },
  { id: "top-clover2", src: "/application/clover2.svg", className: "absolute left-[26%] top-[10px] w-[46px] opacity-80" },
  { id: "top-sparkle", src: "/application/sparkle.svg", className: "absolute left-[8%] top-[24%] w-[22px]" },

  { id: "candles", src: "/application/candles.svg", className: "absolute right-[-60px] top-[-40px] w-[380px]" },
  { id: "right-sparkle", src: "/application/sparkle.svg", className: "absolute right-[6%] top-[18%] w-[20px]" },

  { id: "left-darkleaf", src: "/application/darkLeaf.svg", className: "absolute left-[-90px] top-[18%] w-[220px] opacity-90" },

  { id: "coffee", src: "/application/coffee.svg", className: "absolute left-[-100px] bottom-[-140px] w-[360px]" },
  { id: "mushroom-group", src: "/application/mushroomGroup.svg", className: "absolute left-[11%] bottom-[3%] w-[130px]" },
  { id: "clover2-bottom", src: "/application/clover2.svg", className: "absolute left-[19%] bottom-[10%] w-[54px] opacity-90" },
  { id: "bottom-sparkle", src: "/application/sparkle.svg", className: "absolute left-[24%] bottom-[26%] w-[18px]" },

  { id: "pencil", src: "/application/pencil.svg", className: "absolute right-[1%] bottom-[-30px] w-[300px] rotate-[12deg]" },
  { id: "star", src: "/application/star.svg", className: "absolute right-[19%] bottom-[24%] w-[34px]" },
];

const BACKDROP =
  "radial-gradient(120% 100% at 50% -10%, #241C6B 0%, #0B0730 55%, #05041C 100%)";

export default function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ background: BACKDROP }}
    >
      {STICKERS.map((sticker) => (
        <img
          key={sticker.id}
          src={sticker.src}
          alt=""
          draggable="false"
          className={`${sticker.className} max-w-none select-none`}
        />
      ))}
    </div>
  );
}
