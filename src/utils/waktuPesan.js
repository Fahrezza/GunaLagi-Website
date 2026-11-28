const mulaiHari = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

const selisihHari = (iso) =>
  Math.round((mulaiHari(new Date()) - mulaiHari(new Date(iso))) / 86400000);

export const kunciHari = (iso) => new Date(iso).toDateString();

export function jam(iso) {
  return new Date(iso).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", hour12: false });
}

export function labelHari(iso) {
  const s = selisihHari(iso);
  if (s === 0) return "Hari ini";
  if (s === 1) return "Kemarin";
  return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

// Untuk daftar percakapan: "Baru saja", "10 menit lalu", "11.05", "Kemarin", "12 Mar".
export function relatif(iso) {
  const menit = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (menit < 1) return "Baru saja";
  if (menit < 60) return `${menit} menit lalu`;
  const s = selisihHari(iso);
  if (s === 0) return jam(iso);
  if (s === 1) return "Kemarin";
  return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short" });
}
