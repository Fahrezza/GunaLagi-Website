import { getProfil } from "./authService";
import { getBarangById } from "./detailBarangService.js";

const KEY = "pesan";

// Bentuk satu percakapan di penyimpanan:
// { id, barang: {id, nama, foto, cara}, peserta: [{email, nama, kota, foto} x2],
//   pesan: [{id, dari(email), teks, waktu}], dibaca: {email: waktu}, diubah }
// Semua fungsi async supaya nanti bisa diganti fetch ke server tanpa mengubah halaman.

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

function saya() {
  const p = getProfil();
  if (!p) throw new Error("Belum login");
  return p;
}

// Mengubah rekaman menjadi sudut pandang pengguna yang login.
function lihat(c, email) {
  const lawan = c.peserta.find((x) => x.email !== email) ?? { email: "", nama: "Pengguna", kota: "", foto: "" };
  const batas = c.dibaca?.[email] ?? "";
  return {
    id: c.id,
    barang: c.barang,
    lawan,
    pesan: c.pesan,
    terakhir: c.pesan[c.pesan.length - 1] ?? null,
    belumDibaca: c.pesan.filter((m) => m.dari !== email && m.waktu > batas).length,
  };
}

const milikSaya = (c, email) => c.peserta.some((x) => x.email === email);

// Daftar percakapan yang sudah berisi pesan, terbaru di atas.
export async function getPercakapan() {
  const p = getProfil();
  if (!p) return [];
  return baca()
    .filter((c) => milikSaya(c, p.email) && c.pesan.length > 0)
    .map((c) => lihat(c, p.email))
    .sort((a, b) => b.terakhir.waktu.localeCompare(a.terakhir.waktu));
}

export async function getPercakapanById(id) {
  const p = getProfil();
  if (!p) return null;
  const c = baca().find((x) => x.id === id && milikSaya(x, p.email));
  return c ? lihat(c, p.email) : null;
}

// Buka percakapan untuk satu barang. Tanpa lawanAwal, lawannya pemilik barang
// (tombol "Hubungi Pemilik"). Dengan lawanAwal, lawannya orang itu (tombol Chat di Permintaan Masuk).
export async function bukaPercakapanBarang(barangId, lawanAwal = null) {
  const p = saya();
  const barang = await getBarangById(barangId);
  if (!barang) return null;

  // Barang contoh tidak punya email pemilik, jadi dibuatkan identitas pengganti.
  const lawan = lawanAwal?.email
    ? lawanAwal
    : {
        email: barang.pemilikEmail || `contoh:${barang.pemilik}`,
        nama: barang.pemilik ?? "Pengguna",
        kota: barang.kota ?? "",
        foto: barang.pemilikFoto ?? "",
      };
  if (lawan.email === p.email) return { sendiri: true };

  const semua = baca();
  const ada = semua.find(
    (c) =>
      String(c.barang.id) === String(barang.id) &&
      milikSaya(c, p.email) &&
      milikSaya(c, lawan.email)
  );
  if (ada) return lihat(ada, p.email);

  const caraId = barang.cara ?? (barang.kategori === "Donasi" ? "donasi" : "barter");
  const baru = {
    id: crypto.randomUUID(),
    barang: { id: barang.id, nama: barang.nama, foto: barang.fotoList?.[0] ?? "", cara: caraId },
    peserta: [
      { email: p.email, nama: p.name, kota: p.kota ?? "", foto: p.picture ?? "" },
      { email: lawan.email, nama: lawan.nama, kota: lawan.kota ?? "", foto: lawan.foto ?? "" },
    ],
    pesan: [],
    dibaca: {},
    diubah: new Date().toISOString(),
  };
  // Percakapan kosong yang ditinggalkan dibersihkan supaya penyimpanan tidak menumpuk.
  tulis([...semua.filter((c) => c.pesan.length > 0), baru]);
  return lihat(baru, p.email);
}

export async function kirimPesan(id, teks) {
  const p = saya();
  const isi = String(teks ?? "").trim();
  if (!isi) throw new Error("Pesan kosong");

  const semua = baca();
  const c = semua.find((x) => x.id === id && milikSaya(x, p.email));
  if (!c) throw new Error("Percakapan tidak ditemukan");

  const waktu = new Date().toISOString();
  c.pesan.push({ id: crypto.randomUUID(), dari: p.email, teks: isi.slice(0, 1000), waktu });
  c.dibaca = { ...c.dibaca, [p.email]: waktu };
  c.diubah = waktu;
  tulis(semua);
  return lihat(c, p.email);
}

export async function tandaiDibaca(id) {
  const p = saya();
  const semua = baca();
  const c = semua.find((x) => x.id === id && milikSaya(x, p.email));
  if (!c) return;
  c.dibaca = { ...c.dibaca, [p.email]: new Date().toISOString() };
  tulis(semua);
}

// Untuk lencana di Navbar.
export async function getJumlahBelumDibaca() {
  const daftar = await getPercakapan();
  return daftar.reduce((n, c) => n + c.belumDibaca, 0);
}
