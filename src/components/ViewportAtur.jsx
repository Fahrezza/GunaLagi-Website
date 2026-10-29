import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Halaman yang memakai tata letak desktop yang diperkecil di ponsel (sesuai Figma).
// Halaman lain memakai lebar ponsel biasa.
const HALAMAN_DESKTOP = ["/", "/beranda"];

export default function ViewportAtur() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = document.querySelector('meta[name="viewport"]');
    if (!meta) return;

    const ponsel = Math.min(screen.width, screen.height) < 768;
    const pakaiDesktop = ponsel && HALAMAN_DESKTOP.includes(pathname);

    meta.setAttribute(
      "content",
      pakaiDesktop ? "width=1152" : "width=device-width, initial-scale=1.0"
    );
  }, [pathname]);

  return null;
}