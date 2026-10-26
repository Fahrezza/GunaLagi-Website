import GatedLink from "./GatedLink.jsx";

const warna = {
  lime: "bg-lime-brand text-neutral-950 hover:bg-lime-brand-dark",
  white: "bg-white text-neutral-950 hover:bg-neutral-200",
  outline: "border border-lime-brand/50 text-white hover:bg-white/10",
};

const ukuran = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
};

export default function ActionButton({ to, perluLogin = false, onClick, variant = "lime", size = "md", children }) {
  const kelas = `inline-flex items-center justify-center rounded-lg font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-brand ${warna[variant]} ${ukuran[size]}`;

  return to ? (
    <GatedLink to={to} perluLogin={perluLogin} className={kelas}>{children}</GatedLink>
  ) : (
    <button type="button" onClick={onClick} className={kelas}>{children}</button>
  );
}