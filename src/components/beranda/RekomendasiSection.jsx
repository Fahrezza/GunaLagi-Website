import { Link } from "react-router-dom";
import BarangCard from "../BarangCard.jsx";
import GatedLink from "../GatedLink.jsx";

export default function RekomendasiSection({ items, kataKunci, sectionRef, kartuHover = false }) {
  const tampil = kataKunci ? items : items.slice(0, 8);

  return (
    <section
      ref={sectionRef}
      className="mx-auto w-full max-w-[1920px] scroll-mt-20 px-5 pb-24 pt-4 sm:px-[4%] lg:px-[5%]"
    >
      <div className="mb-8 flex items-end justify-between gap-4">
        <h2 className="border-b border-neutral-300 pb-2 pr-10 font-display text-xl font-bold text-forest">
          {kataKunci ? `Hasil untuk “${kataKunci}”` : "Rekomendasi Barang"}
        </h2>
        <GatedLink to="/jelajahi" perluLogin className="text-xs font-semibold underline-offset-4 hover:underline">
          Lihat Semua
        </GatedLink>
      </div>

      {tampil.length > 0 ? (
        // 3 kolom mulai 640px. Kartu dibatasi 280px dan diletakkan di tengah kolomnya,
        // celah antar kartu membesar bertahap: 12px → 24px → 40px.
        <div className="grid grid-cols-1 justify-items-center gap-x-3 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-x-6 sm:gap-y-8 lg:gap-x-10">
          {tampil.map((b) => (
            <div key={b.id} className="w-full max-w-[280px]">
              <BarangCard barang={b} hover={kartuHover} />
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-neutral-300 px-6 py-12 text-center text-sm text-neutral-600">
          {kataKunci ? (
            <>
              <p>Tidak ada barang yang cocok dengan “{kataKunci}”.</p>
              <Link to="/" className="mt-2 inline-block font-semibold underline">Hapus pencarian</Link>
            </>
          ) : (
            <>
              <p>Belum ada barang yang dibagikan.</p>
              <Link to="/daftar" className="mt-2 inline-block font-semibold underline">
                Daftar dan jadilah yang pertama berbagi
              </Link>
            </>
          )}
        </div>
      )}
    </section>
  );
}