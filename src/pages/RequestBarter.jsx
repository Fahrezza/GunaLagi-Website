import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { getProfil } from "../services/authService";
import { getBarangById } from "../services/detailBarangService.js";
import { kirimRequestBarter } from "../services/permintaanService";
import { kecilkanGambar } from "../utils/kecilkanGambar"; // SESUAIKAN: salin dari EditProfil.jsx
import StepBarter from "../components/barter/StepBarter";
import Navbar from "../components/Navbar.jsx";

const KONDISI = [
  { nilai: "Bagus", ket: "Barang baru minim pemakaian dan kerusakan" },
  { nilai: "Baik", ket: "Bekas pakai masih tampak baru" },
  { nilai: "Cukup baik", ket: "Ada kekurangan minor, masih layak" },
];

const kartu = "rounded-xl border border-gray-300 bg-gray-100 p-6";

export default function RequestBarter() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [profil] = useState(() => getProfil());
  const [barang, setBarang] = useState(undefined); // undefined = memuat, null = tidak ada
useEffect(() => {
  let batal = false;
  getBarangById(id)
    .then((b) => { if (!batal) setBarang(b ?? null); })
    .catch(() => { if (!batal) setBarang(null); });
  return () => { batal = true; };
}, [id]);
  const [form, setForm] = useState({ nama: "", foto: "", kondisi: "", catatan: "" });
  const [error, setError] = useState("");
  const [selesai, setSelesai] = useState(false);

 if (!profil) return <Navigate to="/login" replace />;
if (barang === undefined) {
  return (
    <>
      <Navbar />
      <p className="py-24 text-center text-sm text-neutral-500">Memuat barang...</p>
    </>
  );
}
if (!barang) return <Navigate to="/jelajahi" replace />;
if (barang.pemilikEmail === profil.email) return <Navigate to={`/barang/${id}`} replace />;
const caraId = barang.cara ?? (barang.kategori === "Donasi" ? "donasi" : "barter");
if (caraId === "donasi") return <Navigate to={`/barang/${id}/minta`} replace />;
  async function pilihFoto(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const hasil = await kecilkanGambar(file, 600);
      setForm((f) => ({ ...f, foto: hasil }));
      setError("");
    } catch {
      setError("Foto tidak dapat dibaca. Coba file lain.");
    }
    e.target.value = "";
  }

  async function kirim(e) {
  e.preventDefault();
  if (!form.nama.trim()) return setError("Nama barang yang kamu tawarkan wajib diisi.");
  if (!form.foto) return setError("Pilih foto barang milikmu.");
  if (!form.kondisi) return setError("Pilih kondisi barang.");
  try {
    await kirimRequestBarter({
      barang,
      tawaran: { ...form, nama: form.nama.trim(), catatan: form.catatan.trim() },
    });
    setSelesai(true);
    window.scrollTo(0, 0);
  } catch {
    setError("Gagal mengirim request. Coba lagi.");
  }
}
  return (
    <>
    <Navbar />
    <main className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="text-3xl font-bold text-green-950">Ajukan Request Barter</h1>
      <p className="mt-1 text-sm text-gray-800">
        Pilih barang milikmu untuk ditukarkan dengan barang yang kamu inginkan.
      </p>
      <StepBarter langkah={selesai ? 2 : 1} />

      {selesai ? (
        <>
          <section className="mt-10 grid h-64 place-items-center rounded-xl border border-gray-300 bg-gray-100 text-center">
            <div>
              <span className="mx-auto grid size-7 place-items-center rounded-full bg-green-600 text-white">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                  strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
                  <path d="m5 12 5 5 9-10" />
                </svg>
              </span>
              <h2 className="mt-4 text-lg font-bold text-green-950">Request Berhasil Dikirim!</h2>
              <p className="mt-3 text-xs text-gray-600">Request barter kamu berhasil dikirim.</p>
            </div>
          </section>
          <button type="button" onClick={() => navigate("/")} // SESUAIKAN: rute Beranda setelah login
            className="mt-8 w-full rounded-xl bg-green-950 py-3.5 font-semibold text-white hover:bg-green-900">
            Kembali ke Beranda
          </button>
        </>
      ) : (
        <form onSubmit={kirim} className="mt-6 space-y-5" noValidate>
          <section className={kartu}>
            <label htmlFor="nama" className="font-semibold text-green-950">
              Nama Barang Yang Kamu tawarkan
            </label>
            <input id="nama" value={form.nama} placeholder="contoh: baju"
              onChange={(e) => setForm((f) => ({ ...f, nama: e.target.value }))}
              className="mt-3 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-200" />
          </section>

          <section className={`${kartu} text-center`}>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={pilihFoto} />
            <button type="button" onClick={() => fileRef.current?.click()}
              className="mx-auto grid size-32 place-items-center overflow-hidden rounded-lg bg-gray-200 text-2xl text-gray-700 hover:bg-gray-300"
              aria-label="Pilih foto barang">
              {form.foto ? <img src={form.foto} alt="Barang yang ditawarkan" className="size-full object-cover" /> : "+"}
            </button>
            <p className="mt-4 text-sm font-semibold text-green-950">
              {form.foto ? "Ganti foto" : "+ Pilih Barang"}
            </p>
            <p className="mt-1 text-xs text-gray-700">Pilih barang milikmu</p>
          </section>

          <section className={kartu}>
            <h2 className="font-semibold text-green-950">Kondisi Barang Yang Kamu tawarkan</h2>
            <div className="mt-3 space-y-2">
              {KONDISI.map((k) => {
                const aktif = form.kondisi === k.nilai;
                return (
                  <label key={k.nilai}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 ${
                      aktif ? "border-green-700 bg-green-50" : "border-gray-400 bg-white"
                    }`}>
                    <input type="radio" name="kondisi" value={k.nilai} checked={aktif}
                      onChange={() => setForm((f) => ({ ...f, kondisi: k.nilai }))}
                      className="mt-1 accent-green-800" />
                    <span>
                      <span className="block text-sm font-semibold">{k.nilai}</span>
                      <span className="block text-xs text-gray-700">{k.ket}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </section>

          <section className={kartu}>
            <label htmlFor="catatan" className="text-lg font-bold text-green-950">Catatan (Opsional)</label>
            <textarea id="catatan" rows={4} value={form.catatan} placeholder="Tulis catatan..."
              onChange={(e) => setForm((f) => ({ ...f, catatan: e.target.value }))}
              className="mt-3 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-200" />
            <p className="mt-1 text-[11px] text-gray-500">Opsional : Kosongkan jika tidak ada.</p>
          </section>

          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}

          <button type="submit"
            className="w-full rounded-xl bg-green-950 py-3.5 font-semibold text-white hover:bg-green-900">
            Submit
          </button>
          <Link to={`/barang/${id}`} className="block text-center text-sm text-gray-600 hover:underline">
            Batal
          </Link>
        </form>
      )}
    </main>
    </>
  );
}
