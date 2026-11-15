function Baris({ label, nilai }) {
  return (
    <div className="flex items-center justify-between py-1.5 text-xs">
      <dt className="text-neutral-600">{label}</dt>
      <dd className="font-semibold text-neutral-950">{nilai}</dd>
    </div>
  );
}

export default function KonfirmasiBarang({
  data,
  foto,
  labelKategori,
  labelKondisi,
  labelCara,
  onKembali,
  onSubmit,
  mengirim,
  error,
}) {
  const adaDeskripsi = data.deskripsi.trim();
  const adaCatatan = data.catatan.trim();

  return (
    <div className="mt-6">
      <section className="rounded-xl border border-neutral-300 bg-neutral-100 p-6">
        <h2 className="font-display text-xl font-bold">Konfirmasi</h2>
        <p className="mt-1 text-xs text-neutral-600">
          Pastikan detail informasi barang yang anda daftarkan tersampaikan dengan jelas.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          {foto.map((f, i) => (
            <img
              key={f.id}
              src={f.preview}
              alt={`Foto barang ${i + 1}`}
              className="h-20 w-20 rounded-lg object-cover"
            />
          ))}
        </div>

        <h3 className="mt-5 font-display text-xl font-bold">{data.nama}</h3>

        <dl className="mt-2">
          <Baris label="Kategori" nilai={labelKategori} />
          <Baris label="Kondisi" nilai={labelKondisi} />
          <Baris label="Cara Redistribusi" nilai={labelCara} />
        </dl>

        {adaDeskripsi && (
          <div className="mt-3 border-t border-neutral-300 pt-3">
            <p className="text-xs text-neutral-600">Deskripsi</p>
            <p className="mt-1 whitespace-pre-line text-xs">{data.deskripsi}</p>
          </div>
        )}
        {adaCatatan && (
          <div className="mt-3 border-t border-neutral-300 pt-3">
            <p className="text-xs text-neutral-600">Catatan Kekurangan</p>
            <p className="mt-1 whitespace-pre-line text-xs">{data.catatan}</p>
          </div>
        )}
      </section>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700" role="alert">
          {error}
        </p>
      )}

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onKembali}
          disabled={mengirim}
          className="rounded-lg bg-lime-brand px-4 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-lime-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest disabled:cursor-not-allowed disabled:opacity-60"
        >
          Kembali
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={mengirim}
          className="rounded-lg bg-forest px-4 py-3 text-sm font-semibold text-white transition hover:bg-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest disabled:cursor-not-allowed disabled:opacity-60"
        >
          {mengirim ? "Mengirim..." : "Submit"}
        </button>
      </div>
    </div>
  );
}