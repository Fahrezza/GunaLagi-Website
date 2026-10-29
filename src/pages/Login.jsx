import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard.jsx";
import InputField from "../components/InputField.jsx";
import Button from "../components/Button.jsx";
import GoogleButton from "../components/GoogleButton.jsx";
import useForm from "../hooks/useForm.js";
import { login, loginWithGoogle } from "../services/authService.js";

const validate = (v) => {
  const e = {};
  if (!v.identifier.trim()) e.identifier = "Username atau email wajib diisi";
  if (v.password.length < 6) e.password = "Kata sandi minimal 6 karakter";
  return e;
};

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formError, setFormError] = useState("");

  // Halaman yang tadi dituju pengunjung. Kalau tidak ada, ke Beranda.
  const tujuan = location.state?.from ?? "/beranda";

  const { values, errors, handleChange, handleSubmit } = useForm(
    { identifier: "", password: "", remember: false },
    validate
  );

  const onValid = (v) => {
    const result = login(v.identifier, v.password);
    if (!result.ok) {
      setFormError(result.error);
      return;
    }
    navigate(tujuan, { replace: true });
  };

  const handleGoogle = (user) => {
    loginWithGoogle(user);
    navigate(tujuan, { replace: true });
  };

  return (
    <AuthCard title="Login ke akun anda">
      <form onSubmit={handleSubmit(onValid)} noValidate>
        <InputField label="Username atau Email" name="identifier" placeholder="Cakrawala"
          value={values.identifier} onChange={handleChange} error={errors.identifier} />
        <InputField label="Kata Sandi" name="password" type="password" placeholder="••••••••"
          value={values.password} onChange={handleChange} error={errors.password} />

        <div className="mb-3 flex items-center justify-between text-xs sm:mb-5">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="remember" checked={values.remember} onChange={handleChange} />
            Remember me
          </label>
          <a href="#" className="font-semibold">Forgot password?</a>
        </div>

        {formError && (
          <p className="mb-3 text-xs text-red-600" role="alert">{formError}</p>
        )}

        <div className="space-y-2">
          <Button type="submit">Log In</Button>
          <GoogleButton onSuccess={handleGoogle}>Log In with Google</GoogleButton>
        </div>
      </form>

      <p className="mt-3 text-xs text-neutral-600 sm:mt-4">
        Belum memiliki akun?{" "}
        {/* state diteruskan supaya tujuan awal tidak hilang saat pindah ke Daftar */}
        <Link to="/daftar" state={location.state} className="font-semibold underline">
          Daftar sekarang.
        </Link>
      </p>
    </AuthCard>
  );
}