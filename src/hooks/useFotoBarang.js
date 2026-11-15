import { useCallback, useEffect, useRef, useState } from "react";

export const MAKS_FOTO = 5;
const MAKS_UKURAN = 10 * 1024 * 1024; // 10 MB

// Custom hook: mengelola daftar foto yang dipilih beserta alamat pratinjaunya.
export default function useFotoBarang() {
  const [foto, setFoto] = useState([]);
  const [pesan, setPesan] = useState("");
  const terbaru = useRef([]);

  useEffect(() => {
    terbaru.current = foto;
  }, [foto]);

  // Bebaskan semua alamat sementara saat halaman ditutup.
  useEffect(() => {
    return () => {
      terbaru.current.forEach((f) => URL.revokeObjectURL(f.preview));
    };
  }, []);

  const tambah = useCallback((daftarFile) => {
    setPesan("");
    const baru = [];
    let ditolak = "";

    for (const file of Array.from(daftarFile)) {
      if (!file.type.startsWith("image/")) {
        ditolak = "Hanya file gambar yang bisa diunggah.";
        continue;
      }
      if (file.size > MAKS_UKURAN) {
        ditolak = "Ukuran foto maksimal 10 MB.";
        continue;
      }
      baru.push({ id: crypto.randomUUID(), file, preview: URL.createObjectURL(file) });
    }

    const sisa = Math.max(0, MAKS_FOTO - terbaru.current.length);
    const muat = baru.slice(0, sisa);
    baru.slice(muat.length).forEach((f) => URL.revokeObjectURL(f.preview));
    if (baru.length > muat.length) ditolak = `Maksimal ${MAKS_FOTO} foto.`;

    if (muat.length > 0) setFoto((lama) => [...lama, ...muat]);
    if (ditolak) setPesan(ditolak);
  }, []);

  const hapus = useCallback((id) => {
    setPesan("");
    const target = terbaru.current.find((f) => f.id === id);
    if (target) URL.revokeObjectURL(target.preview);
    setFoto((lama) => lama.filter((f) => f.id !== id));
  }, []);

  const kosongkan = useCallback(() => {
    terbaru.current.forEach((f) => URL.revokeObjectURL(f.preview));
    setFoto([]);
    setPesan("");
  }, []);

  return { foto, pesan, tambah, hapus, kosongkan };
}