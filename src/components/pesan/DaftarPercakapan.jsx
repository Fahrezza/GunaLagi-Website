import Avatar from "../akun/Avatar.jsx";
import { relatif } from "../../utils/waktuPesan.js";

export default function DaftarPercakapan({ daftar, aktifId, saya, cari, onCari, onPilih }) {
  const kata = cari.trim().toLowerCase();
  const tampil = kata
    ? daftar.filter(
        (c) =>
          c.lawan.nama.toLowerCase().includes(kata) || c.barang.nama.toLowerCase().includes(kata)
      )
    : daftar;

  return (
    <aside className="flex min-h-0 flex-col border-r border-neutral-300 bg-neutral-50">
      <div className="border-b border-neutral-200 p-4">
        <input
          type="search"
          value={cari}
          onChange={(e) => onCari(e.target.value)}
          placeholder="Cari percakapan.."
          aria-label="Cari percakapan"
          className="h-9 w-full rounded-lg border border-neutral-400 bg-white px-3 text-xs focus:border-forest focus:outline-none focus:ring-2 focus:ring-lime-brand/50"
        />
      </div>

      <ul className="min-h-0 flex-1 overflow-y-auto">
        {tampil.length === 0 ? (
          <li className="px-4 py-10 text-center text-xs text-neutral-500">
            {kata ? "Tidak ada percakapan yang cocok." : "Belum ada percakapan."}
          </li>
        ) : (
          tampil.map((c) => {
            const aktif = c.id === aktifId;
            const preview = c.terakhir
              ? `${c.terakhir.dari === saya ? "Kamu: " : ""}${c.terakhir.teks}`
              : "Belum ada pesan";
            return (
              <li key={c.id} className="border-b border-neutral-200">
                <button
                  type="button"
                  onClick={() => onPilih(c.id)}
                  aria-current={aktif ? "true" : undefined}
                  className={`flex w-full items-start gap-3 px-4 py-3 text-left transition focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-forest ${
                    aktif ? "bg-lime-soft" : "hover:bg-neutral-100"
                  }`}
                >
                  <span className="relative shrink-0">
                    <span className="block size-11 overflow-hidden rounded-full">
                      <Avatar src={c.lawan.foto} nama={c.lawan.nama} className="size-11 text-base" />
                    </span>
                    {c.belumDibaca > 0 && (
                      <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-lime-brand px-1 text-[10px] font-bold text-neutral-950">
                        {c.belumDibaca}
                      </span>
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="truncate text-sm font-semibold text-neutral-900">{c.lawan.nama}</span>
                      {c.terakhir && (
                        <span className="shrink-0 text-[10px] text-neutral-500">{relatif(c.terakhir.waktu)}</span>
                      )}
                    </span>
                    <span className="block truncate text-[10px] font-medium text-green-800">{c.barang.nama}</span>
                    <span
                      className={`block truncate text-[11px] ${
                        c.belumDibaca > 0 ? "font-semibold text-neutral-800" : "text-neutral-500"
                      }`}
                    >
                      {preview}
                    </span>
                  </span>
                </button>
              </li>
            );
          })
        )}
      </ul>
    </aside>
  );
}

