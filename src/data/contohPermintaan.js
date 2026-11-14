// Data contoh. Bentuknya sama dengan yang nanti dikirim database.
// arah   : "masuk" (orang lain meminta barangmu) atau "terkirim" (kamu meminta barang orang lain)
// status : "menunggu" | "diterima" | "ditolak"
// lawan  : pemohon (untuk "masuk") atau pemilik barang (untuk "terkirim")
// tawaran: barang yang ditawarkan untuk barter, atau null untuk donasi
export const contohPermintaan = [
  {
    id: "m1",
    arah: "masuk",
    status: "menunggu",
    dibuat: "2026-11-08T09:00:00.000Z",
    barang: { id: "c1", nama: "Baju Kaos Putih", kategori: "Donasi", foto: "" },
    lawan: { nama: "Jupri", kota: "Batam", foto: "" },
    pesan:
      "Saya membutuhkan baju kaos putih ini untuk acara ulang tahun teman saya nanti, saya harap anda bisa memberikannya kepada saya.",
    tawaran: null,
  },
  {
    id: "m2",
    arah: "masuk",
    status: "menunggu",
    dibuat: "2026-11-08T07:30:00.000Z",
    barang: { id: "c2", nama: "Kamera Vintage", kategori: "Barter / Tukar", foto: "" },
    lawan: { nama: "Nisa", kota: "Batam", foto: "" },
    pesan:
      "Menurut saya ini cukup menjadi win-win solution, karena barang yang saya tawarkan punya value yang sama.",
    tawaran: {
      nama: "Handphone",
      deskripsi: "Handphone masih berfungsi dengan baik dan cocok untuk penggunaan sehari-hari.",
      kondisi: "Cukup Baik",
      foto: "",
    },
  },
  {
    id: "m3",
    arah: "masuk",
    status: "diterima",
    dibuat: "2026-11-06T13:15:00.000Z",
    barang: { id: "c5", nama: "Buku Novel", kategori: "Donasi", foto: "" },
    lawan: { nama: "Rafi", kota: "Medan", foto: "" },
    pesan: "Saya sedang mengumpulkan novel untuk perpustakaan kecil di komunitas saya.",
    tawaran: null,
  },
  {
    id: "m4",
    arah: "masuk",
    status: "ditolak",
    dibuat: "2026-11-05T10:00:00.000Z",
    barang: { id: "c3", nama: "Sofa Coklat", kategori: "Barter / Tukar", foto: "" },
    lawan: { nama: "Dewi", kota: "Jakarta", foto: "" },
    pesan: "Apakah masih tersedia? Saya tertarik menukarnya dengan meja belajar.",
    tawaran: {
      nama: "Meja Belajar",
      deskripsi: "Meja belajar kayu dengan satu laci, ukuran sedang.",
      kondisi: "Baik",
      foto: "",
    },
  },
  {
    id: "t1",
    arah: "terkirim",
    status: "menunggu",
    dibuat: "2026-11-08T11:00:00.000Z",
    barang: { id: "c6", nama: "Kemeja Flannel", kategori: "Donasi", foto: "" },
    lawan: { nama: "Brandon", kota: "Jakarta", foto: "" },
    pesan:
      "Saya butuh banget kemeja flannel ini untuk kemeja saya ke kampus, jika setuju boleh tolong langsung chat saya ya.",
    tawaran: null,
  },
  {
    id: "t2",
    arah: "terkirim",
    status: "diterima",
    dibuat: "2026-11-07T15:45:00.000Z",
    barang: { id: "x1", nama: "Aksesoris", kategori: "Barter / Tukar", foto: "" },
    lawan: { nama: "Nisa", kota: "Batam", foto: "" },
    pesan:
      "Saya butuh aksesoris ini untuk gelang saya, dan dirumah saya kebetulan ada sepatu yang udah ga kepake nih. Siapa tau butuh jadi kita saling tukar barang aja kak hehehe.",
    tawaran: {
      nama: "Sepatu",
      deskripsi: "Sepatu dengan kondisi baik dan masih nyaman digunakan. Tidak terdapat kerusakan yang berarti.",
      kondisi: "Baik",
      foto: "",
    },
  },
  {
    id: "t3",
    arah: "terkirim",
    status: "ditolak",
    dibuat: "2026-11-04T08:20:00.000Z",
    barang: { id: "c4", nama: "Handphone", kategori: "Barter / Tukar", foto: "" },
    lawan: { nama: "Jupri", kota: "Batam", foto: "" },
    pesan: "Boleh saya tukar dengan jaket denim milik saya?",
    tawaran: {
      nama: "Jaket Denim",
      deskripsi: "Jaket denim dengan warna yang masih bagus dan jahitan rapi.",
      kondisi: "Baik",
      foto: "",
    },
  },
];