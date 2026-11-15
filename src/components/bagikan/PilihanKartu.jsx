import { useId } from "react";

export default function PilihanKartu({ judul, bantuan, nama, opsi, nilai, onUbah, error }) {
  const idJudul = useId();

  return (
    <section
      role="radiogroup"
      aria-labelledby={idJudul}
      className="rounded-xl border border-neutral-300 bg-neutral-100 p-5"
    >
      <h2 id={idJudul} className="font-display text-lg font-bold">
        {judul}
      </h2>
      <p className="mt-1 text-xs text-neutral-600">{bantuan}</p>

      <div className="mt-4 space-y-3">
        {opsi.map((o) => {
          const dipilih = nilai === o.id;
          return (
            <label
              key={o.id}
              className={`flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 transition focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-forest ${
                dipilih ? "border-forest bg-lime-soft" : "border-forest/60 bg-neutral-50 hover:bg-lime-soft/60"
              }`}
            >
              <input
                type="radio"
                name={nama}
                value={o.id}
                checked={dipilih}
                onChange={() => onUbah(o.id)}
                className="mt-1 h-4 w-4 shrink-0 accent-forest"
              />
              <span>
                <span className="block text-sm font-semibold">{o.label}</span>
                <span className="mt-0.5 block text-xs text-neutral-600">{o.deskripsi}</span>
              </span>
            </label>
          );
        })}
      </div>

      {error && (
        <p className="mt-3 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </section>
  );
}