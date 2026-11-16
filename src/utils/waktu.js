const MENIT = 60 * 1000;
const JAM = 60 * MENIT;
const HARI = 24 * JAM;

// Contoh hasil: "1 Hari yang lalu"
export function waktuLalu(iso) {
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return "";
  const selisih = Math.max(0, Date.now() - t);
  if (selisih < MENIT) return "Baru saja";
  if (selisih < JAM) return `${Math.floor(selisih / MENIT)} Menit yang lalu`;
  if (selisih < HARI) return `${Math.floor(selisih / JAM)} Jam yang lalu`;
  if (selisih < 30 * HARI) return `${Math.floor(selisih / HARI)} Hari yang lalu`;
  if (selisih < 365 * HARI) return `${Math.floor(selisih / (30 * HARI))} Bulan yang lalu`;
  return `${Math.floor(selisih / (365 * HARI))} Tahun yang lalu`;
}

// Contoh hasil: "14/02/2026"
export function formatTanggal(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "numeric" });
}