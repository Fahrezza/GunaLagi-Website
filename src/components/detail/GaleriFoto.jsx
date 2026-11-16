import { useState } from "react";

export default function GaleriFoto({ foto, nama }) {
  const daftar = (foto ?? []).filter(Boolean);
  const [aktif, setAktif] = useState(0);
  const utama = daftar[aktif] ?? daftar[0];

  return (
    <div>
      <div className="aspect-4/3 w-full overflow-hidden rounded-2xl bg-neutral-200">
        {utama ? (
          <img src={utama} alt={nama} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-neutral-500">Belum ada foto</div>
        )}
      </div>

      {daftar.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-3">
          {daftar.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setAktif(i)}
              aria-label={`Lihat foto ${i + 1}`}
              aria-pressed={i === aktif}
              className={`h-14 w-14 overflow-hidden rounded-xl bg-neutral-200 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest ${
                i === aktif ? "ring-2 ring-forest" : "opacity-70 hover:opacity-100"
              }`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}