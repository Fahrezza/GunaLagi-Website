import { kategori } from "../../data/kategori.js";
import { IkonBaju, IkonLaptop, IkonSofa, IkonBuku } from "../Ikon.jsx";

export const MAKS_NAMA = 80;

const ikonKategori = {
  pakaian: IkonBaju,
  elektronik: IkonLaptop,
  perabotan: IkonSofa,
  buku: IkonBuku,
};

const kelasIsian =
  "w-full rounded-lg border bg-neutral-50 px-3 py-2 text-xs outline-none transition focus:ring-2 focus:ring-lime-brand";

export default function InformasiBarang({ nilai, onUbah, errors }) {
  return (
    <section className="rounded-xl border border-neutral-300 bg-neutral-100 p-5">
      <h2 className="font-display text-lg font-bold">Informasi Barang</h2>
      <p className="mt-1 text-xs text-neutral-600">
        Berikan informasi barang dengan jelas dan jujur agar calon penerima barang tahu apa yang mereka dapatkan
      </p>

      <div className="mt-4">
        <div className="mb-1 flex items-center justify-between">
          <label htmlFor="nama-barang" className="text-xs font-semibold">
            Nama Barang <span className="text-red-500">*</span>
          </label>
          <span className="text-[11px] text-neutral-500">
            {nilai.nama.length}/{MAKS_NAMA}
          </span>
        </div>
        <input
          id="nama-barang"
          type="text"
          maxLength={MAKS_NAMA}
          value={nilai.nama}
          onChange={(e) => onUbah("nama", e.target.value)}
          placeholder="Contoh: Baju Kaos Putih"
          aria-invalid={Boolean(errors.nama)}
          className={`${kelasIsian} ${errors.nama ? "border-red-500" : "border-neutral-300"}`}
        />
        {errors.nama && (
          <p className="mt-1 text-xs text-red-600" role="alert">
            {errors.nama}
          </p>
        )}
      </div>

      <div className="mt-4">
        <p id="label-kategori" className="mb-2 text-xs font-semibold">
          Kategori Barang <span className="text-red-500">*</span>
        </p>
        <div role="radiogroup" aria-labelledby="label-kategori" className="flex flex-wrap gap-2">
          {kategori.map((k) => {
            const Ikon = ikonKategori[k.slug];
            const dipilih = nilai.kategori === k.slug;
            return (
              <button
                key={k.slug}
                type="button"
                role="radio"
                aria-checked={dipilih}
                onClick={() => onUbah("kategori", k.slug)}
                className={`inline-flex items-center gap-1.5 rounded-full border border-forest px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest ${
                  dipilih ? "bg-forest text-white" : "bg-white text-forest hover:bg-lime-soft"
                }`}
              >
                <Ikon width={14} height={14} />
                {k.nama}
              </button>
            );
          })}
        </div>
        {errors.kategori && (
          <p className="mt-2 text-xs text-red-600" role="alert">
            {errors.kategori}
          </p>
        )}
      </div>

      <div className="mt-4">
        <label htmlFor="deskripsi-barang" className="mb-1 block text-xs font-semibold">
          Deskripsi
        </label>
        <textarea
          id="deskripsi-barang"
          maxLength={1000}
          value={nilai.deskripsi}
          onChange={(e) => onUbah("deskripsi", e.target.value)}
          placeholder="Contoh: Kaos putih merk sekian"
          className={`${kelasIsian} h-28 resize-none border-neutral-300`}
        />
      </div>

      <div className="mt-4">
        <label htmlFor="catatan-barang" className="mb-1 block text-xs font-semibold">
          Catatan Kekurangan
        </label>
        <textarea
          id="catatan-barang"
          maxLength={1000}
          value={nilai.catatan}
          onChange={(e) => onUbah("catatan", e.target.value)}
          placeholder="Contoh: Ada sedikit sobekan di bagian label"
          className={`${kelasIsian} h-28 resize-none border-neutral-300`}
        />
        <p className="mt-1 text-[11px] text-neutral-500">
          Opsional : Kosongkan jika tidak ada deskripsi atau kekurangan.
        </p>
      </div>
    </section>
  );
}