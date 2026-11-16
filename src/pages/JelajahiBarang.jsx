import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import BarangCard from "../components/BarangCard.jsx";
import { contohBarang } from "../data/contohBarang.js";
import { kategori } from "../data/kategori.js";
import { getBarang } from "../services/barangService.js";
import { IkonCari, IkonPanah } from "../components/Ikon.jsx";



const urutanContoh = { c1: 0, c6: 1, c2: 2, c4: 3, c3: 4, c5: 5, c7: 6, c8: 7, c9: 8 };

const kategoriFilter = [
  { slug: "semua", nama: "Semua" },
  ...kategori,
];

function normalisasiKategori(barang) {
  const nama = barang.kategoriBarang;
  if (nama) return nama;
  const teks = `${barang.nama} ${barang.kategori}`.toLowerCase();
  if (/baju|kemeja|sepatu|aksesoris|pakaian/.test(teks)) return "pakaian";
  if (/kamera|handphone|elektronik/.test(teks)) return "elektronik";
  if (/sofa|perabot/.test(teks)) return "perabotan";
  if (/buku|novel/.test(teks)) return "buku";
  return "";
}

export default function JelajahiBarang() {
  const [params, setParams] = useSearchParams();
  const [kata, setKata] = useState(params.get("cari") ?? "");
  const [aktif, setAktif] = useState("semua");
  const [urutan, setUrutan] = useState("terbaru");
  const [filterBuka, setFilterBuka] = useState(false);
  const [cara, setCara] = useState("semua");

  const barang = useMemo(() => {
    const tersimpan = getBarang();
    const gabungan = [...tersimpan, ...contohBarang.filter((contoh) => !tersimpan.some((item) => item.id === contoh.id))];
    return gabungan;
  }, []);

  const hasil = useMemo(() => {
    const q = kata.trim().toLocaleLowerCase("id");
    const daftar = barang.filter((item) => {
      const cocokKata = !q || [item.nama, item.pemilik, item.kota, item.deskripsi, item.kategori]
        .filter(Boolean).some((nilai) => nilai.toLocaleLowerCase("id").includes(q));
      const cocokKategori = aktif === "semua" || normalisasiKategori(item) === aktif;
      const cocokCara = cara === "semua" || item.kategori === cara;
      return cocokKata && cocokKategori && cocokCara;
    });
    return urutan === "nama"
      ? [...daftar].sort((a, b) => a.nama.localeCompare(b.nama, "id"))
      : [...daftar].sort((a, b) => {
          const aContoh = urutanContoh[a.id];
          const bContoh = urutanContoh[b.id];
          if (aContoh === undefined && bContoh === undefined) return 0;
          if (aContoh === undefined) return -1;
          if (bContoh === undefined) return 1;
          return aContoh - bContoh;
        });
  }, [barang, kata, aktif, cara, urutan]);

  const ubahPencarian = (event) => {
    event.preventDefault();
    const baru = new URLSearchParams(params);
    if (kata.trim()) baru.set("cari", kata.trim());
    else baru.delete("cari");
    setParams(baru, { replace: true });
  };

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-[1440px] px-5 pb-16 pt-8 sm:px-8 lg:px-12 xl:px-16">
        <section aria-labelledby="judul-jelajahi">
          <div className="mb-5">
            <h1 id="judul-jelajahi" className="font-display text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
              Jelajahi Barang
            </h1>
            <p className="mt-1 text-sm text-neutral-500">Temukan barang layak pakai yang tersedia di sekitarmu</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <form onSubmit={ubahPencarian} role="search" className="relative min-w-0 flex-1">
              <IkonCari width={16} height={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="search"
                value={kata}
                onChange={(event) => setKata(event.target.value)}
                placeholder="Cari barang yang anda butuhkan"
                aria-label="Cari barang"
                className="h-10 w-full rounded-lg border border-neutral-300 bg-white pl-10 pr-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-lime-500 focus:ring-2 focus:ring-lime-100"
              />
            </form>
            <div className="flex gap-2">
              <button type="button" onClick={() => setFilterBuka((b) => !b)} aria-expanded={filterBuka}
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-neutral-300 px-4 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
                <span>Filter</span><IkonPanah width={14} height={14} />
              </button>
              <label className="relative inline-flex h-10 items-center rounded-lg border border-neutral-300 pl-3 pr-8 text-sm font-medium text-neutral-700">
                <span className="sr-only">Urutkan barang</span>
                <select value={urutan} onChange={(event) => setUrutan(event.target.value)} className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent pl-3 pr-8 outline-none">
                  <option value="terbaru">Terbaru</option>
                  <option value="nama">Nama A-Z</option>
                </select>
                <span className="pointer-events-none">{urutan === "nama" ? "Nama A-Z" : "Terbaru"}</span>
                <IkonPanah width={14} height={14} className="pointer-events-none absolute right-2" />
              </label>
            </div>
          </div>

          {filterBuka && (
            <div className="mt-3 flex flex-wrap items-center gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
              <span className="text-sm font-semibold text-neutral-700">Cara mendapatkan:</span>
              <select value={cara} onChange={(event) => setCara(event.target.value)} className="h-9 rounded-md border border-neutral-300 bg-white px-3 text-sm outline-none focus:border-lime-500">
                <option value="semua">Semua cara</option>
                <option value="Donasi">Donasi</option>
                <option value="Barter / Tukar">Barter / Tukar</option>
              </select>
              <button type="button" onClick={() => { setCara("semua"); setAktif("semua"); setKata(""); }} className="text-sm font-medium text-neutral-600 underline underline-offset-2">Reset filter</button>
            </div>
          )}
        </section>

        <nav aria-label="Filter kategori barang" className="mt-7 flex flex-wrap gap-2">
          {kategoriFilter.map((item) => {
            const selected = aktif === item.slug;
            return (
              <button key={item.slug} type="button" onClick={() => setAktif(item.slug)} aria-pressed={selected}
                className={`rounded-full border px-4 py-2 text-xs font-medium transition ${selected ? "border-lime-600 bg-lime-brand text-neutral-900" : "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-500 hover:bg-neutral-50"}`}>
                {item.nama}
              </button>
            );
          })}
        </nav>

        <section aria-label="Daftar barang" className="mt-7">
          {hasil.length ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7 xl:gap-8">
              {hasil.map((item) => (<BarangCard key={item.id} barang={item} />))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-neutral-300 px-6 py-16 text-center">
              <h2 className="font-display text-lg font-semibold text-neutral-800">Barang tidak ditemukan</h2>
              <p className="mt-1 text-sm text-neutral-500">Coba kata kunci atau kategori yang berbeda.</p>
              <button type="button" onClick={() => { setKata(""); setAktif("semua"); setCara("semua"); }} className="mt-4 rounded-full bg-lime-brand px-4 py-2 text-sm font-semibold hover:bg-lime-brand-dark">Hapus pencarian dan filter</button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}