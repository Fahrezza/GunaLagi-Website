const jalur = {
  unggah: "M12 16V4m0 0L8 8m4-4 4 4M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3",
  kalender: "M7 3v4m10-4v4M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z",
  pin: "M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  edit: "M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17v3Zm9-13 3 3",
  kanan: "M5 12h14m0 0-6-6m6 6-6 6",
  kiri: "M19 12H5m0 0 6-6m-6 6 6 6",
};

export default function IkonAkun({ nama, className = "size-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={jalur[nama]} />
    </svg>
  );
}
