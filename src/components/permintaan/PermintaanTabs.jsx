const daftar = [
  { id: "masuk", label: "Permintaan Masuk" },
  { id: "terkirim", label: "Permintaan Terkirim" },
];

export default function PermintaanTabs({ aktif, onUbah }) {
  return (
    <div
      role="tablist"
      aria-label="Jenis permintaan"
      className="grid grid-cols-2 gap-1 rounded-lg border border-lime-edge bg-lime-soft p-1"
    >
      {daftar.map((t) => {
        const dipilih = aktif === t.id;
        return (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={dipilih}
            onClick={() => onUbah(t.id)}
            className={`rounded-md px-3 py-2 text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest sm:text-sm ${
              dipilih
                ? "bg-white text-neutral-950 shadow-sm"
                : "text-neutral-500 hover:text-neutral-800 active:text-neutral-800"
            }`}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}