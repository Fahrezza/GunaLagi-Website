import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import PermintaanTabs from "../components/permintaan/PermintaanTabs.jsx";
import FilterStatus from "../components/permintaan/FilterStatus.jsx";
import PermintaanCard from "../components/permintaan/PermintaanCard.jsx";
import { getPermintaan, ubahStatus } from "../services/permintaanService.js";

export default function Permintaan() {
  const [semua, setSemua] = useState([]);
  const [memuat, setMemuat] = useState(true);
  const [galat, setGalat] = useState("");
  const [sibukId, setSibukId] = useState(null);
  const [arah, setArah] = useState("masuk");
  const [status, setStatus] = useState("semua");

  useEffect(() => {
    let batal = false;
    getPermintaan()
      .then((data) => {
        if (!batal) setSemua(data);
      })
      .catch(() => {
        if (!batal) setGalat("Gagal memuat permintaan. Coba muat ulang halaman.");
      })
      .finally(() => {
        if (!batal) setMemuat(false);
      });
    return () => {
      batal = true;
    };
  }, []);

  const tampil = useMemo(
    () => semua.filter((p) => p.arah === arah && (status === "semua" || p.status === status)),
    [semua, arah, status]
  );

  const ubah = async (id, statusBaru) => {
    setSibukId(id);
    setGalat("");
    try {
      await ubahStatus(id, statusBaru);
      setSemua((daftar) => daftar.map((p) => (p.id === id ? { ...p, status: statusBaru } : p)));
    } catch {
      setGalat("Gagal menyimpan perubahan. Coba lagi.");
    } finally {
      setSibukId(null);
    }
  };

  const pesanKosong =
    status === "semua"
      ? arah === "masuk"
        ? "Belum ada permintaan masuk untuk barang-barangmu."
        : "Kamu belum mengirim permintaan barang."
      : `Tidak ada permintaan dengan status ${status}.`;

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-3xl px-6 pb-20 pt-10">
        <h1 className="font-display text-3xl font-bold text-neutral-950">Permintaan Barang</h1>
        <p className="mt-1 text-sm text-neutral-600">
          Kelola permintaan masuk untuk barang-barangmu dan pantau permintaanmu yang terkirim.
        </p>

        <div className="mt-6">
          <PermintaanTabs aktif={arah} onUbah={setArah} />
        </div>
        <div className="mt-4">
          <FilterStatus aktif={status} onUbah={setStatus} />
        </div>

        {galat && (
          <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700" role="alert">
            {galat}
          </p>
        )}

        <div role="tabpanel" aria-live="polite" className="mt-5 space-y-5">
          {memuat ? (
            <p className="py-12 text-center text-sm text-neutral-500">Memuat permintaan...</p>
          ) : tampil.length > 0 ? (
            tampil.map((p) => (
              <PermintaanCard key={p.id} permintaan={p} onUbahStatus={ubah} sibuk={sibukId === p.id} />
            ))
          ) : (
            <div className="rounded-xl border border-dashed border-neutral-300 px-6 py-12 text-center text-sm text-neutral-600">
              {pesanKosong}
            </div>
          )}
        </div>
      </main>
    </>
  );
}