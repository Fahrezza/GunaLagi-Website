import { Link } from "react-router-dom";
import { getSession } from "../services/authService.js";

// Ke mana pengunjung yang belum login dikirim. Ganti ke "/daftar" kalau ingin ke pendaftaran.
export const HALAMAN_GERBANG = "/login";

export default function GatedLink({ to, perluLogin = false, children, ...props }) {
  const terkunci = perluLogin && !getSession();

  return (
    <Link
      to={terkunci ? HALAMAN_GERBANG : to}
      state={terkunci ? { from: to } : undefined}
      {...props}
    >
      {children}
    </Link>
  );
}