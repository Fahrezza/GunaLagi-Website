import { Link } from "react-router-dom";
import { IkonCentang } from "./IkonBagikan.jsx";

export default function BerhasilBagikan() {
  return (
    <div className="mt-6">
      <div
        role="status"
        className="flex min-h-52 flex-col items-center justify-center rounded-xl border border-neutral-300 bg-neutral-100 px-6 py-10 text-center"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white">
          <IkonCentang width={14} height={14} />
        </span>
        <h2 className="mt-4 font-display text-lg font-bold">Barang berhasil dibagikan!</h2>
        <p className="mt-1 text-xs text-neutral-600">Barang kamu berhasil dibagikan!</p>
      </div>

      <Link
        to="/beranda"
        className="mt-8 flex w-full items-center justify-center rounded-lg bg-forest px-4 py-3 text-sm font-semibold text-white transition hover:bg-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}