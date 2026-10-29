import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/authService.js";
import { IkonUser, IkonTukar, IkonKeluar, IkonPanah } from "./Ikon.jsx";

const kelasItem =
  "flex w-full items-center gap-3 px-5 py-2.5 text-left text-sm font-semibold text-forest transition hover:bg-lime-soft";

export default function ProfileMenu({ user }) {
  const [buka, setBuka] = useState(false);
  const wadah = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!buka) return;

    const klikLuar = (e) => {
      if (wadah.current && !wadah.current.contains(e.target)) setBuka(false);
    };
    const tekanEsc = (e) => {
      if (e.key === "Escape") setBuka(false);
    };

    document.addEventListener("pointerdown", klikLuar);
    document.addEventListener("keydown", tekanEsc);
    return () => {
      document.removeEventListener("pointerdown", klikLuar);
      document.removeEventListener("keydown", tekanEsc);
    };
  }, [buka]);

  const keluar = () => {
    logout();
    navigate("/", { replace: true });
  };

  const inisial = (user?.name ?? "?").trim().charAt(0).toUpperCase();

  return (
    <div ref={wadah} className="relative">
      <button
        type="button"
        onClick={() => setBuka((b) => !b)}
        aria-haspopup="menu"
        aria-expanded={buka}
        aria-label="Menu akun"
        className={`flex items-center gap-2 rounded-full border py-1 pl-1 pr-3 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest ${
          buka
            ? "border-forest bg-lime-soft"
            : "border-transparent bg-transparent hover:bg-neutral-100 active:border-forest active:bg-lime-soft"
        }`}
      >
        <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-neutral-300 text-sm font-semibold text-neutral-700">
          {user?.picture ? (
            <img src={user.picture} alt="" referrerPolicy="no-referrer" className="h-full w-full object-cover" />
          ) : (
            inisial
          )}
        </span>
        <IkonPanah
          width={16}
          height={16}
          className={`text-forest transition-transform ${buka ? "rotate-180" : ""}`}
        />
      </button>

      {buka && (
        <div
          role="menu"
          className="absolute right-0 top-full z-30 mt-2 w-60 overflow-hidden rounded-2xl border border-forest/40 bg-white py-2 shadow-lg"
        >
          <hr className="mb-1 border-neutral-200" />

          <Link to="/akun" role="menuitem" onClick={() => setBuka(false)} className={kelasItem}>
            <IkonUser width={18} height={18} />
            Lihat Akun
          </Link>
          <Link to="/permintaan" role="menuitem" onClick={() => setBuka(false)} className={kelasItem}>
            <IkonTukar width={18} height={18} />
            Permintaan Barang
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={keluar}
            className="flex w-full items-center gap-3 px-5 py-2.5 text-left text-sm font-semibold text-red-500 transition hover:bg-red-50"
          >
            <IkonKeluar width={18} height={18} />
            Keluar
          </button>

          <hr className="mt-1 border-neutral-200" />
        </div>
      )}
    </div>
  );
}