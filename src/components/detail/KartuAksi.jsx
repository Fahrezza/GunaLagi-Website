import { Link } from "react-router-dom";
import GatedLink from "../GatedLink.jsx";

const tombol =
  "flex h-10 w-full items-center justify-center rounded-lg text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";

export default function KartuAksi({ barang, donasi, milikSendiri }) {
  if (milikSendiri) {
    return (
      <section className="rounded-xl border border-neutral-300 bg-neutral-100 p-3 shadow-sm">
        <p className="text-sm font-semibold text-forest">Ini barang milikmu</p>
        <p className="mt-1 text-xs text-neutral-600">
          Kamu tidak dapat mengajukan permintaan untuk barangmu sendiri. Cek permintaan yang masuk dari pengguna lain.
        </p>
        <Link to="/permintaan" className={`${tombol} mt-3 bg-forest text-white hover:bg-neutral-900`}>
          Lihat Permintaan Masuk
        </Link>
      </section>
    );
  }

  // Donasi memakai tombol lime, Barter / Tukar memakai tombol hijau tua (sesuai Figma).
  const warna = donasi
    ? "bg-lime-brand text-neutral-950 hover:bg-lime-brand-dark"
    : "bg-forest text-white hover:bg-neutral-900";
  const tujuanPesan = `/pesan?dengan=${encodeURIComponent(barang.pemilikId ?? barang.pemilik)}`;
  const tujuanAjukan = donasi
  ? `/barang/${barang.id}/minta`
  : `/barang/${barang.id}/barter`;

  return (
    <section className="space-y-2 rounded-xl border border-neutral-300 bg-neutral-100 p-3 shadow-sm">
      <GatedLink to={tujuanAjukan} perluLogin className={`${tombol} ${warna}`}>
        {donasi ? "Ajukan Permintaan" : "Ajukan Pertukaran"}
      </GatedLink>
      <GatedLink
        to={tujuanPesan}
        perluLogin
        className={`${tombol} border border-neutral-500 bg-white text-neutral-950 hover:bg-neutral-100`}
      >
        Hubungi Pemilik
      </GatedLink>
    </section>
  );
}