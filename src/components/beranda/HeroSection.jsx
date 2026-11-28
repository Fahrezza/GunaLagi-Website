import ActionButton from "../ActionButton.jsx";

export default function HeroSection({ onLihatBarang }) {
  return (
    <section className="relative overflow-hidden bg-forest text-white">
      <div className="relative mx-auto flex w-full max-w-360 flex-col px-5 pt-12 sm:px-8 md:min-h-95 md:flex-row md:items-center md:pb-16 md:pt-16 lg:px-12 xl:px-16">
        <div className="relative z-10 md:max-w-[48%]">
          <h1 className="font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Barang Tak Terpakai?
            <span className="block text-lime-brand">Beri Kesempatan Kedua.</span>
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-100">
            GunaLagi adalah platform redistribusi barang layak pakai. Berikan secara gratis,
            donasikan, atau tukar dengan barang lain. Mari kurangi sampah, bantu sesama.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ActionButton to="/beranda" perluLogin>Mulai Sekarang - Gratis</ActionButton>
            <ActionButton variant="white" onClick={onLihatBarang}>Lihat Barang</ActionButton>
          </div>
        </div>

        {/* Gambar header: public/images/Header_Beranda_Web_GunaLagi.png
            md:translate-x-[9%] -> geser kanan agar isi gambar sejajar tepi kanan konten
            md:h-[108%]         -> ukuran gambar */}
        <img
          src="/images/Header_Beranda_Web_GunaLagi.png"
          alt="Bumi di atas tumpukan koin, di samping pohon yang tumbuh"
          className="pointer-events-none mt-8 w-full select-none md:absolute md:bottom-0 md:right-5 md:mt-0 md:h-[108%] md:w-auto md:max-w-none md:translate-x-[9%] sm:right-8 lg:right-12 xl:right-16"
        />
      </div>
    </section>
  );
}