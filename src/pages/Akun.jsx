import { useState } from "react";
import { useLocation } from "react-router-dom";
import { getProfil } from "../services/authService";
import { getBarangSaya } from "../services/barangService";
import { getRiwayat } from "../services/permintaanService";
import ProfilHeader from "../components/akun/ProfilHeader";
import AkunTabs from "../components/akun/AkunTabs";
import RiwayatItem from "../components/akun/RiwayatItem";
import Avatar from "../components/akun/Avatar";
import Navbar from "../components/Navbar.jsx";

function Kosong({ judul, isi }) {
  return (
    <div className="rounded-lg border border-dashed border-gray-300 py-12 text-center">
      <p className="font-medium text-green-950">{judul}</p>
      <p className="mt-1 text-sm text-gray-500">{isi}</p>
    </div>
  );
}

export default function Akun() {
  const location = useLocation();
  const [tab, setTab] = useState("barang");
  const [pesan, setPesan] = useState(location.state?.pesan ?? "");
  const [profil] = useState(() => getProfil());
  const [barang] = useState(() => getBarangSaya());
  const [riwayat] = useState(() => getRiwayat());

  if (!profil) return null;
  const terima = riwayat.filter((r) => r.arah === "terkirim").length;

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 py-8">
      {pesan && (
        <div role="status" className="fixed right-6 top-6 z-50 flex items-center gap-3 rounded-lg bg-green-800 px-4 py-3 text-sm text-white shadow-lg">
          {pesan}
          <button type="button" onClick={() => setPesan("")} aria-label="Tutup">✕</button>
        </div>
      )}
      <ProfilHeader profil={profil} jumlahBagikan={barang.length} jumlahTerima={terima} />
      <div className="mt-6"><AkunTabs aktif={tab} onUbah={setTab} /></div>

      {tab === "barang" ? (
        <section className="mt-5">
          <h2 className="mb-4 text-lg font-semibold text-green-950">Barang yang dibagikan</h2>
          {barang.length === 0 ? (
            <Kosong judul="Belum ada barang yang dibagikan" isi="Barang yang kamu bagikan akan muncul di sini." />
          ) : (
            <div className="grid grid-cols-3 gap-5">
              {barang.map((b) => (
                <article key={b.id} className="overflow-hidden rounded-lg border border-gray-300 bg-white">
                  <div className="flex items-center gap-3 p-3">
                    <div className="size-8 overflow-hidden rounded-full">
                      <Avatar src={profil.picture} nama={profil.name} className="size-8" />
                    </div>
                    <div className="text-sm leading-tight">
                      <div className="font-semibold">{b.pemilik}</div>
                      <div className="text-xs text-gray-500">{b.kota}</div>
                    </div>
                  </div>
                  <img src={b.gambar ?? b.foto} alt={b.nama ?? b.judul} className="h-40 w-full object-cover" />
                  <div className="p-4">
                    <h3 className="font-semibold">{b.nama ?? b.judul}</h3>
                    <p className="text-[10px] text-gray-600">{b.jenis ?? b.tipe}</p>
                    <p className="mt-2 line-clamp-3 text-xs text-gray-500">{b.deskripsi}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      ) : (
        <section className="mt-5">
          <h2 className="mb-4 text-lg font-semibold text-green-950">Riwayat Aktivitas</h2>
          {riwayat.length === 0 ? (
            <Kosong judul="Belum ada riwayat aktivitas" isi="Barang yang kamu berikan atau terima akan tercatat di sini." />
          ) : (
            <div className="space-y-4">
              {riwayat.map((r) => <RiwayatItem key={r.id} item={r} />)}
            </div>
          )}
        </section>
      )}
    </main>
    </>
  );
}
