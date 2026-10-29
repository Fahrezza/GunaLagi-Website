import { Link } from "react-router-dom";
import { kategori } from "../../data/kategori.js";
import { IkonBaju, IkonLaptop, IkonSofa, IkonBuku } from "../Ikon.jsx";

const ikonKategori = {
  pakaian: IkonBaju,
  elektronik: IkonLaptop,
  perabotan: IkonSofa,
  buku: IkonBuku,
};

export default function KategoriSection() {
  return (
    <section className="mx-auto w-full max-w-[1920px] px-5 py-12 sm:px-[4%] lg:px-[5%]">
      <h2 className="mb-8 inline-block border-b border-neutral-300 pb-2 pr-10 font-display text-xl font-bold text-forest">
        Pilih Kategori Barang
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {kategori.map((k) => {
          const Ikon = ikonKategori[k.slug];
          return (
            <Link
              key={k.slug}
              to={`/kategori/${k.slug}`}
              className="flex h-full flex-col items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-5 sm:px-6 sm:py-8 text-center shadow-md transition hover:border-forest hover:bg-lime-soft active:border-forest active:bg-lime-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            >
              <Ikon width={32} height={32} className="text-forest" />
              <h3 className="mt-3 text-sm font-semibold">{k.nama}</h3>
              <p className="mt-2 text-xs text-neutral-600">{k.deskripsi}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}