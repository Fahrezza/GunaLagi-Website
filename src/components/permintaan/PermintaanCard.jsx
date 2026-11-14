import { Link } from "react-router-dom";
import { IkonChat } from "../Ikon.jsx";

const labelStatus = { menunggu: "Menunggu", diterima: "Diterima", ditolak: "Ditolak" };
const warnaStatus = {
  menunggu: "bg-amber-100 text-amber-800",
  diterima: "bg-lime-brand/40 text-forest",
  ditolak: "bg-red-100 text-red-700",
};

const dasar =
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest disabled:cursor-not-allowed disabled:opacity-60";
const gaya = {
  lime: "bg-lime-brand text-neutral-950 hover:bg-forest hover:text-white",
  gelap: "bg-forest text-white hover:bg-neutral-900",
  garis: "border border-neutral-400 bg-white text-neutral-900 hover:bg-neutral-100",
};

function Thumb({ foto, nama, kecil = false }) {
  const ukuran = kecil ? "h-9 w-9" : "h-11 w-11";
  return foto ? (
    <img src={foto} alt={nama} className={`${ukuran} shrink-0 rounded-md object-cover`} />
  ) : (
    <span className={`${ukuran} shrink-0 rounded-md bg-neutral-200`} aria-hidden="true" />
  );
}

function Avatar({ foto, nama }) {
  return foto ? (
    <img src={foto} alt="" className="h-8 w-8 shrink-0 rounded-full object-cover" />
  ) : (
    <span
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-semibold text-neutral-700"
      aria-hidden="true"
    >
      {nama.charAt(0).toUpperCase()}
    </span>
  );
}

function TombolChat() {
  return (
    <Link to="/pesan" className={`${dasar} ${gaya.garis}`}>
      <IkonChat width={18} height={18} />
      Chat
    </Link>
  );
}

export default function PermintaanCard({ permintaan, onUbahStatus, sibuk = false }) {
  const { id, arah, status, barang, lawan, pesan, tawaran } = permintaan;
  const masuk = arah === "masuk";
  const peran = masuk ? "Pemohon" : "Pemilik";

  let aksi;
  if (masuk && status === "menunggu") {
    aksi = (
      <>
        <button
          type="button"
          disabled={sibuk}
          onClick={() => onUbahStatus(id, "diterima")}
          className={`${dasar} ${gaya.lime} flex-1`}
        >
          Terima
        </button>
        <button
          type="button"
          disabled={sibuk}
          onClick={() => onUbahStatus(id, "ditolak")}
          className={`${dasar} ${gaya.garis} flex-1`}
        >
          Tolak
        </button>
        <TombolChat />
      </>
    );
  } else if (!masuk && status === "menunggu") {
    aksi = (
      <>
        <Link to={`/barang/${barang.id}`} className={`${dasar} ${gaya.gelap} flex-1`}>
          Lihat Barang
        </Link>
        <TombolChat />
      </>
    );
  } else if (status === "diterima") {
    aksi = (
      <Link to="/pesan" className={`${dasar} ${gaya.garis} flex-1`}>
        Lihat chat
      </Link>
    );
  } else {
    aksi = (
      <Link to={`/barang/${barang.id}`} className={`${dasar} ${gaya.garis} flex-1`}>
        Lihat Barang
      </Link>
    );
  }

  return (
    <article className="overflow-hidden rounded-xl border border-neutral-300 bg-white shadow-sm">
      <header className="flex items-center justify-between gap-3 p-4">
        <div className="flex min-w-0 items-center gap-3">
          <Thumb foto={barang.foto} nama={barang.nama} />
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-semibold">{barang.nama}</p>
            <p className="text-[11px] text-neutral-500">{barang.kategori}</p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Avatar foto={lawan.foto} nama={lawan.nama} />
          <div className="leading-tight">
            <p className="text-sm font-semibold">{lawan.nama}</p>
            <p className="text-[11px] text-neutral-500">
              {peran} · {lawan.kota}
            </p>
          </div>
        </div>
      </header>

      <div className="space-y-3 border-t border-neutral-300 bg-neutral-100 p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xs font-semibold">Detail Keterangan Permintaan</h3>
          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${warnaStatus[status]}`}>
            {labelStatus[status]}
          </span>
        </div>

        {tawaran && (
          <div className="rounded-lg border border-lime-edge bg-lime-soft p-3">
            <p className="text-xs font-semibold">Barang yang ditawarkan</p>
            <div className="mt-2 flex items-center gap-3">
              <Thumb foto={tawaran.foto} nama={tawaran.nama} kecil />
              <p className="text-base font-semibold">{tawaran.nama}</p>
            </div>
            <div className="mt-3 grid grid-cols-[1fr_9rem] gap-3">
              <div>
                <p className="text-xs font-semibold">Deskripsi barang</p>
                <p className="mt-1 text-xs text-neutral-600">{tawaran.deskripsi}</p>
              </div>
              <div>
                <p className="text-xs font-semibold">Kondisi Barang</p>
                <p className="mt-1 text-xs text-neutral-600">{tawaran.kondisi}</p>
              </div>
            </div>
          </div>
        )}

        <div className="min-h-20 whitespace-pre-line rounded-lg border border-neutral-300 bg-neutral-50 p-3 text-xs text-forest">
          {pesan}
        </div>

        <div className="flex gap-3">{aksi}</div>
      </div>
    </article>
  );
}