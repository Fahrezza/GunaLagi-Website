const KEY = "barang";

// Dibaca Beranda. Berisi barang yang dibagikan lewat menu Bagikan Barang.
export function getBarang() {
  try {
    const data = JSON.parse(localStorage.getItem(KEY));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

// Dipakai menu Bagikan Barang nanti. Contoh item:
// { pemilik, kota, nama, kategori, deskripsi, foto }
export function tambahBarang(item) {
  const baru = { id: crypto.randomUUID(), ...item };
  localStorage.setItem(KEY, JSON.stringify([baru, ...getBarang()]));
  return baru;
}