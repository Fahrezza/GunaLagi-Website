import { useEffect, useRef, useState } from "react";
import { ALASAN_LAPORAN } from "../../data/alasanLaporan.js";
import { kirimLaporan } from "../../services/laporanService.js";
import { IkonSelesai, IkonTutup } from "./IkonDetail.jsx";

const MAKS_KETERANGAN = 500;

export default function LaporModal({ barang, onTutup }) {
  const [alasan, setAlasan] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [galat, setGalat] = useState("");
  const [mengirim, setMengirim] = useState(false);
  const [selesai, setSelesai] = useState(false);
  const dialog = useRef(null);

  // Fokus ke dialog, kunci scroll halaman, dan kembalikan semuanya saat ditutup.
  useEffect(() => {
    const sebelumnya = document.activeElement;
    const overflowLama = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.focus();
    return () => {
      document.body.style.overflow = overflowLama;
      if (sebelumnya && document.contains(sebelumnya)) sebelumnya.focus();
    };
  }, []);

  const tekan = (e) => {
    if (e.key === "Escape") {
      onTutup();
      return;
    }
    if (e.key !== "Tab") return;

    const el = dialog.current?.querySelectorAll("button:not([disabled]), textarea, input");
    if (!el || el.length === 0) return;
    const pertama = el[0];
    const terakhir = el[el.length - 1];
    const aktif = document.activeElement;

    if (e.shiftKey && (aktif === pertama || aktif === dialog.current)) {
      e.preventDefault();
      terakhir.focus();
    } else if (!e.shiftKey && aktif === terakhir) {
      e.preventDefault();
      pertama.focus();
    }
  };

  const kirim = async (e) => {
    e.preventDefault();
    if (!alasan) {
      setGalat("Pilih alasan pelaporan.");
      return;
    }
    if (alasan === "lainnya" && !keterangan.trim()) {
      setGalat("Jelaskan alasan pelaporanmu pada kolom keterangan.");
      return;
    }

    setMengirim(true);
    setGalat("");
    try {
      await kirimLaporan({ barangId: barang.id, alasan, keterangan: keterangan.trim() });
      setSelesai(true);
    } catch (err) {
      setGalat(err.message || "Gagal mengirim laporan. Coba lagi.");
    } finally {
      setMengirim(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onTutup();
      }}
    >
      <div
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="judul-lapor"
        tabIndex={-1}
        onKeyDown={tekan}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl outline-none"
      >
        {selesai ? (
          <div className="text-center">
            <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white">
              <IkonSelesai width={20} height={20} />
            </span>
            <h2 id="judul-lapor" className="mt-4 font-display text-xl font-bold">
              Laporan terkirim
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              Terima kasih sudah membantu menjaga GunaLagi. Laporanmu akan kami periksa.
            </p>
            <button
              type="button"
              onClick={onTutup}
              className="mt-6 w-full rounded-lg bg-forest px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            >
              Tutup
            </button>
          </div>
        ) : (
          <form onSubmit={kirim} noValidate>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="judul-lapor" className="font-display text-xl font-bold">
                  Laporkan Barang
                </h2>
                <p className="mt-1 text-xs text-neutral-600">
                  Bantu kami menjaga GunaLagi tetap aman. Pilih alasan melaporkan &quot;{barang.nama}&quot;.
                </p>
              </div>
              <button
                type="button"
                onClick={onTutup}
                aria-label="Tutup"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-neutral-600 transition hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
              >
                <IkonTutup width={16} height={16} />
              </button>
            </div>

            <fieldset className="mt-4 space-y-2">
              <legend className="sr-only">Alasan pelaporan</legend>
              {ALASAN_LAPORAN.map((a) => (
                <label
                  key={a.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-forest ${
                    alasan === a.id ? "border-forest bg-lime-soft" : "border-neutral-300 hover:bg-neutral-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="alasan"
                    value={a.id}
                    checked={alasan === a.id}
                    onChange={() => {
                      setAlasan(a.id);
                      setGalat("");
                    }}
                    className="h-4 w-4 accent-forest"
                  />
                  {a.label}
                </label>
              ))}
            </fieldset>

            <div className="mt-4">
              <div className="mb-1 flex items-center justify-between">
                <label htmlFor="keterangan-lapor" className="text-xs font-semibold">
                  Keterangan tambahan {alasan === "lainnya" ? <span className="text-red-500">*</span> : "(opsional)"}
                </label>
                <span className="text-[11px] text-neutral-500">
                  {keterangan.length}/{MAKS_KETERANGAN}
                </span>
              </div>
              <textarea
                id="keterangan-lapor"
                maxLength={MAKS_KETERANGAN}
                value={keterangan}
                onChange={(e) => {
                  setKeterangan(e.target.value);
                  setGalat("");
                }}
                placeholder="Ceritakan apa yang tidak sesuai"
                className="h-24 w-full resize-none rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-lime-brand"
              />
            </div>

            {galat && (
              <p className="mt-3 text-xs text-red-600" role="alert">
                {galat}
              </p>
            )}

            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={onTutup}
                disabled={mengirim}
                className="rounded-lg border border-neutral-400 bg-white px-4 py-2.5 text-sm font-semibold transition hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest disabled:opacity-60"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={mengirim}
                className="rounded-lg bg-forest px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest disabled:cursor-not-allowed disabled:opacity-60"
              >
                {mengirim ? "Mengirim..." : "Kirim Laporan"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}