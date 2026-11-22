export default function Avatar({ src, nama = "", className = "size-16" }) {
  const huruf = (nama || "?").trim().charAt(0).toUpperCase();
  return src ? (
    <img src={src} alt={nama} className={`${className} object-cover`} />
  ) : (
    <div className={`${className} grid place-items-center bg-green-100 font-semibold text-green-800`}>
      {huruf}
    </div>
  );
}
