import { getBarang } from "./barangService.js";
import { contohBarang } from "../data/contohBarang.js";
import { contohDetail } from "../data/contohDetail.js";

const HARI = 24 * 60 * 60 * 1000;

// Melengkapi data barang agar halaman detail selalu punya semua field-nya.
function lengkapi(b) {
  const d = contohDetail[b.id];
  if (d) {
    return {
      fotoList: b.foto ? [b.foto] : [],
      ...b,
      kategoriBarang: d.kategoriBarang,
      kondisi: d.kondisi,
      catatan: d.catatan,
      tertarik: d.tertarik,
      pemilikBergabung: d.pemilikBergabung,
      dibuat: new Date(Date.now() - d.hariLalu * HARI).toISOString(),
    };
  }
  return { tertarik: 0, catatan: "", fotoList: b.foto ? [b.foto] : [], ...b };
}

// Semua fungsi dibuat async supaya nanti bisa diganti fetch ke server
// tanpa mengubah halaman dan komponennya.
export async function getBarangById(id) {
  const asli = getBarang().find((b) => b.id === id);
  if (asli) return lengkapi(asli);
  const contoh = contohBarang.find((b) => b.id === id);
  return contoh ? lengkapi(contoh) : null;
}

// Barang dengan kategori yang sama didahulukan, sisanya diisi barang lain.
export async function getBarangSerupa(barang, batas = 3) {
  const asli = getBarang();
  const sumber = (asli.length > 0 ? asli : contohBarang)
    .map(lengkapi)
    .filter((b) => b.id !== barang.id);
  const sama = sumber.filter((b) => b.kategoriBarang && b.kategoriBarang === barang.kategoriBarang);
  const lain = sumber.filter((b) => !sama.includes(b));
  return [...sama, ...lain].slice(0, batas);
}