import { Link, useParams } from "react-router-dom";
import { kategori } from "../data/kategori.js";
import { getSession } from "../services/authService.js";

export default function BelumDibuat({ judul }) {
  const { slug } = useParams();
  const namaKategori = kategori.find((k) => k.slug === slug)?.nama;
  const nama = judul ?? (namaKategori ? `Halaman kategori ${namaKategori}` : "Halaman ini");

  // Sudah login: kembali ke Beranda auth. Belum login: ke Beranda publik.
  const kembali = getSession() ? "/beranda" : "/";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-black px-6 text-center text-white">
      <h1 className="font-display text-2xl font-bold sm:text-3xl">{nama} belum dibuat</h1>
      <p className="max-w-md text-sm text-neutral-300">Halaman ini masih dalam pengerjaan.</p>
      <Link
        to={kembali}
        className="mt-2 rounded-lg bg-lime-brand px-5 py-2.5 text-sm font-semibold text-neutral-950 hover:bg-lime-brand-dark"
      >
        Kembali ke Beranda
      </Link>
    </main>
  );
}