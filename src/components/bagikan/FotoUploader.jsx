import { useRef } from "react";
import { IkonSilang, IkonTambah } from "./IkonBagikan.jsx";
import { MAKS_FOTO } from "../../hooks/useFotoBarang.js";

export default function FotoUploader({ foto, onTambah, onHapus, pesan, error }) {
  const input = useRef(null);
  const penuh = foto.length >= MAKS_FOTO;

  const pilih = (e) => {
    onTambah(e.target.files);
    e.target.value = ""; // supaya foto yang sama bisa dipilih lagi
  };

  return (
    <section className="rounded-xl border border-neutral-300 bg-neutral-100 p-5">
      <h2 className="font-display text-lg font-bold">Foto Barang</h2>
      <p className="mt-1 text-xs text-neutral-600">
        Upload minimal 1 foto barang. Foto pertama akan menjadi foto utama listing.
      </p>

      <div className="mt-4 flex flex-wrap gap-4">
        {foto.map((f, i) => (
          <div key={f.id} className="relative h-24 w-24">
            <img src={f.preview} alt={`Foto barang ${i + 1}`} className="h-full w-full rounded-lg object-cover" />
            {i === 0 && (
              <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                Utama
              </span>
            )}
            <button
              type="button"
              onClick={() => onHapus(f.id)}
              aria-label={`Hapus foto ${i + 1}`}
              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow transition hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              <IkonSilang width={12} height={12} />
            </button>
          </div>
        ))}

        {!penuh && (
          <button
            type="button"
            onClick={() => input.current?.click()}
            aria-label="Tambah foto"
            className="flex h-24 w-24 items-center justify-center rounded-lg bg-neutral-200 text-forest transition hover:bg-neutral-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          >
            <IkonTambah width={20} height={20} />
          </button>
        )}
      </div>

      <input ref={input} type="file" accept="image/*" multiple onChange={pilih} className="hidden" />

      {(pesan || error) && (
        <p className="mt-3 text-xs text-red-600" role="alert">
          {pesan || error}
        </p>
      )}
    </section>
  );
}