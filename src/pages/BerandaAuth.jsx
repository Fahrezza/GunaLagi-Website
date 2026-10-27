import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import HeroAuth from "../components/beranda/HeroAuth.jsx";
import KategoriSection from "../components/beranda/KategoriSection.jsx";
import RekomendasiSection from "../components/beranda/RekomendasiSection.jsx";
import FooterCtaAuth from "../components/beranda/FooterCtaAuth.jsx";
import { getBarang } from "../services/barangService.js";
import { contohBarang } from "../data/contohBarang.js";

export default function BerandaAuth() {
  const [params] = useSearchParams();
  const kataKunci = (params.get("cari") ?? "").trim();
  const rekomendasiRef = useRef(null);

  // Barang asli dipakai kalau ada. Kartu contoh hanya tampil saat belum ada barang.
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

  // Setelah mencari, otomatis turun ke hasil.
  useEffect(() => {
    if (kataKunci) rekomendasiRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [kataKunci]);

  return (
    <>
      <Navbar />
      <main>
        <HeroAuth />
        <KategoriSection />
        <RekomendasiSection
          items={hasil}
          kataKunci={kataKunci}
          sectionRef={rekomendasiRef}
          kartuHover
        />
      </main>
      <FooterCtaAuth />
    </>
  );
}