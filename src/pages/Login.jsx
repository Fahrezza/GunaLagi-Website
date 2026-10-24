import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard.jsx";
import InputField from "../components/InputField.jsx";
import Button from "../components/Button.jsx";
import GoogleButton from "../components/GoogleButton.jsx";
import useForm from "../hooks/useForm.js";

const validate = (v) => {
  const e = {};
  if (!v.identifier.trim()) e.identifier = "Username atau email wajib diisi";
  if (v.password.length < 6) e.password = "Kata sandi minimal 6 karakter";
  return e;
};

export default function Login() {
  const navigate = useNavigate();
  const { values, errors, handleChange, handleSubmit } = useForm(
    { identifier: "", password: "", remember: false },
    validate
  );

  // TODO: ganti dengan request ke backend saat API sudah tersedia.
  const onValid = () => navigate("/beranda");

  return (
    <AuthCard title="Login ke akun anda">
      <form onSubmit={handleSubmit(onValid)} noValidate>
        <InputField label="Username atau Email" name="identifier" placeholder="nama@email.com"
          value={values.identifier} onChange={handleChange} error={errors.identifier} />
        <InputField label="Kata Sandi" name="password" type="password" placeholder="••••••••"
          value={values.password} onChange={handleChange} error={errors.password} />

        <div className="mb-5 flex items-center justify-between text-xs">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="remember" checked={values.remember} onChange={handleChange} />
            Remember me
          </label>
          <a href="#" className="font-semibold">Forgot password?</a>
        </div>

        <div className="space-y-2">
          <Button type="submit">Log In</Button>
          <GoogleButton>Log In with Google</GoogleButton>
        </div>
      </form>

      <p className="mt-4 text-xs text-neutral-600">
        Belum memiliki akun?{" "}
        <Link to="/daftar" className="font-semibold underline">Daftar sekarang.</Link>
      </p>
    </AuthCard>
  );
}