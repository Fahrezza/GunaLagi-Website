import { getSession } from "./authService.js";

const KEY = "favorit";

function bacaSemua() {
  try {
    const d = JSON.parse(localStorage.getItem(KEY));
    return d && typeof d === "object" && !Array.isArray(d) ? d : {};
  } catch {
    return {};
  }
}

function kunciPengguna() {
  const u = getSession();
  return u?.email ?? u?.username ?? null;
}

// Daftar id barang yang difavoritkan pengguna yang sedang login.
export async function getFavorit() {
  const k = kunciPengguna();
  if (!k) return [];
  const daftar = bacaSemua()[k];
  return Array.isArray(daftar) ? daftar : [];
}

// Menambah atau menghapus favorit. Mengembalikan true bila sekarang difavoritkan.
export async function ubahFavorit(barangId) {
  const k = kunciPengguna();
  if (!k) throw new Error("Silakan login terlebih dahulu.");

  const semua = bacaSemua();
  const lama = Array.isArray(semua[k]) ? semua[k] : [];
  const sudah = lama.includes(barangId);
  const baru = sudah ? lama.filter((x) => x !== barangId) : [barangId, ...lama];

  try {
    localStorage.setItem(KEY, JSON.stringify({ ...semua, [k]: baru }));
  } catch {
    throw new Error("Gagal menyimpan favorit.");
  }
  return !sudah;
}