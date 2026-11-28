import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import StepBarter from "../components/barter/StepBarter.jsx";
import { getSession } from "../services/authService.js";
import { getBarangById } from "../services/detailBarangService.js";
import { kirimPermintaanDonasi } from "../services/permintaanService.js";

const PENGAMBILAN = [
  { nilai: "Ambil sendiri", ket: "Saya akan datang mengambil barangnya" },
  { nilai: "Diantar", ket: "Saya berharap barang bisa diantar ke lokasi saya" },
];

const kartu = "rounded-xl border border-gray-300 bg-gray-100 p-6";
const kelasInput =
  "mt-3 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-200";

export default function PermintaanDonasi() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = getSession();
  const [barang, setBarang] = useState(undefined); // undefined = memuat, null = tidak ada
  const [form, setForm] = useState({ alasan: "", pengambilan: "", catatan: "" });
  const [error, setError] = useState("");
  const [selesai, setSelesai] = useState(false);
  const [mengirim, setMengirim] = useState(false);

  useEffect(() => {
    let batal = false;
    getBarangById(id)
      .then((b) => { if (!batal) setBarang(b ?? null); })
      .catch(() => { if (!batal) setBarang(null); });
    return () => { batal = true; };
  }, [id]);

  if (!user) return <Navigate to="/login" replace />;
  if (barang === undefined) {
    return (
      <>
        <Navbar />
        <p className="py-24 text-center text-sm text-neutral-500">Memuat barang...</p>
      </>
    );
  }
  if (!barang) return <Navigate to="/jelajahi" replace />;
  if (barang.pemilikEmail === user.email) return <Navigate to={`/barang/${id}`} replace />;
  const caraId = barang.cara ?? (barang.kategori === "Donasi" ? "donasi" : "barter");
  if (caraId !== "donasi") return <Navigate to={`/barang/${id}/barter`} replace />;

  async function kirim(e) {
    e.preventDefault();
    if (form.alasan.trim().length < 10) return setError("Ceritakan alasanmu minimal 10 karakter.");
    if (!form.pengambilan) return setError("Pilih cara pengambilan barang.");
    setMengirim(true);
    try {
      await kirimPermintaanDonasi({
        barang,
        permintaan: { ...form, alasan: form.alasan.trim(), catatan: form.catatan.trim() },
      });
      setSelesai(true);
      window.scrollTo(0, 0);
    } catch {
      setError("Gagal mengirim permintaan. Coba lagi.");
      setMengirim(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-2xl px-6 py-10">
        <h1 className="text-3xl font-bold text-green-950">Ajukan Permintaan Donasi</h1>
        <p className="mt-1 text-sm text-gray-800">
          Ceritakan kenapa kamu membutuhkan <strong>{barang.nama}</strong>.
        </p>
        <StepBarter langkah={selesai ? 2 : 1} label="Permintaan Donasi" />

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
                <h2 className="mt-4 text-lg font-bold text-green-950">Permintaan Berhasil Dikirim!</h2>
                <p className="mt-3 text-xs text-gray-600">Pemilik barang akan meninjau permintaanmu.</p>
              </div>
            </section>
            <button type="button" onClick={() => navigate("/beranda")}
              className="mt-8 w-full rounded-xl bg-green-950 py-3.5 font-semibold text-white hover:bg-green-900">
              Kembali ke Beranda
            </button>
          </>
        ) : (
          <form onSubmit={kirim} className="mt-6 space-y-5" noValidate>
            <section className={kartu}>
              <label htmlFor="alasan" className="font-semibold text-green-950">Alasan Membutuhkan Barang</label>
              <textarea id="alasan" rows={4} value={form.alasan}
                placeholder="Contoh: Saya butuh untuk kuliah dan belum punya."
                onChange={(e) => setForm((f) => ({ ...f, alasan: e.target.value }))}
                className={kelasInput} />
            </section>

            <section className={kartu}>
              <h2 className="font-semibold text-green-950">Cara Pengambilan</h2>
              <div className="mt-3 space-y-2">
                {PENGAMBILAN.map((o) => {
                  const aktif = form.pengambilan === o.nilai;
                  return (
                    <label key={o.nilai}
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 ${
                        aktif ? "border-green-700 bg-green-50" : "border-gray-400 bg-white"
                      }`}>
                      <input type="radio" name="pengambilan" value={o.nilai} checked={aktif}
                        onChange={() => setForm((f) => ({ ...f, pengambilan: o.nilai }))}
                        className="mt-1 accent-green-800" />
                      <span>
                        <span className="block text-sm font-semibold">{o.nilai}</span>
                        <span className="block text-xs text-gray-700">{o.ket}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </section>

            <section className={kartu}>
              <label htmlFor="catatan" className="text-lg font-bold text-green-950">Catatan (Opsional)</label>
              <textarea id="catatan" rows={3} value={form.catatan} placeholder="Tulis catatan..."
                onChange={(e) => setForm((f) => ({ ...f, catatan: e.target.value }))}
                className={kelasInput} />
              <p className="mt-1 text-[11px] text-gray-500">Opsional : Kosongkan jika tidak ada.</p>
            </section>

            {error && <p role="alert" className="text-sm text-red-600">{error}</p>}

            <button type="submit" disabled={mengirim}
              className="w-full rounded-xl bg-green-950 py-3.5 font-semibold text-white hover:bg-green-900 disabled:opacity-60">
              {mengirim ? "Mengirim..." : "Submit"}
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
