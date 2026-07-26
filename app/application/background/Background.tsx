"use client";

type Sticker = {
  id: string;
  src: string;
  className: string;
};

type Cluster = {
  id: string;
  // Anchors the whole group to a screen edge/corner. Can mix px/% freely —
  // this only affects where the cluster sits on the page.
  wrapperClassName: string;
  // Positioned in px relative to the wrapper's anchor point (0,0), so
  // stickers keep their spacing to one another at every viewport size.
  stickers: Sticker[];
};

const CLUSTERS: Cluster[] = [
  {
    id: "top-left",
    wrapperClassName: "absolute left-[14%] top-[-60px]",
    stickers: [
      {
        id: "top-clover",
        src: "/application/clover.svg",
        className: "absolute left-[-13px] top-[40px] w-[50px] rotate-[20deg]",
      },
      {
        id: "top-clover2",
        src: "/application/clover2.svg",
        className: "absolute left-[-30px] top-[80px] w-[80px]",
      },
      {
        id: "clover2-bottom",
        src: "/application/clover2.svg",
        className:
          "absolute left-[124px] top-[95px] w-[54px] z-2 rotate-[-45deg]",
      },
      {
        id: "mushroom-group",
        src: "/application/mushroomGroup.svg",
        className: "absolute left-[50px] top-[70px] w-[130px]",
      },
      {
        id: "top-sparkle",
        src: "/application/sparkle.svg",
        className: "absolute left-[35px] top-[45px] w-[32px]",
      },
      {
        id: "top-sparkle2",
        src: "/application/sparkle.svg",
        className: "absolute left-[165px] top-[125px] w-[24px]",
      },
    ],
  },
  {
    id: "top-right",
    wrapperClassName: "absolute right-[-60px] top-[-40px]",
    stickers: [
      {
        id: "candles",
        src: "/application/candles.svg",
        className: "absolute right-[15px] top-[-40px] w-[380px]",
      },
      {
        id: "top-right-clover1",
        src: "/application/clover2.svg",
        className: "absolute right-[358px] top-[-5px] w-[76px] rotate-[22deg]",
      },
      {
        id: "top-right-clover2",
        src: "/application/clover2.svg",
        className: "absolute right-[375px] top-[94px] w-[56px] -rotate-[78deg]",
      },
      {
        id: "top-right-clover3",
        src: "/application/clover.svg",
        className:
          "absolute right-[-5px] top-[156px] w-[140px] rotate-[72deg] z-2",
      },
      {
        id: "right-sparkle",
        src: "/application/sparkle.svg",
        className: "absolute right-[210px] top-[120px] w-[50px]",
      },
      {
        id: "right-sparkle2",
        src: "/application/sparkle.svg",
        className: "absolute right-[400px] top-[41px] w-[40px]",
      },
    ],
  },
  {
    id: "bottom-left",
    wrapperClassName: "absolute left-[-100px] bottom-[-140px]",
    stickers: [
      {
        id: "coffee",
        src: "/application/coffee.svg",
        className: "absolute left-40 bottom-40 w-[360px]",
      },
      {
        id: "bottom-clover",
        src: "/application/clover2.svg",
        className: "absolute left-[200px] bottom-[430px] w-[60px] z-4",
      },
      {
        id: "bottom-sparkle",
        src: "/application/sparkle.svg",
        className: "absolute left-[411px] bottom-[359px] w-[18px]",
      },
      {
        id: "bottom-sparkle2",
        src: "/application/sparkle.svg",
        className: "absolute left-[190px] bottom-[320px] z-4 w-[40px]",
      },
      {
        id: "bottom-star",
        src: "/application/star.svg",
        className:
          "absolute left-[150px] bottom-[270px] w-[70px] z-4 rotate-[-12deg]",
      },
      {
        id: "mushroom",
        src: "/application/mushroom.svg",
        className: "absolute left-[480px] bottom-[148px] w-[100px]",
      },
      {
        id: "bottom-clover2",
        src: "/application/clover2.svg",
        className:
          "absolute left-[473px] bottom-[105px] w-[85px] rotate-[65deg] z-4",
      },
    ],
  },
  {
    id: "bottom-right",
    wrapperClassName: "absolute right-[1%] bottom-[-30px]",
    stickers: [
      {
        id: "pencil",
        src: "/application/pencil.svg",
        className: "absolute right-0 bottom-[30px] w-[300px]",
      },
      {
        id: "bottom-right-clover1",
        src: "/application/clover2.svg",
        className:
          "absolute right-[115px] bottom-[85px] w-[52px] rotate-[70deg]",
      },
      {
        id: "bottom-right-clover2",
        src: "/application/clover2.svg",
        className:
          "absolute right-[180px] bottom-[5px] w-[80px] rotate-[-10deg]",
      },
      {
        id: "star",
        src: "/application/star.svg",
        className: "absolute right-[30px] bottom-[143px] w-[60px] rotate-2",
      },
      {
        id: "bottom-right-sparkle",
        src: "/application/sparkle.svg",
        className: "absolute right-[60px] bottom-[40px] w-[35px]",
      },
    ],
  },
];

// Not tied to a corner cluster, so % is fine here.
// mushroom-group/clover2-bottom currently use top-% (not bottom-%), so they
// don't share coffee's coordinate frame — left them loose rather than guessing.
const LOOSE_STICKERS: Sticker[] = [
  {
    id: "top-blueleaf",
    src: "/application/blueLeaf.svg",
    className: "absolute left-[-170px] top-[130px] w-[320px] rotate-6",
  },
  {
    id: "left-darkleaf",
    src: "/application/darkLeaf.svg",
    className: "absolute left-[-330px] bottom-[-90px] w-[650px]",
  },
  {
    id: "left-clover",
    src: "/application/clover.svg",
    className:
      "absolute left-[-65px] bottom-[410px] w-[160px] rotate-[-5deg] z-4",
  },
  {
    id: "right-darkleaf",
    src: "/application/darkLeaf.svg",
    className:
      "absolute right-[-280px] bottom-[170px] w-[550px] scale-x-[-1] rotate-[-30deg] z-10",
  },
];

const BACKDROP =
  "radial-gradient(120% 100% at 50% -10%, #241C6B 0%, #0B0730 55%, #05041C 100%)";

// Soft vertical light-beam columns. Gradient runs the opposite way to the
// backdrop (blue at top fading to black at the bottom) so they read as
// light spilling down onto a floor that's dark at top / lit at bottom.
type Column = {
  id: string;
  left: string;
  width: string;
  opacity: number;
};

const COLUMNS: Column[] = [
  { id: "col-1", left: "8%", width: "50px", opacity: 0.35 },
  { id: "col-2", left: "26%", width: "34px", opacity: 0.25 },
  { id: "col-3", left: "50%", width: "60px", opacity: 0.3 },
  { id: "col-4", left: "72%", width: "38px", opacity: 0.25 },
  { id: "col-5", left: "90%", width: "46px", opacity: 0.35 },
];

export default function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ background: BACKDROP }}
    >
      {COLUMNS.map((column) => (
        <div
          key={column.id}
          className="absolute top-0 bottom-0 -translate-x-1/2"
          style={{
            left: column.left,
            width: column.width,
            opacity: column.opacity,
            background:
              "linear-gradient(180deg, #4A3FB8 0%, #241C6B 35%, #05041C 75%, #120D2E 100%)",
            filter: "blur(12px)",
          }}
        />
      ))}
      {CLUSTERS.map((cluster) => (
        <div key={cluster.id} className={cluster.wrapperClassName}>
          {cluster.stickers.map((sticker) => (
            <img
              key={sticker.id}
              src={sticker.src}
              alt=""
              draggable="false"
              className={`${sticker.className} max-w-none select-none`}
            />
          ))}
        </div>
      ))}
      {LOOSE_STICKERS.map((sticker) => (
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
