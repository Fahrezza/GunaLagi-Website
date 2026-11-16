import BarangCard from "../BarangCard.jsx";

export default function BarangSerupa({ items }) {
  if (items.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="font-display text-2xl font-bold text-forest">Barang Serupa</h2>
      <div className="mt-5 grid grid-cols-3 gap-8">
        {items.map((b) => (
          <div key={b.id} className="w-full max-w-[300px]">
            <BarangCard barang={b} hover />
          </div>
        ))}
      </div>
    </section>
  );
}