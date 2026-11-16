import { IkonPin, IkonKalender, IkonHati } from "./IkonDetail.jsx";
import { waktuLalu } from "../../utils/waktu.js";

const pil =
  "rounded-full border border-neutral-500 bg-white px-3 py-0.5 text-[11px] font-semibold text-neutral-900";

export default function RingkasanBarang({ barang, labelCara, labelKondisi, tertarik }) {
  const deskripsi = barang.deskripsi?.trim();
  const kekurangan = barang.catatan?.trim();

  return (
    <section className="mt-6 grid grid-cols-[1.6fr_1fr] gap-8 rounded-xl border border-neutral-300 bg-neutral-100 p-6 shadow-sm">
      <div>
        <div className="flex flex-wrap gap-2">
          <span className={pil}>{labelCara}</span>
          {labelKondisi !== "-" && <span className={pil}>{labelKondisi}</span>}
        </div>

        <h1 className="mt-3 font-display text-2xl font-bold text-forest">{barang.nama}</h1>

        <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-neutral-600">
          <span className="flex items-center gap-1.5">
            <IkonPin width={16} height={16} />
            {barang.kota || "-"}
          </span>
          <span className="flex items-center gap-1.5">
            <IkonKalender width={16} height={16} />
            {waktuLalu(barang.dibuat) || "-"}
          </span>
          <span className="flex items-center gap-1.5">
            <IkonHati width={16} height={16} />
            {tertarik} Tertarik
          </span>
        </div>

        <h2 className="mt-5 font-display text-lg font-bold">Deskripsi</h2>
        <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-neutral-600">
          {deskripsi || "Pemilik belum menambahkan deskripsi."}
        </p>
      </div>

      <div>
        <h2 className="font-display text-lg font-bold">Catatan kekurangan</h2>
        <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-neutral-600">
          {kekurangan || "Pemilik tidak mencatat kekurangan pada barang ini."}
        </p>
      </div>
    </section>
  );
}