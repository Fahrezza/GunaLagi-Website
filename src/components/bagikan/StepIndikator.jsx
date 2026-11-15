import { IkonCentang } from "./IkonBagikan.jsx";

const langkahList = [
  { no: 1, label: "Detail Barang" },
  { no: 2, label: "Konfirmasi" },
];

export default function StepIndikator({ aktif }) {
  return (
    <ol className="mt-4 flex items-center gap-3" aria-label="Langkah">
      {langkahList.map((l, i) => {
        const selesai = l.no < aktif;
        const sekarang = l.no === aktif;
        const warna = selesai
          ? "bg-forest text-white"
          : sekarang
            ? "bg-lime-brand text-neutral-950"
            : "bg-neutral-300 text-neutral-700";

        return (
          <li
            key={l.no}
            aria-current={sekarang ? "step" : undefined}
            className={`flex items-center gap-2 ${i === 0 ? "flex-1" : ""}`}
          >
            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${warna}`}>
              {selesai ? <IkonCentang width={14} height={14} /> : l.no}
            </span>
            <span className="text-xs text-neutral-700">{l.label}</span>
            {i === 0 && <span className="ml-2 h-px flex-1 bg-neutral-300" aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  );
}