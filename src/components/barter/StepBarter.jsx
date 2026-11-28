function Bulat({ status, angka }) {
  if (status === "selesai") {
    return (
      <span className="grid size-8 place-items-center rounded-full bg-green-950 text-white">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
          strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
          <path d="m5 12 5 5 9-10" />
        </svg>
      </span>
    );
  }
  return (
    <span className={`grid size-8 place-items-center rounded-full text-xs font-semibold ${
      status === "aktif" ? "bg-lime-300 text-green-950" : "bg-gray-200 text-gray-500"
    }`}>
      {angka}
    </span>
  );
}

export default function StepBarter({ langkah = 1, label = "Request Barter" }) {
  return (
    <div className="mt-4 flex items-center gap-3 text-xs text-gray-700">
      <Bulat status={langkah > 1 ? "selesai" : "aktif"} angka={1} />
      <span>{label}</span>
      <span className="h-px w-24 bg-gray-300" />
      <Bulat status={langkah > 1 ? "aktif" : "tunggu"} angka={2} />
      <span>Konfirmasi</span>
    </div>
  );
}
