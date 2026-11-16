function Item({ label, nilai }) {
  return (
    <div>
      <dt className="text-[11px] text-neutral-500">{label}</dt>
      <dd className="mt-0.5 text-xs font-semibold text-forest">{nilai}</dd>
    </div>
  );
}

export default function InfoDetail({ kategori, cara, kondisi, lokasi }) {
  return (
    <section className="rounded-xl border border-neutral-300 bg-neutral-100 p-4 shadow-sm">
      <h2 className="text-sm font-semibold text-forest">Detail Informasi Barang</h2>
      {/* Dua kolom: Kategori dan Metode di kiri, Kondisi dan Lokasi di kanan (sesuai Figma) */}
      <dl className="mt-3 grid grid-flow-col grid-cols-2 grid-rows-2 gap-x-8 gap-y-3">
        <Item label="Kategori" nilai={kategori} />
        <Item label="Metode Redistribusi" nilai={cara} />
        <Item label="Kondisi" nilai={kondisi} />
        <Item label="Lokasi" nilai={lokasi} />
      </dl>
    </section>
  );
}