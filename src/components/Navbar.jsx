import { useState } from "react";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import ActionButton from "./ActionButton.jsx";
import ProfileMenu from "./ProfileMenu.jsx";
import { IkonCari, IkonPlus, IkonMenu, IkonTutup } from "./Ikon.jsx";
import { getSession } from "../services/authService.js";

const kelasMenu = ({ isActive }) =>
  `block py-2.5 text-sm md:py-0 ${
    isActive
      ? "font-semibold text-neutral-950"
      : "text-neutral-600 underline-offset-4 transition hover:text-neutral-900 hover:underline"
  }`;

function KolomCari({ awal, tujuan }) {
  const navigate = useNavigate();
  const [kata, setKata] = useState(awal);

  const cari = (e) => {
    e.preventDefault();
    const k = kata.trim();
    navigate(k ? `${tujuan}?cari=${encodeURIComponent(k)}` : tujuan);
  };

  return (
    <form onSubmit={cari} role="search" className="order-4 w-full md:order-2 md:w-72">
      <label htmlFor="cari-barang" className="sr-only">Cari barang</label>
      <div className="relative">
        <IkonCari width={14} height={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-500" />
        <input
          id="cari-barang"
          type="text"
          value={kata}
          onChange={(e) => setKata(e.target.value)}
          placeholder="Cari barang yang anda butuhkan"
          className="w-full rounded-md border border-neutral-300 bg-white py-2 pl-8 pr-3 text-base outline-none focus:ring-2 focus:ring-lime-brand md:py-1.5 md:text-xs"
        />
      </div>
    </form>
  );
}

export default function Navbar() {
  const [params] = useSearchParams();
  const [user] = useState(getSession);
  const [menuBuka, setMenuBuka] = useState(false);
  const awal = params.get("cari") ?? "";

  // Sudah login: Beranda mengarah ke /beranda. Belum login: ke Beranda publik.
  const berandaPath = user ? "/beranda" : "/";
  const menu = user
    ? [
        { to: "/beranda", label: "Beranda" },
        { to: "/jelajahi", label: "Jelajahi" },
        { to: "/pesan", label: "Pesan" },
      ]
    : [
        { to: "/", label: "Beranda" },
        { to: "/jelajahi", label: "Jelajahi" },
      ];

  const tutupMenu = () => setMenuBuka(false);

  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white">
      <div className="mx-auto flex w-full max-w-[1920px] flex-wrap items-center gap-x-3 gap-y-3 px-5 py-3 sm:px-[4%] md:gap-x-6 lg:px-[5%]">
        <Link to={berandaPath} className="order-1 font-display text-lg font-bold">
          Guna<span className="text-lime-600">Lagi</span>
        </Link>

        <KolomCari key={awal} awal={awal} tujuan={berandaPath} />

        {/* Mobile: panel yang dibuka lewat hamburger. Desktop: selalu tampil di baris yang sama. */}
        <nav
          id="menu-utama"
          aria-label="Menu utama"
          className={`${menuBuka ? "flex" : "hidden"} order-5 w-full flex-col border-t border-neutral-200 pt-1 md:order-3 md:ml-6 md:flex md:w-auto md:flex-row md:items-center md:gap-12 md:border-0 md:pt-0 lg:ml-10 lg:gap-16`}
        >
          {menu.map((m) => (
            <NavLink key={m.label} to={m.to} end onClick={tutupMenu} className={kelasMenu}>
              {m.label}
            </NavLink>
          ))}
          {!user && (
            <Link to="/login" onClick={tutupMenu} className="block py-2.5 text-sm font-semibold md:hidden">
              Log In
            </Link>
          )}
        </nav>

        <div className="order-2 ml-auto flex items-center gap-3 md:order-4 md:gap-4">
          {user ? (
            <>
              <ActionButton to="/bagikan" size="sm">
                <IkonPlus width={14} height={14} className="sm:mr-1.5" />
                <span className="sr-only sm:not-sr-only">Bagikan Barang</span>
              </ActionButton>
              <ProfileMenu user={user} />
            </>
          ) : (
            <>
              <Link to="/login" className="hidden py-2 text-xs font-semibold underline-offset-4 hover:underline md:inline">
                Log In
              </Link>
              <ActionButton to="/beranda" perluLogin size="sm">Mulai Sekarang</ActionButton>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMenuBuka((b) => !b)}
          aria-expanded={menuBuka}
          aria-controls="menu-utama"
          aria-label={menuBuka ? "Tutup menu" : "Buka menu"}
          className="order-3 flex h-10 w-10 items-center justify-center rounded-lg text-neutral-800 transition hover:bg-neutral-100 md:hidden"
        >
          {menuBuka ? <IkonTutup /> : <IkonMenu />}
        </button>
      </div>
    </header>
  );
}