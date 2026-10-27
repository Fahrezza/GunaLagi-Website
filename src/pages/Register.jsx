import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard.jsx";
import InputField from "../components/InputField.jsx";
import Button from "../components/Button.jsx";
import GoogleButton from "../components/GoogleButton.jsx";
import useForm from "../hooks/useForm.js";
import { register, loginWithGoogle } from "../services/authService.js";

const validate = (v) => {
  const e = {};
  if (!v.nama.trim()) e.nama = "Nama lengkap wajib diisi";
  if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = "Format email tidak valid";
  if (!v.username.trim()) e.username = "Username wajib diisi";
  if (v.password.length < 6) e.password = "Password minimal 6 karakter";
  if (v.konfirmasi !== v.password) e.konfirmasi = "Konfirmasi password tidak sama";
  if (!v.setuju) e.setuju = "Anda harus menyetujui Syarat & Ketentuan";
  return e;
};

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formError, setFormError] = useState("");
  const tujuan = location.state?.from ?? "/beranda";

  const { values, errors, handleChange, handleSubmit } = useForm(
    { nama: "", email: "", username: "", password: "", konfirmasi: "", setuju: false },
    validate
  );

  const onValid = (v) => {
    const result = register(v);
    if (!result.ok) {
      setFormError(result.error);
      return;
    }
    // Setelah daftar, ke Login dengan tujuan awal yang sama.
    navigate("/login", { replace: true, state: location.state });
  };

  const handleGoogle = (user) => {
    loginWithGoogle(user);
    navigate(tujuan, { replace: true });
  };

  return (
    <AuthCard title="Daftar akun baru">
      <form onSubmit={handleSubmit(onValid)} noValidate>
        <InputField label="Nama Lengkap" name="nama" placeholder="Cakrawala Halilintar"
          value={values.nama} onChange={handleChange} error={errors.nama} />
        <InputField label="Email" name="email" type="email" placeholder="cakrawala@id.com"
          value={values.email} onChange={handleChange} error={errors.email} />
        <InputField label="Username" name="username" placeholder="Cakrawala"
          value={values.username} onChange={handleChange} error={errors.username} />
        <InputField label="Password" name="password" type="password" placeholder="••••••••"
          value={values.password} onChange={handleChange} error={errors.password} />
        <InputField label="Konfirmasi Password" name="konfirmasi" type="password" placeholder="••••••••"
          value={values.konfirmasi} onChange={handleChange} error={errors.konfirmasi} />

        <label className="mb-1 flex items-center gap-2 text-xs">
          <input type="checkbox" name="setuju" checked={values.setuju} onChange={handleChange} />
          Saya menyetujui <a href="#" className="font-semibold underline">Syarat &amp; Ketentuan</a>
        </label>
        {errors.setuju && <p className="text-xs text-red-600">{errors.setuju}</p>}

        {formError && (
          <p className="mt-3 text-xs text-red-600" role="alert">{formError}</p>
        )}

        <div className="mt-5 space-y-2">
          <Button type="submit">Daftar Sekarang</Button>
          <GoogleButton onSuccess={handleGoogle}>Sign Up with Google</GoogleButton>
        </div>
      </form>

      <p className="mt-4 text-xs text-neutral-600">
        Sudah punya akun?{" "}
        <Link to="/login" state={location.state} className="font-semibold underline">Login.</Link>
      </p>
    </AuthCard>
  );
}