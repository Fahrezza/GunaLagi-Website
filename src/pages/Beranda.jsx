import { Link } from "react-router-dom";

// halaman beranda akan dikerjakan berikutnya.
export default function Beranda() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-3">
      <h1 className="font-display text-2xl font-bold">Beranda</h1>
      <p className="text-sm text-neutral-600">Halaman ini belum dibuat.</p>
      <Link to="/login" className="text-sm font-semibold underline">Keluar</Link>
    </main>
  );
}