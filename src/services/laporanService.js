import { getSession } from "./authService.js";

const KEY = "laporan";

function baca() {
  try {
    const data = JSON.parse(localStorage.getItem(KEY));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

// data: { barangId, alasan, keterangan }
export async function kirimLaporan({ barangId, alasan, keterangan }) {
  const pelapor = getSession()?.email ?? "";
  const semua = baca();

  if (pelapor && semua.some((l) => l.barangId === barangId && l.pelapor === pelapor)) {
    throw new Error("Kamu sudah melaporkan barang ini. Laporanmu sedang kami periksa.");
  }

  const baru = {
    id: crypto.randomUUID(),
    barangId,
    alasan,
    keterangan,
    pelapor,
    status: "baru",
    dibuat: new Date().toISOString(),
  };

  try {
    localStorage.setItem(KEY, JSON.stringify([baru, ...semua]));
  } catch {
    throw new Error("Gagal menyimpan laporan. Coba lagi.");
  }
  return baru;
}