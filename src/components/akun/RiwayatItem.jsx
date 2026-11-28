import Avatar from "./Avatar";
import IkonAkun from "./IkonAkun";

export default function RiwayatItem({ item }) {
  const masuk = item.arah === "masuk"; // masuk = Diberikan ke, terkirim = Diterima dari
  const lawan = item.namaLawan ?? item.nama ?? "Pengguna";
  const barang = item.namaBarang ?? item.barang?.nama ?? "Barang";
  const foto = item.fotoBarang ?? item.barang?.gambar ?? "";
  const tgl = item.diprosesPada || item.dibuat;
  const tanggal = tgl
    ? new Date(tgl).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
    : "";

  return (
    <div className="flex items-center gap-4 rounded-lg border border-gray-300 bg-white px-4 py-4">
      <div className={`grid size-10 place-items-center rounded-lg ${masuk ? "bg-sky-100" : "bg-lime-100"}`}>
        <IkonAkun nama={masuk ? "kanan" : "kiri"} className="size-6 text-green-950" />
      </div>
      <div className="size-10 overflow-hidden rounded-full">
        <Avatar src={item.fotoLawan} nama={lawan} className="size-10" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold">{barang}</p>
        <p className="text-[11px] text-gray-600">{masuk ? "Diberikan ke" : "Diterima dari"} {lawan}</p>
      </div>
      <span className="text-[11px]">{tanggal}</span>
      {foto ? <img src={foto} alt="" className="size-10 rounded object-cover" /> : <div className="size-10 rounded bg-gray-200" />}
    </div>
  );
}
