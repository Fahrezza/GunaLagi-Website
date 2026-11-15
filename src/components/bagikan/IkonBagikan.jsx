const dasar = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export const IkonCentang = (props) => (
  <svg {...dasar} {...props}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const IkonSilang = (props) => (
  <svg {...dasar} {...props}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export const IkonTambah = (props) => (
  <svg {...dasar} {...props}>
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);