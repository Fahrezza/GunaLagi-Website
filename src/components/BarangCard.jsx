import { Link } from "react-router-dom";

export default function BarangCard({ barang, hover = false }) {
  const { id, pemilik, kota, nama, kategori, deskripsi, foto } = barang;
  const efek = hover
    ? " hover:border-neutral-400 hover:bg-neutral-50 hover:shadow-lg active:bg-neutral-50"
    : "";

  return (
    <Link
      to={`/barang/${id}`}
      aria-label={`Lihat detail ${nama}`}
      className={`flex flex-col rounded-xl border border-neutral-200 bg-white p-2.5 shadow-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest sm:p-3${efek}`}
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="h-6 w-6 shrink-0 rounded-full bg-neutral-200" aria-hidden="true" />
        <div className="leading-tight">
          <p className="text-sm font-semibold">{pemilik}</p>
          <p className="text-[11px] text-neutral-500">{kota}</p>
        </div>
      </div>

      {foto ? (
        <img src={foto} alt={nama} loading="lazy" className="aspect-4/3 w-full rounded-md object-cover" />
      ) : (
        <div className="aspect-4/3 w-full rounded-md bg-neutral-200" aria-hidden="true" />
      )}

      <h3 className="mt-3 text-sm font-semibold">{nama}</h3>
      <p className="text-[11px] text-neutral-500">{kategori}</p>
      <p className="mt-2 line-clamp-3 text-xs text-neutral-600">{deskripsi}</p>
    </Link>
  );
}