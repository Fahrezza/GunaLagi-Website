import { IkonPin, IkonKalender } from "./IkonDetail.jsx";
import { formatTanggal } from "../../utils/waktu.js";

export default function KartuPemilik({ pemilik, foto, kota, bergabung }) {
  const inisial = (pemilik ?? "?").trim().charAt(0).toUpperCase();

  return (
    <section className="rounded-xl border border-neutral-300 bg-neutral-100 p-4 shadow-sm">
      <h2 className="text-sm font-semibold text-forest">Pemilik Barang</h2>

      <div className="mt-2 flex items-center gap-3">
        {foto ? (
          <img src={foto} alt="" referrerPolicy="no-referrer" className="h-10 w-10 rounded-full object-cover" />
        ) : (
          <span
            aria-hidden="true"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-300 text-sm font-semibold text-neutral-700"
          >
            {inisial}
          </span>
        )}
        <p className="font-display text-lg font-bold">{pemilik}</p>
      </div>

      <div className="mt-3 flex justify-end gap-6">
        <div>
          <p className="text-[10px] text-neutral-500">Domisili</p>
          <p className="mt-0.5 flex items-center gap-1 text-[11px] font-semibold">
            <IkonPin width={14} height={14} />
            {kota || "-"}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-neutral-500">Bergabung pada</p>
          <p className="mt-0.5 flex items-center gap-1 text-[11px] font-semibold">
            <IkonKalender width={14} height={14} />
            {bergabung ? formatTanggal(bergabung) : "-"}
          </p>
        </div>
      </div>
    </section>
  );
}