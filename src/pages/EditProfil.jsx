import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Avatar from "../components/akun/Avatar.jsx";
import { getProfil, perbaruiProfil } from "../services/authService";
import { kecilkanGambar } from "../utils/kecilkanGambar";

const MAKS_NAMA = 50;

const kelasInput =
  "mt-1.5 h-10 w-full rounded-lg border bg-white px-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-green-700 focus:ring-2 focus:ring-lime-300/60";

function Gembok() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" className="size-3.5" aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function Bagian({ judul, ket, children }) {
  return (
    <section className="border-t border-neutral-200 px-6 py-6 sm:px-8">
      <h2 className="text-sm font-semibold text-green-950">{judul}</h2>
      {ket && <p className="mt-0.5 text-xs text-neutral-500">{ket}</p>}
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function Kolom({ id, label, galat, bantu, children }) {
  return (
    <div>
      <label htmlFor={id} className="text-xs font-medium text-neutral-700">{label}</label>
      {children}
      {galat ? (
        <p role="alert" className="mt-1 text-xs text-red-600">{galat}</p>
      ) : (
        bantu && <p className="mt-1 text-[11px] text-neutral-400">{bantu}</p>
      )}
    </div>
  );
}

export default function EditProfil() {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [profil] = useState(() => getProfil());
  const [awal] = useState(() => ({
    name: profil?.name ?? "",
    kota: profil?.kota ?? "",
    provinsi: profil?.provinsi ?? "",
    picture: profil?.picture ?? "",
  }));
  const [form, setForm] = useState(awal);
  const [galat, setGalat] = useState({});
  const [galatFoto, setGalatFoto] = useState("");
  const [menyimpan, setMenyimpan] = useState(false);

  if (!profil) return null;

  const berubah = Object.keys(awal).some((k) => awal[k] !== form[k]);
  const lokasi = [form.kota.trim(), form.provinsi.trim()].filter(Boolean).join(", ");

  const ubah = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setGalat((g) => ({ ...g, [name]: "" }));
  };

  async function pilihFoto(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setGalatFoto("File harus berupa gambar (JPG atau PNG).");
      return;
    }
    try {
      const hasil = await kecilkanGambar(file, 256);
      setForm((f) => ({ ...f, picture: hasil }));
      setGalatFoto("");
    } catch {
      setGalatFoto("Foto tidak dapat dibaca. Coba file lain.");
    }
  }

  async function simpan(e) {
    e.preventDefault();
    const g = {};
    if (!form.name.trim()) g.name = "Nama tidak boleh kosong.";
    else if (form.name.trim().length < 2) g.name = "Nama minimal 2 karakter.";
    if (Object.keys(g).length) return setGalat(g);

    setMenyimpan(true);
    try {
      await perbaruiProfil({
        name: form.name.trim(),
        kota: form.kota.trim(),
        provinsi: form.provinsi.trim(),
        picture: form.picture,
      });
      navigate("/akun", { state: { pesan: "Profil berhasil diperbarui" } });
    } catch {
      setGalat({ umum: "Gagal menyimpan. Coba lagi." });
      setMenyimpan(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-3xl px-5 pb-16 pt-8 sm:px-8">
        <Link to="/akun" className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-600 hover:text-green-900">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            strokeLinejoin="round" className="size-4" aria-hidden="true">
            <path d="m15 6-6 6 6 6" />
          </svg>
          Kembali ke akun
        </Link>
        <h1 className="mt-3 font-display text-2xl font-bold text-green-950">Edit Profil</h1>
        <p className="mt-1 text-sm text-neutral-600">Perbarui foto dan informasi yang tampil di profilmu.</p>

        <form onSubmit={simpan} noValidate className="mt-6 overflow-hidden rounded-2xl border border-neutral-300 bg-white">
          <div className="h-28 bg-linear-to-r from-green-950 to-green-600" />

          <div className="px-6 pb-6 pt-4 sm:px-8">
            <div className="flex flex-wrap items-end gap-4">
              <div className="-mt-14 size-24 shrink-0 overflow-hidden rounded-2xl border-4 border-white bg-white shadow">
                <Avatar src={form.picture} nama={form.name} className="size-24 text-3xl" />
              </div>
              <div className="pb-1 pt-2">
                <div className="flex flex-wrap gap-2">
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={pilihFoto} />
                  <button type="button" onClick={() => fileRef.current?.click()}
                    className="h-9 rounded-lg bg-lime-300 px-4 text-sm font-semibold text-neutral-950 transition hover:bg-lime-400">
                    {form.picture ? "Ganti foto" : "Unggah foto"}
                  </button>
                  {form.picture && (
                    <button type="button" onClick={() => setForm((f) => ({ ...f, picture: "" }))}
                      className="h-9 rounded-lg border border-neutral-300 px-4 text-sm transition hover:bg-neutral-50">
                      Hapus
                    </button>
                  )}
                </div>
                {galatFoto ? (
                  <p role="alert" className="mt-1.5 text-xs text-red-600">{galatFoto}</p>
                ) : (
                  <p className="mt-1.5 text-[11px] text-neutral-400">JPG atau PNG. Foto otomatis dikecilkan.</p>
                )}
              </div>
            </div>
          </div>

          <Bagian judul="Informasi pribadi" ket="Nama dan domisili tampil di profil dan kartu barangmu.">
            <Kolom id="name" label="Nama" galat={galat.name}>
              <input id="name" name="name" value={form.name} onChange={ubah} maxLength={MAKS_NAMA}
                autoComplete="name" aria-invalid={Boolean(galat.name)}
                className={`${kelasInput} ${galat.name ? "border-red-400" : "border-neutral-300"}`} />
              <p className="mt-1 text-right text-[11px] text-neutral-400">{form.name.length}/{MAKS_NAMA}</p>
            </Kolom>

            <div className="grid gap-4 sm:grid-cols-2">
              <Kolom id="kota" label="Kota">
                <input id="kota" name="kota" value={form.kota} onChange={ubah} maxLength={40}
                  placeholder="Contoh: Batam" className={`${kelasInput} border-neutral-300`} />
              </Kolom>
              <Kolom id="provinsi" label="Provinsi">
                <input id="provinsi" name="provinsi" value={form.provinsi} onChange={ubah} maxLength={40}
                  placeholder="Contoh: Kepulauan Riau" className={`${kelasInput} border-neutral-300`} />
              </Kolom>
            </div>
            <p className="text-xs text-neutral-500">
              Tampil sebagai: <span className="font-medium text-neutral-800">{lokasi || "Domisili belum diisi"}</span>
            </p>
          </Bagian>

          <Bagian judul="Akun" ket="Data ini terkait login dan tidak dapat diubah di sini.">
            <Kolom id="username" label="Username">
              <div className="relative">
                <input id="username" value={profil.username ?? ""} readOnly tabIndex={-1}
                  className={`${kelasInput} cursor-not-allowed border-neutral-200 bg-neutral-100 pr-9 text-neutral-500`} />
                <span className="absolute right-3 top-1/2 mt-0.5 -translate-y-1/2 text-neutral-400"><Gembok /></span>
              </div>
            </Kolom>
            <Kolom id="email" label="Email">
              <div className="relative">
                <input id="email" value={profil.email ?? ""} readOnly tabIndex={-1}
                  className={`${kelasInput} cursor-not-allowed border-neutral-200 bg-neutral-100 pr-9 text-neutral-500`} />
                <span className="absolute right-3 top-1/2 mt-0.5 -translate-y-1/2 text-neutral-400"><Gembok /></span>
              </div>
            </Kolom>
          </Bagian>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200 bg-neutral-50 px-6 py-4 sm:px-8">
            <p role="status" className="text-xs text-neutral-500">
              {galat.umum ? <span className="text-red-600">{galat.umum}</span> : berubah ? "Ada perubahan yang belum disimpan." : "Belum ada perubahan."}
            </p>
            <div className="flex gap-3">
              <Link to="/akun"
                className="inline-flex h-10 items-center rounded-lg border border-neutral-300 bg-white px-5 text-sm font-medium transition hover:bg-neutral-50">
                Batal
              </Link>
              <button type="submit" disabled={!berubah || menyimpan}
                className="h-10 rounded-lg bg-green-900 px-6 text-sm font-semibold text-white transition hover:bg-green-950 disabled:cursor-not-allowed disabled:opacity-50">
                {menyimpan ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>
        </form>
      </main>
    </>
  );
}
