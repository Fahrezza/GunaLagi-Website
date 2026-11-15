import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import StepIndikator from "../components/bagikan/StepIndikator.jsx";
import FotoUploader from "../components/bagikan/FotoUploader.jsx";
import InformasiBarang from "../components/bagikan/InformasiBarang.jsx";
import PilihanKartu from "../components/bagikan/PilihanKartu.jsx";
import KonfirmasiBarang from "../components/bagikan/KonfirmasiBarang.jsx";
import BerhasilBagikan from "../components/bagikan/BerhasilBagikan.jsx";
import useFotoBarang from "../hooks/useFotoBarang.js";
import { KONDISI, CARA } from "../data/opsiBarang.js";
import { kategori } from "../data/kategori.js";
import { tambahBarang } from "../services/barangService.js";

const awal = { nama: "", kategori: "", deskripsi: "", catatan: "", kondisi: "", cara: "" };

function periksa(form, jumlahFoto) {
  const e = {};
  if (jumlahFoto === 0) e.foto = "Unggah minimal 1 foto barang.";
  if (!form.nama.trim()) e.nama = "Nama barang wajib diisi.";
  if (!form.kategori) e.kategori = "Pilih kategori barang.";
  if (!form.kondisi) e.kondisi = "Pilih kondisi barang.";
  if (!form.cara) e.cara = "Pilih cara redistribusi.";
  return e;
}

const labelOpsi = (daftar, id) => daftar.find((d) => d.id === id)?.label ?? "";

export default function BagikanBarang() {
  const [form, setForm] = useState(awal);
  const [errors, setErrors] = useState({});
  const [langkah, setLangkah] = useState("detail"); // detail | konfirmasi | sukses
  const [mengirim, setMengirim] = useState(false);
  const [galat, setGalat] = useState("");
  const { foto, pesan, tambah, hapus, kosongkan } = useFotoBarang();

  const ubah = (kolom, nilai) => {
    setForm((f) => ({ ...f, [kolom]: nilai }));
    setErrors((e) => ({ ...e, [kolom]: undefined }));
  };

  const tambahFoto = (daftarFile) => {
    tambah(daftarFile);
    setErrors((e) => ({ ...e, foto: undefined }));
  };

  const keAtas = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const lanjut = (e) => {
    e.preventDefault();
    const found = periksa(form, foto.length);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      requestAnimationFrame(() =>
        document.querySelector('[role="alert"]')?.scrollIntoView({ behavior: "smooth", block: "center" })
      );
      return;
    }
    setLangkah("konfirmasi");
    keAtas();
  };

  const kembali = () => {
    setGalat("");
    setLangkah("detail");
    keAtas();
  };

  const kirim = async () => {
    setMengirim(true);
    setGalat("");
    try {
      await tambahBarang({
        nama: form.nama.trim(),
        kategoriBarang: form.kategori,
        deskripsi: form.deskripsi.trim(),
        catatan: form.catatan.trim(),
        kondisi: form.kondisi,
        cara: form.cara,
        foto: foto.map((f) => f.file),
      });
      kosongkan();
      setLangkah("sukses");
      keAtas();
    } catch (err) {
      setGalat(err.message || "Gagal membagikan barang. Coba lagi.");
    } finally {
      setMengirim(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-2xl px-6 pb-20 pt-10">
        <h1 className="font-display text-3xl font-bold text-neutral-950">Bagikan Barang</h1>
        <p className="mt-1 text-sm text-neutral-600">
          Beri kesempatan kedua untuk barang yang tidak lagi kamu butuhkan
        </p>
        <StepIndikator aktif={langkah === "detail" ? 1 : 2} />

        {langkah === "detail" && (
          <form onSubmit={lanjut} noValidate className="mt-6 space-y-6">
            <FotoUploader
              foto={foto}
              onTambah={tambahFoto}
              onHapus={hapus}
              pesan={pesan}
              error={errors.foto}
            />
            <InformasiBarang nilai={form} onUbah={ubah} errors={errors} />
            <PilihanKartu
              judul="Kondisi Barang"
              bantuan="Pilih kondisi barang yang sesuai dengan keadaan barang yang ingin anda berikan."
              nama="kondisi"
              opsi={KONDISI}
              nilai={form.kondisi}
              onUbah={(v) => ubah("kondisi", v)}
              error={errors.kondisi}
            />
            <PilihanKartu
              judul="Cara Redistribusi"
              bantuan="Pilih metode pemberian anda agar barang berpindah tangan ke calon penerima."
              nama="cara"
              opsi={CARA}
              nilai={form.cara}
              onUbah={(v) => ubah("cara", v)}
              error={errors.cara}
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-forest px-4 py-3 text-sm font-semibold text-white transition hover:bg-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            >
              Submit
            </button>
          </form>
        )}

        {langkah === "konfirmasi" && (
          <KonfirmasiBarang
            data={form}
            foto={foto}
            labelKategori={kategori.find((k) => k.slug === form.kategori)?.nama ?? ""}
            labelKondisi={labelOpsi(KONDISI, form.kondisi)}
            labelCara={labelOpsi(CARA, form.cara)}
            onKembali={kembali}
            onSubmit={kirim}
            mengirim={mengirim}
            error={galat}
          />
        )}

        {langkah === "sukses" && <BerhasilBagikan />}
      </main>
    </>
  );
}