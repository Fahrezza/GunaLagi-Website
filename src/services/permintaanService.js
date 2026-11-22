import { getProfil } from "./authService";
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

// Rekaman di localStorage menyimpan DUA sudut pandang sekaligus:
// pemilikEmail/pengirimEmail untuk menyaring, lalu barang, pemilik, pengirim.
// getPermintaan() mengubahnya ke bentuk contohPermintaan (arah, barang, lawan, pesan, tawaran)
// sesuai pengguna yang sedang login.
function valid(r) {
  return r && r.barang && r.pemilik && r.pengirim;
}

function sudutPandang(r, email) {
  const pemilikSaya = r.pemilikEmail === email;
  const lawan = pemilikSaya ? r.pengirim : r.pemilik;
  return {
    id: r.id,
    arah: pemilikSaya ? "masuk" : "terkirim",
    status: r.status,
    dibuat: r.dibuat,
    diprosesPada: r.diprosesPada,
    barang: r.barang,
    lawan: { nama: lawan.nama || "Pengguna", kota: lawan.kota || "-", foto: lawan.foto || "" },
    pesan: r.pesan || "",
    tawaran: r.tawaran ?? null,
  };
}

// Semua fungsi dibuat async supaya nanti bisa diganti fetch ke server
// tanpa mengubah halaman dan komponennya.

// Data asli dipakai kalau ada. Data contoh hanya tampil saat belum ada data sama sekali.
export async function getPermintaan() {
  const asli = baca().filter(valid);
  if (asli.length === 0) return contohPermintaan;

  const p = getProfil();
  if (!p) return [];
  return asli
    .filter((r) => r.pemilikEmail === p.email || r.pengirimEmail === p.email)
    .map((r) => sudutPandang(r, p.email));
}

// Mengubah status. Data contoh tidak disimpan, jadi kembali seperti semula saat halaman dimuat ulang.
export async function ubahStatus(id, status) {
  const asli = baca();
  if (asli.length === 0) return { ok: true, contoh: true };

  const waktu = new Date().toISOString();
  tulis(asli.map((r) => (r.id === id ? { ...r, status, diprosesPada: waktu } : r)));
  return { ok: true };
}

// Dipakai halaman deskripsi barang nanti, saat pengguna menekan "Ajukan permintaan".
export async function tambahPermintaan(item) {
  const baru = {
    id: crypto.randomUUID(),
    status: "menunggu",
    dibuat: new Date().toISOString(),
    tawaran: null,
    ...item,
  };
  tulis([baru, ...baca()]);
  return baru;
}

// Riwayat: permintaan berstatus diterima milik pengguna yang login, terbaru dulu.
// Field datar (namaBarang, namaLawan, ...) dipakai RiwayatItem.
export function getRiwayat() {
  const p = getProfil();
  if (!p) return [];
  return baca()
    .filter(valid)
    .filter((r) => r.status === "diterima")
    .filter((r) => r.pemilikEmail === p.email || r.pengirimEmail === p.email)
    .map((r) => {
      const v = sudutPandang(r, p.email);
      return {
        id: v.id,
        arah: v.arah, // masuk = Diberikan ke, terkirim = Diterima dari
        namaBarang: v.barang.nama,
        fotoBarang: v.barang.foto,
        namaLawan: v.lawan.nama,
        fotoLawan: v.lawan.foto,
        diprosesPada: r.diprosesPada,
        dibuat: r.dibuat,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.diprosesPada || b.dibuat || 0) -
        new Date(a.diprosesPada || a.dibuat || 0)
    );
}

function dasar(barang, p) {
  return {
    pemilikEmail: barang.pemilikEmail,
    pengirimEmail: p.email,
    barang: {
      id: barang.id,
      nama: barang.nama,
      kategori: barang.kategori ?? "-",
      foto: barang.fotoList?.[0] ?? "",
    },
    pemilik: {
      nama: barang.pemilik ?? "Pengguna",
      kota: barang.kota ?? "",
      foto: barang.pemilikFoto ?? "",
    },
    pengirim: { nama: p.name, kota: p.kota ?? "", foto: p.picture ?? "" },
  };
}

export async function kirimRequestBarter({ barang, tawaran }) {
  const p = getProfil();
  if (!p) throw new Error("Belum login");

  return tambahPermintaan({
    ...dasar(barang, p),
    jenis: "barter",
    pesan: tawaran.catatan || "Tidak ada catatan.",
    tawaran: {
      nama: tawaran.nama,
      foto: tawaran.foto,
      kondisi: tawaran.kondisi,
      deskripsi: "-", // form barter belum punya kolom deskripsi
    },
  });
}

export async function kirimPermintaanDonasi({ barang, permintaan }) {
  const p = getProfil();
  if (!p) throw new Error("Belum login");

  const tambahan = [
    permintaan.pengambilan && `Pengambilan: ${permintaan.pengambilan}`,
    permintaan.catatan && `Catatan: ${permintaan.catatan}`,
  ].filter(Boolean);

  return tambahPermintaan({
    ...dasar(barang, p),
    jenis: "donasi",
    pesan: [permintaan.alasan, ...tambahan].join("\n\n"),
    tawaran: null,
  });
}
