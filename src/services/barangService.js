import { kecilkanGambar } from "../utils/gambar.js";
import { getSession } from "./authService.js";
import { CARA } from "../data/opsiBarang.js";

const KEY = "barang";

// Dibaca Beranda. Berisi barang yang dibagikan lewat halaman Bagikan Barang.
export function getBarang() {
  try {
    const data = JSON.parse(localStorage.getItem(KEY));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

// Dipakai halaman Bagikan Barang.
// data: { nama, kategoriBarang, deskripsi, catatan, kondisi, cara, foto: File[] }
// Halaman hanya mengirim data mentah. Penyimpanan dan pemilik ditentukan di sini,
// jadi saat database siap, hanya fungsi ini yang diganti.
export async function tambahBarang(data) {
  const user = getSession();

  let foto;
  try {
    foto = await Promise.all(data.foto.map((f) => kecilkanGambar(f)));
  } catch {
    throw new Error("Foto tidak dapat diproses. Coba gunakan foto JPG atau PNG lain.");
  }

  const cara = CARA.find((c) => c.id === data.cara);
  const baru = {
    id: crypto.randomUUID(),
    pemilik: user?.name ?? "Pengguna",
    pemilikEmail: user?.email ?? "",
    kota: user?.kota ?? "",
    nama: data.nama,
    // "kategori" dipakai BarangCard untuk label Donasi atau Barter / Tukar.
    kategori: cara?.label ?? "",
    kategoriBarang: data.kategoriBarang,
    kondisi: data.kondisi,
    cara: data.cara,
    deskripsi: data.deskripsi,
    catatan: data.catatan,
    foto: foto[0] ?? "",
    fotoList: foto,
    dibuat: new Date().toISOString(),
  };

  try {
    localStorage.setItem(KEY, JSON.stringify([baru, ...getBarang()]));
  } catch {
    throw new Error("Penyimpanan browser penuh. Kurangi jumlah foto atau hapus barang lama.");
  }
  return baru;
}