import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import HeroSection from "../components/beranda/HeroSection.jsx";
import LangkahSection from "../components/beranda/LangkahSection.jsx";
import RekomendasiSection from "../components/beranda/RekomendasiSection.jsx";
import FooterCta from "../components/beranda/FooterCta.jsx";
import { getBarang } from "../services/barangService.js";
import { contohBarang } from "../data/contohBarang.js";

export default function Beranda() {
  const [params] = useSearchParams();
  const kataKunci = (params.get("cari") ?? "").trim();
  const rekomendasiRef = useRef(null);
  // Barang asli dipakai kalau ada. Kartu contoh hanya tampil saat belum ada barang sama sekali.
  const [semuaBarang] = useState(() => {
  const asli = getBarang();
  return asli.length > 0 ? asli : contohBarang;
  });

  const hasil = kataKunci
    ? semuaBarang.filter((b) =>
        [b.nama, b.kategori, b.kota, b.pemilik, b.deskripsi]
          .join(" ")
          .toLowerCase()
          .includes(kataKunci.toLowerCase())
      )
    : semuaBarang;

  // Tombol "Lihat Barang": scroll halus ke bagian rekomendasi.
  // Ganti block: "start" menjadi "end" untuk berhenti di bagian paling bawah rekomendasi.
  const keRekomendasi = () =>
    rekomendasiRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  // Setelah mencari, otomatis turun ke hasil.
  useEffect(() => {
    if (kataKunci) rekomendasiRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [kataKunci]);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection onLihatBarang={keRekomendasi} />
        <LangkahSection />
        <RekomendasiSection items={hasil} kataKunci={kataKunci} sectionRef={rekomendasiRef} />
      </main>
      <FooterCta />
    </>
  );
}