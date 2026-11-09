import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Alamat yang persis sama dan memakai tata letak desktop yang diperkecil di ponsel.
const HALAMAN_DESKTOP = ["/", "/beranda", "/permintaan"];

// Alamat yang diawali teks ini juga ikut, misalnya "/barang" mencakup "/barang/c1".
const AWALAN_DESKTOP = [];

export default function ViewportAtur() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = document.querySelector('meta[name="viewport"]');
    if (!meta) return;

    const ponsel = Math.min(screen.width, screen.height) < 768;
    const cocok =
      HALAMAN_DESKTOP.includes(pathname) ||
      AWALAN_DESKTOP.some((a) => pathname.startsWith(a));

    meta.setAttribute(
      "content",
      ponsel && cocok ? "width=1152" : "width=device-width, initial-scale=1.0"
    );
  }, [pathname]);

  return null;
}