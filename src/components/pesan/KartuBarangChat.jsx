import { Link } from "react-router-dom";

export default function KartuBarangChat({ barang, kota }) {
  const donasi = barang.cara === "donasi";
  return (
    <Link
      to={`/barang/${barang.id}`}
      className="mx-4 mt-4 flex items-center gap-3 rounded-xl border border-neutral-300 bg-neutral-50 p-3 transition hover:border-neutral-400 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
    >
      {barang.foto ? (
        <img src={barang.foto} alt="" className="size-11 shrink-0 rounded-md object-cover" />
      ) : (
        <span className="size-11 shrink-0 rounded-md bg-neutral-200" aria-hidden="true" />
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold uppercase text-neutral-900">{barang.nama}</p>
        <p className="mt-1 flex items-center gap-2 text-[11px] text-neutral-500">
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
              donasi ? "bg-lime-brand text-neutral-950" : "bg-neutral-200 text-neutral-800"
            }`}
          >
            {donasi ? "Donasi" : "Barter / Tukar"}
          </span>
          {kota && <span className="truncate">{kota}</span>}
        </p>
      </div>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        strokeLinejoin="round" className="size-4 shrink-0 text-neutral-400" aria-hidden="true">
        <path d="m9 6 6 6-6 6" />
      </svg>
    </Link>
  );
}
