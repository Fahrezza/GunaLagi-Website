
import { Link } from "react-router-dom";

export default function BarangCard({ barang, hover = false }) {
  const { id, pemilik, kota, nama, kategori, deskripsi, foto } = barang;

  const efek =
    "hover:-translate-y-0.5 hover:border-neutral-400 hover:shadow-md";

  return (
   <Link
  to={`/barang/${id}`}
  aria-label={`Lihat detail ${nama}`}
  className="group flex min-w-0 flex-col overflow-hidden rounded-lg border border-neutral-300 bg-white p-2.5 shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:border-neutral-400 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest sm:p-3"
>
      <div className="mb-2 flex items-center gap-2">
        <span
          className="h-6 w-6 shrink-0 rounded-full bg-neutral-200"
          aria-hidden="true"
        />

        <div className="min-w-0 leading-tight">
          <p className="truncate text-sm font-semibold text-neutral-900">
            {pemilik}
          </p>
          <p className="truncate text-[11px] text-neutral-500">
            {kota}
          </p>
        </div>
      </div>

      {foto ? (
        <img
          src={foto}
          alt={nama}
          loading="lazy"
          className="aspect-4/3 w-full rounded-md object-cover"
        />
      ) : (
        <div
          className="aspect-4/3 w-full rounded-md bg-neutral-200"
          aria-hidden="true"
        />
      )}

      <div className="flex flex-1 flex-col">
        <h3 className="text-sm font-semibold text-neutral-900">
          {nama}
        </h3>

        <p className="text-[11px] text-neutral-500">
          {kategori}
        </p>

        <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-neutral-600">
          {deskripsi}
        </p>
      </div>
    </Link>
  );
}
