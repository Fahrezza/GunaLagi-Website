import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import IkonAkun from "./IkonAkun";

function Kotak({ ikon, angka, label }) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-gray-200/70 px-5 py-3">
      <IkonAkun nama={ikon} className="size-6 text-green-950" />
      <div className="text-sm leading-tight">
        <div className="font-semibold">{angka}</div>
        <div>{label}</div>
      </div>
    </div>
  );
}

export default function ProfilHeader({ profil, jumlahBagikan, jumlahTerima }) {
  const lokasi = [profil.kota, profil.provinsi].filter(Boolean).join(", ");
  const bergabung = profil.dibuat
    ? new Date(profil.dibuat).toLocaleDateString("id-ID", { month: "long", year: "numeric" })
    : "-";

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-300 bg-gray-100">
      <div className="h-40 bg-linear-to-r from-green-950 to-green-600" />
      <div className="relative px-6 pb-8">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <div className="-mt-10 size-24 overflow-hidden rounded-2xl border-2 border-white shadow">
              <Avatar src={profil.picture} nama={profil.name} className="size-24 text-3xl" />
            </div>
            <div className="pt-2">
              <h1 className="text-lg font-semibold text-green-950">{profil.name}</h1>
              <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                <IkonAkun nama="pin" className="size-3.5" />
                {lokasi || "Domisili belum diisi"}
              </p>
            </div>
          </div>
          <Link to="/akun/edit"
            className="flex items-center gap-2 rounded-lg border border-gray-800 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50">
            <IkonAkun nama="edit" className="size-4" /> Edit Profil
          </Link>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-5">
          <Kotak ikon="unggah" angka={jumlahBagikan} label="Membagikan barang" />
          <Kotak ikon="unggah" angka={jumlahTerima} label="Menerima barang" />
          <Kotak ikon="kalender" angka={bergabung} label="Bergabung" />
        </div>
      </div>
    </section>
  );
}
