import ActionButton from "../ActionButton.jsx";
import { IkonChat, IkonCari, IkonUser } from "../Ikon.jsx";

const langkah = [
  {
    judul: "Upload Barangmu",
    teks: "Foto barangnya, isi informasinya, lalu bagikan di GunaLagi.",
    Ikon: IkonChat,
  },
  {
    judul: "Temukan pemilik baru",
    teks: "Berikan kesempatan untuk barang anda menemukan pemilik baru.",
    Ikon: IkonCari,
  },
  {
    judul: "Atur Pertemuan",
    teks: "Chat dengan penerima, tentukan waktu dan tempat, lalu lakukan serah terima.",
    Ikon: IkonUser,
  },
];

export default function LangkahSection() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-14 text-center">
      <h2 className="font-display text-2xl font-bold text-forest">Mau berbagi barang? Gini caranya.</h2>
      <p className="mt-2 text-sm text-neutral-600">
        Dari barang yang sudah tidak terpakai sampai menemukan pemilik baru.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {langkah.map(({ judul, teks, Ikon }) => (
          <div key={judul} className="rounded-xl border border-lime-edge bg-lime-soft p-5 shadow-sm">
            <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-lime-brand/40 text-forest">
              <Ikon />
            </span>
            <h3 className="mt-3 text-sm font-semibold">{judul}</h3>
            <p className="mt-1 text-xs text-neutral-600">{teks}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <ActionButton to="/beranda" perluLogin>Mulai Sekarang</ActionButton>
      </div>
    </section>
  );
}