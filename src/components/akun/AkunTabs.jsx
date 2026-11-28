export default function AkunTabs({ aktif, onUbah }) {
  const daftar = [
    ["barang", "Barang yang dibagikan"],
    ["riwayat", "Riwayat Aktivitas"],
  ];
  return (
    <div className="grid grid-cols-2 rounded-lg bg-green-50 p-1">
      {daftar.map(([kunci, label]) => (
        <button key={kunci} type="button" onClick={() => onUbah(kunci)}
          className={`rounded-md py-2 text-xs font-semibold transition ${
            aktif === kunci ? "bg-white text-black shadow-sm" : "text-green-900/70 hover:text-green-950"
          }`}>
          {label}
        </button>
      ))}
    </div>
  );
}
