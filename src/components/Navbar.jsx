import { useState } from "react";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import ActionButton from "./ActionButton.jsx";
import { IkonCari } from "./Ikon.jsx";

const menu = [
  { to: "/", label: "Beranda" },
  { to: "/jelajahi", label: "Jelajahi" },
];

const kelasMenu = ({ isActive }) =>
  isActive
    ? "text-sm font-semibold text-neutral-950"
    : "text-sm text-neutral-600 underline-offset-4 transition hover:text-neutral-900 hover:underline";

function KolomCari({ awal }) {
  const navigate = useNavigate();
  const [kata, setKata] = useState(awal);

  const cari = (e) => {
    e.preventDefault();
    const k = kata.trim();
    navigate(k ? `/?cari=${encodeURIComponent(k)}` : "/");
  };

  return (
    <form onSubmit={cari} role="search" className="order-last w-full md:order-0 md:w-72">
      <label htmlFor="cari-barang" className="sr-only">Cari barang</label>
      <div className="relative">
        <IkonCari width={14} height={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-500" />
        <input
          id="cari-barang"
          type="text"
          value={kata}
          onChange={(e) => setKata(e.target.value)}
          placeholder="Cari barang yang anda butuhkan"
          className="w-full rounded-md border border-neutral-300 bg-white py-1.5 pl-8 pr-3 text-xs outline-none focus:ring-2 focus:ring-lime-brand"
        />
      </div>
    </form>
  );
}

export default function Navbar() {
  const [params] = useSearchParams();
  const awal = params.get("cari") ?? "";

  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white">
      <div className="mx-auto flex w-full max-w-[1920px] flex-wrap items-center gap-x-6 gap-y-3 px-5 py-3 sm:px-[4%] lg:px-[5%]">
        <Link to="/" className="font-display text-lg font-bold">
          Guna<span className="text-lime-600">Lagi</span>
        </Link>

        <KolomCari key={awal} awal={awal} />

        <nav className="flex items-center gap-6 md:ml-6 md:gap-12 lg:ml-10 lg:gap-16" aria-label="Menu utama">
          {menu.map((m) => (
            <NavLink key={m.to} to={m.to} end={m.to === "/"} className={kelasMenu}>
              {m.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <Link to="/login" className="text-xs font-semibold underline-offset-4 hover:underline">
            Log In
          </Link>
          <ActionButton to="/bagikan" perluLogin size="sm">Mulai Sekarang</ActionButton>
        </div>
      </div>
    </header>
  );
}