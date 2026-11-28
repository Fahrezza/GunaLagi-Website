import { useEffect, useRef, useState } from "react";
import Avatar from "../akun/Avatar.jsx";
import KartuBarangChat from "./KartuBarangChat.jsx";
import { jam, kunciHari, labelHari } from "../../utils/waktuPesan.js";

const SARAN = {
  donasi: [
    "Halo, apakah barang ini masih tersedia?",
    "Boleh minta foto tambahan?",
    "Kapan bisa diambil?",
  ],
  barter: [
    "Halo, apakah barang ini masih tersedia?",
    "Boleh minta foto tambahan?",
    "Saya tertarik menukar dengan barang saya, bisa?",
  ],
};

function Bulat({ foto, nama }) {
  return (
    <span className="block size-8 shrink-0 overflow-hidden rounded-full">
      <Avatar src={foto} nama={nama} className="size-8 text-xs" />
    </span>
  );
}

export default function JendelaChat({ percakapan, saya, onKirim }) {
  const { lawan, barang, pesan } = percakapan;
  const [teks, setTeks] = useState("");
  const [galat, setGalat] = useState("");
  const [mengirim, setMengirim] = useState(false);
  const daftarRef = useRef(null);
  const inputRef = useRef(null);

  // Selalu turun ke pesan terbaru.
  useEffect(() => {
    const el = daftarRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [pesan.length]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function sesuaikan() {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }

  async function kirim() {
    const isi = teks.trim();
    if (!isi || mengirim) return;
    setMengirim(true);
    setGalat("");
    try {
      await onKirim(isi);
      setTeks("");
      requestAnimationFrame(sesuaikan);
    } catch {
      setGalat("Pesan gagal terkirim. Coba lagi.");
    } finally {
      setMengirim(false);
      inputRef.current?.focus();
    }
  }

  function tekanTombol(e) {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      kirim();
    }
  }

  const saran = SARAN[barang.cara] ?? SARAN.barter;

  return (
    <section className="flex min-h-0 flex-col bg-white">
      <header className="flex items-center gap-3 border-b border-neutral-300 px-5 py-3">
        <span className="block size-10 overflow-hidden rounded-full">
          <Avatar src={lawan.foto} nama={lawan.nama} className="size-10 text-base" />
        </span>
        <div className="leading-tight">
          <h2 className="text-base font-semibold text-neutral-950">{lawan.nama}</h2>
          <p className="text-xs text-neutral-600">{lawan.kota || "Domisili belum diisi"}</p>
        </div>
      </header>

      <KartuBarangChat barang={barang} kota={lawan.kota} />

      <div ref={daftarRef} className="min-h-0 flex-1 overflow-y-auto px-5 py-4" aria-live="polite">
        {pesan.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <p className="text-sm font-semibold text-forest">Mulai percakapan dengan {lawan.nama}</p>
            <p className="mt-1 text-xs text-neutral-500">Tanyakan soal {barang.nama} atau pilih salah satu di bawah.</p>
            <div className="mt-4 flex max-w-md flex-wrap justify-center gap-2">
              {saran.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setTeks(s);
                    inputRef.current?.focus();
                  }}
                  className="rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-xs hover:border-forest hover:bg-lime-soft"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          pesan.map((m, i) => {
            const milik = m.dari === saya;
            const sebelum = pesan[i - 1];
            const hariBaru = !sebelum || kunciHari(sebelum.waktu) !== kunciHari(m.waktu);
            const awalGrup = hariBaru || sebelum.dari !== m.dari;
            return (
              <div key={m.id}>
                {hariBaru && (
                  <p className="my-3 text-center text-[11px] text-neutral-500">{labelHari(m.waktu)}</p>
                )}
                <div className={`flex items-end gap-2 ${milik ? "justify-end" : "justify-start"} ${awalGrup ? "mt-3" : "mt-1"}`}>
                  {!milik && (awalGrup ? <Bulat foto={lawan.foto} nama={lawan.nama} /> : <span className="size-8 shrink-0" />)}
                  <div className={`flex max-w-[70%] flex-col ${milik ? "items-end" : "items-start"}`}>
                    <p
                      className={`whitespace-pre-wrap wrap-anywhere rounded-2xl px-3.5 py-2 text-xs leading-relaxed text-neutral-900 ${
                        milik ? "rounded-br-sm bg-lime-brand/30" : "rounded-bl-sm bg-neutral-200"
                      }`}
                    >
                      {m.teks}
                    </p>
                    <span className="mt-0.5 px-1 text-[10px] text-neutral-500">{jam(m.waktu)}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="border-t border-neutral-300 bg-neutral-50 p-3">
        {galat && <p role="alert" className="mb-2 px-2 text-xs text-red-600">{galat}</p>}
        <div className="flex items-end gap-2 rounded-2xl border border-neutral-300 bg-white px-3 py-2 focus-within:border-forest focus-within:ring-2 focus-within:ring-lime-brand/50">
          <textarea
            ref={inputRef}
            rows={1}
            value={teks}
            maxLength={1000}
            placeholder="Tulis pesan..."
            aria-label="Tulis pesan"
            onChange={(e) => {
              setTeks(e.target.value);
              sesuaikan();
            }}
            onKeyDown={tekanTombol}
            className="max-h-30 min-h-6 flex-1 resize-none bg-transparent text-sm leading-6 outline-none placeholder:text-neutral-400"
          />
          <button
            type="button"
            onClick={kirim}
            disabled={!teks.trim() || mengirim}
            aria-label="Kirim pesan"
            className="grid size-8 shrink-0 place-items-center rounded-full bg-lime-brand text-neutral-950 transition hover:bg-forest hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              strokeLinejoin="round" className="size-4" aria-hidden="true">
              <path d="M5 12h14m0 0-6-6m6 6-6 6" />
            </svg>
          </button>
        </div>
        <p className="mt-1 px-2 text-[10px] text-neutral-400">Enter untuk kirim, Shift + Enter untuk baris baru.</p>
      </div>
    </section>
  );
}

