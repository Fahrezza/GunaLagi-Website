import { contohPermintaan } from "../data/contohPermintaan.js";

const KEY = "permintaan";

function baca() {
  try {
    const data = JSON.parse(localStorage.getItem(KEY));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function tulis(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

// Semua fungsi dibuat async supaya nanti bisa diganti fetch ke server
// tanpa mengubah halaman dan komponennya.

// Data asli dipakai kalau ada. Data contoh hanya tampil saat belum ada data sama sekali.
export async function getPermintaan() {
  const asli = baca();
  return asli.length > 0 ? asli : contohPermintaan;
}

// Mengubah status. Data contoh tidak disimpan, jadi kembali seperti semula saat halaman dimuat ulang.
export async function ubahStatus(id, status) {
  const asli = baca();
  if (asli.length === 0) return { ok: true, contoh: true };

  tulis(asli.map((p) => (p.id === id ? { ...p, status } : p)));
  return { ok: true };
}

// Dipakai halaman deskripsi barang nanti, saat pengguna menekan "Ajukan permintaan".
export async function tambahPermintaan(item) {
  const baru = {
    id: crypto.randomUUID(),
    arah: "terkirim",
    status: "menunggu",
    dibuat: new Date().toISOString(),
    tawaran: null,
    ...item,
  };
  tulis([baru, ...baca()]);
  return baru;
}