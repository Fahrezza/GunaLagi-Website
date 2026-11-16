import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Breadcrumb from "../components/detail/Breadcrumb.jsx";
import GaleriFoto from "../components/detail/GaleriFoto.jsx";
import KartuPemilik from "../components/detail/KartuPemilik.jsx";
import KartuAksi from "../components/detail/KartuAksi.jsx";
import AksiIkon from "../components/detail/AksiIkon.jsx";
import RingkasanBarang from "../components/detail/RingkasanBarang.jsx";
import InfoDetail from "../components/detail/InfoDetail.jsx";
import BarangSerupa from "../components/detail/BarangSerupa.jsx";
import LaporModal from "../components/detail/LaporModal.jsx";
import Toast from "../components/detail/Toast.jsx";
import { getSession } from "../services/authService.js";
import { getBarangById, getBarangSerupa } from "../services/detailBarangService.js";
import { getFavorit, ubahFavorit } from "../services/favoritService.js";
import { KONDISI, CARA } from "../data/opsiBarang.js";
import { kategori } from "../data/kategori.js";
import { salinTeks } from "../utils/salin.js";

const awal = { id: null, barang: null, serupa: [], favorit: false, galat: false };

export default function DetailBarang() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [hasil, setHasil] = useState(awal);
  const [laporBuka, setLaporBuka] = useState(false);
  const [toast, setToast] = useState("");
  const timer = useRef(null);

  // Pindah antar barang (misalnya dari Barang Serupa) selalu mulai dari atas.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    let batal = false;
    (async () => {
      try {
        const barang = await getBarangById(id);
        const serupa = barang ? await getBarangSerupa(barang) : [];
        const favorit = barang ? (await getFavorit()).includes(barang.id) : false;
        if (!batal) setHasil({ id, barang, serupa, favorit, galat: false });
      } catch {
        if (!batal) setHasil({ id, barang: null, serupa: [], favorit: false, galat: true });
      }
    })();
    return () => {
      batal = true;
    };
  }, [id]);

  const tampilToast = useCallback((teks) => {
    setToast(teks);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(""), 2500);
  }, []);

  const { barang, serupa, favorit, galat } = hasil;
  const memuat = hasil.id !== id;
  const user = getSession();
  const berandaPath = user ? "/beranda" : "/";

  if (memuat) {
    return (
      <>
        <Navbar />
        <main className="mx-auto w-full max-w-6xl px-6 py-24">
          <p className="text-center text-sm text-neutral-500">Memuat barang...</p>
        </main>
      </>
    );
  }

  if (!barang) {
    return (
      <>
        <Navbar />
        <main className="mx-auto w-full max-w-xl px-6 py-24 text-center">
          <h1 className="font-display text-2xl font-bold text-forest">
            {galat ? "Gagal memuat barang" : "Barang tidak ditemukan"}
          </h1>
          <p className="mt-2 text-sm text-neutral-600">
            {galat
              ? "Terjadi kesalahan saat memuat data. Coba muat ulang halaman."
              : "Barang ini mungkin sudah dihapus atau tautannya salah."}
          </p>
          <Link
            to={berandaPath}
            className="mt-6 inline-flex rounded-lg bg-lime-brand px-5 py-2.5 text-sm font-semibold hover:bg-lime-brand-dark"
          >
            Kembali ke Beranda
          </Link>
        </main>
      </>
    );
  }

  const milikSendiri = Boolean(user?.email && barang.pemilikEmail && user.email === barang.pemilikEmail);
  const caraId = barang.cara ?? (barang.kategori === "Donasi" ? "donasi" : "barter");
  const labelCara = CARA.find((c) => c.id === caraId)?.label ?? barang.kategori ?? "-";
  const labelKondisi = KONDISI.find((k) => k.id === barang.kondisi)?.label ?? "-";
  const labelKategori = kategori.find((k) => k.slug === barang.kategoriBarang)?.nama ?? "-";
  const jumlahTertarik = barang.tertarik + (favorit ? 1 : 0);

  // Aksi yang butuh login: pengunjung dikirim ke Login lalu kembali ke halaman ini.
  const gerbang = (aksi) => {
    if (!getSession()) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    aksi();
  };

  const bagikan = async () => {
    const ok = await salinTeks(window.location.href);
    tampilToast(ok ? "Tautan disalin" : "Gagal menyalin tautan");
  };

  const ubahFav = () =>
    gerbang(async () => {
      try {
        const baru = await ubahFavorit(barang.id);
        setHasil((h) => ({ ...h, favorit: baru }));
        tampilToast(baru ? "Ditambahkan ke favorit" : "Dihapus dari favorit");
      } catch {
        tampilToast("Gagal menyimpan favorit. Coba lagi.");
      }
    });

  const bukaLapor = () => gerbang(() => setLaporBuka(true));

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-6 pb-20 pt-8">
        <Breadcrumb berandaPath={berandaPath} nama={barang.nama} />

        <div className="mt-5 grid grid-cols-[1.6fr_1fr] items-start gap-6">
          <GaleriFoto key={barang.id} foto={barang.fotoList} nama={barang.nama} />
          <aside className="space-y-3">
            <KartuPemilik
              pemilik={barang.pemilik}
              foto={barang.pemilikFoto}
              kota={barang.kota}
              bergabung={barang.pemilikBergabung}
            />
            <KartuAksi barang={barang} donasi={caraId === "donasi"} milikSendiri={milikSendiri} />
            <AksiIkon
              favorit={favorit}
              onFavorit={ubahFav}
              onBagikan={bagikan}
              onLapor={bukaLapor}
              milikSendiri={milikSendiri}
            />
          </aside>
        </div>

        <RingkasanBarang
          barang={barang}
          labelCara={labelCara}
          labelKondisi={labelKondisi}
          tertarik={jumlahTertarik}
        />

        <div className="mt-6 grid grid-cols-[1.6fr_1fr] gap-6">
          <InfoDetail
            kategori={labelKategori}
            cara={labelCara}
            kondisi={labelKondisi}
            lokasi={barang.kota || "-"}
          />
        </div>

        <BarangSerupa items={serupa} />
      </main>

      {laporBuka && <LaporModal barang={barang} onTutup={() => setLaporBuka(false)} />}
      <Toast pesan={toast} />
    </>
  );
}