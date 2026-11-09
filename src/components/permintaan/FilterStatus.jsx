const pilihan = [
  { id: "semua", label: "Semua" },
  { id: "menunggu", label: "Menunggu" },
  { id: "diterima", label: "Diterima" },
  { id: "ditolak", label: "Ditolak" },
];

export default function FilterStatus({ aktif, onUbah }) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter status">
      {pilihan.map((p) => {
        const dipilih = aktif === p.id;
        return (
          <button
            key={p.id}
            type="button"
            aria-pressed={dipilih}
            onClick={() => onUbah(p.id)}
            className={`rounded-full border border-forest px-4 py-1.5 text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest ${
              dipilih
                ? "bg-forest text-white"
                : "bg-white text-forest hover:bg-lime-soft active:bg-lime-soft"
            }`}
          >
            {p.label}
          </button>
        );
      })}
    </div>
  );
}