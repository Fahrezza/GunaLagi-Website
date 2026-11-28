import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import DaftarPercakapan from "../components/pesan/DaftarPercakapan.jsx";
import JendelaChat from "../components/pesan/JendelaChat.jsx";
import { getProfil } from "../services/authService.js";
import {
  bukaPercakapanBarang,
  getPercakapan,
  getPercakapanById,
  kirimPesan,
  tandaiDibaca,
} from "../services/pesanService.js";

export default function Pesan() {
  const [params, setParams] = useSearchParams();
  const barangParam = params.get("barang"); // dari tombol "Hubungi Pemilik"
  const cParam = params.get("c"); // percakapan yang sedang dibuka
  const dengan = params.get("dengan");
  const namaParam = params.get("nama");
  const kotaParam = params.get("kota");

  const [saya] = useState(() => getProfil()?.email ?? "");
  const [daftar, setDaftar] = useState([]);
  const [aktif, setAktif] = useState(null);
  const [cari, setCari] = useState("");
  const [memuat, setMemuat] = useState(true);
  const [info, setInfo] = useState("");

  const segarkan = useCallback(async () => {
    const d = await getPercakapan();
    setDaftar(d);
    setAktif(cParam ? await getPercakapanById(cParam) : null);
    setMemuat(false);
  }, [cParam]);

  // Masuk lewat "Hubungi Pemilik": buka atau siapkan percakapan untuk barang itu.
  useEffect(() => {
    if (!barangParam) return;
    let batal = false;
    bukaPercakapanBarang(
      barangParam,
      dengan ? { email: dengan, nama: namaParam || "Pengguna", kota: kotaParam || "", foto: "" } : null
    )
      .then((r) => {
        if (batal) return;
        if (!r) setInfo("Barang tidak ditemukan.");
        else if (r.sendiri) setInfo("Ini barang milikmu, jadi tidak ada pemilik lain yang bisa dihubungi.");
        setParams(r && !r.sendiri ? { c: r.id } : {}, { replace: true });
      })
      .catch(() => {
        if (!batal) setInfo("Gagal membuka percakapan. Coba lagi.");
      });
    return () => {
      batal = true;
    };
  }, [barangParam, setParams]);

  // Muat data, dengarkan tab lain, dan cek berkala.
  // Saat backend siap, ganti bagian ini dengan polling ke server atau WebSocket.
  useEffect(() => {
    segarkan().catch(() => {
      setInfo("Gagal memuat pesan. Coba muat ulang halaman.");
      setMemuat(false);
    });
    const saatStorage = (e) => {
      if (e.key === null || e.key === "pesan") segarkan();
    };
    window.addEventListener("storage", saatStorage);
    const timer = setInterval(segarkan, 5000);
    return () => {
      window.removeEventListener("storage", saatStorage);
      clearInterval(timer);
    };
  }, [segarkan]);

  // Percakapan yang dibuka dianggap sudah dibaca.
  useEffect(() => {
    if (aktif && aktif.belumDibaca > 0) {
      tandaiDibaca(aktif.id).then(segarkan);
    }
  }, [aktif, segarkan]);

  const kirim = async (teks) => {
    await kirimPesan(aktif.id, teks);
    await segarkan();
  };

  const pilih = (id) => setParams({ c: id });

  // Percakapan baru yang masih kosong belum ada di daftar, tapi harus tampil terpilih.
  const daftarTampil = aktif && !daftar.some((c) => c.id === aktif.id) ? [aktif, ...daftar] : daftar;

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-360 px-5 pb-10 pt-8 sm:px-8 lg:px-12 xl:px-16">
        <h1 className="font-display text-3xl font-bold text-neutral-950">Pesan</h1>

        {info && (
          <p role="status" className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
            {info}
          </p>
        )}

        <div className="mt-6 grid h-[calc(100dvh-14rem)] min-h-120 grid-cols-[20rem_1fr] overflow-hidden rounded-2xl border border-neutral-300 bg-white">
          <DaftarPercakapan
            daftar={daftarTampil}
            aktifId={aktif?.id}
            saya={saya}
            cari={cari}
            onCari={setCari}
            onPilih={pilih}
          />

          {memuat ? (
            <div className="grid place-items-center text-sm text-neutral-500">Memuat pesan...</div>
          ) : aktif ? (
            <JendelaChat key={aktif.id} percakapan={aktif} saya={saya} onKirim={kirim} />
          ) : (
            <div className="grid place-items-center px-6 text-center">
              <div>
                <p className="font-semibold text-forest">
                  {daftar.length === 0 ? "Belum ada percakapan" : "Pilih percakapan"}
                </p>
                <p className="mt-1 text-sm text-neutral-500">
                  {daftar.length === 0
                    ? "Buka halaman barang lalu tekan Hubungi Pemilik untuk memulai."
                    : "Pilih salah satu percakapan di sebelah kiri."}
                </p>
                {daftar.length === 0 && (
                  <Link
                    to="/jelajahi"
                    className="mt-4 inline-flex rounded-lg bg-lime-brand px-4 py-2 text-sm font-semibold hover:bg-lime-brand-dark"
                  >
                    Jelajahi Barang
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
