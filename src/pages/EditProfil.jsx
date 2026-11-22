import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProfil, perbaruiProfil } from "../services/authService";
import { kecilkanGambar } from "../utils/gambar";
import Avatar from "../components/akun/Avatar";

const kelasInput =
  "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-200";

export default function EditProfil() {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [profil] = useState(() => getProfil());
  const [form, setForm] = useState({
    name: profil?.name ?? "",
    kota: profil?.kota ?? "",
    provinsi: profil?.provinsi ?? "",
    picture: profil?.picture ?? "",
  });
  const [error, setError] = useState("");
  const [menyimpan, setMenyimpan] = useState(false);

  if (!profil) return null;
  const ubah = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  async function pilihFoto(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const hasil = await kecilkanGambar(file, 256);
      setForm((f) => ({ ...f, picture: hasil }));
    } catch {
      setError("Foto tidak dapat dibaca. Coba file lain.");
    }
    e.target.value = "";
  }

  async function simpan(e) {
    e.preventDefault();
    if (!form.name.trim()) return setError("Nama tidak boleh kosong.");
    setMenyimpan(true);
    try {
      await perbaruiProfil({ ...form, name: form.name.trim() });
      navigate("/akun", { state: { pesan: "Profil berhasil diperbarui" } });
    } catch {
      setError("Gagal menyimpan. Coba lagi.");
      setMenyimpan(false);
    }
  }

  return (
    <main className="mx-auto max-w-xl px-6 py-10">
      <h1 className="text-xl font-semibold text-green-950">Edit Profil</h1>
      <form onSubmit={simpan} className="mt-6 space-y-5 rounded-2xl border border-gray-300 bg-white p-6">
        <div className="flex items-center gap-4">
          <div className="size-20 overflow-hidden rounded-2xl border border-gray-200">
            <Avatar src={form.picture} nama={form.name} className="size-20 text-2xl" />
          </div>
          <div className="flex gap-2">
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={pilihFoto} />
            <button type="button" onClick={() => fileRef.current?.click()}
              className="rounded-lg bg-lime-300 px-3 py-2 text-sm font-medium hover:bg-lime-400">
              {form.picture ? "Ganti foto" : "Unggah foto"}
            </button>
            {form.picture && (
              <button type="button" onClick={() => setForm((f) => ({ ...f, picture: "" }))}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50">
                Hapus
              </button>
            )}
          </div>
        </div>

        <label className="block text-sm">Nama
          <input name="name" value={form.name} onChange={ubah} className={`${kelasInput} mt-1`} />
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label className="block text-sm">Kota
            <input name="kota" value={form.kota} onChange={ubah} className={`${kelasInput} mt-1`} />
          </label>
          <label className="block text-sm">Provinsi
            <input name="provinsi" value={form.provinsi} onChange={ubah} className={`${kelasInput} mt-1`} />
          </label>
        </div>
        <label className="block text-sm">Username
          <input value={profil.username ?? ""} readOnly className={`${kelasInput} mt-1 bg-gray-100 text-gray-500`} />
        </label>
        <label className="block text-sm">Email
          <input value={profil.email ?? ""} readOnly className={`${kelasInput} mt-1 bg-gray-100 text-gray-500`} />
        </label>

        {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
        <div className="flex justify-end gap-3">
          <Link to="/akun" className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">Batal</Link>
          <button type="submit" disabled={menyimpan}
            className="rounded-lg bg-green-800 px-4 py-2 text-sm font-medium text-white hover:bg-green-900 disabled:opacity-60">
            {menyimpan ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </main>
  );
}
