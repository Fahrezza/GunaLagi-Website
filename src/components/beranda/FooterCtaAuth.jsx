import ActionButton from "../ActionButton.jsx";

export default function FooterCtaAuth() {
  return (
    <footer className="bg-forest px-6 py-20 text-center text-white">
      <h2 className="font-display text-2xl font-bold sm:text-3xl">Bergabung Dengan Kami - Gratis</h2>
      <p className="mx-auto mt-3 max-w-md text-sm text-neutral-200">
        Barang Layak Pakai Sedang Menunggu Anda Sebagai Pemilik Baru
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ActionButton to="/bagikan">Bagikan Barang</ActionButton>
        <ActionButton to="/jelajahi" variant="outline">Jelajahi Barang</ActionButton>
      </div>
    </footer>
  );
}