import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Beranda from "./pages/Beranda.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/daftar" element={<Register />} />
      <Route path="/beranda" element={<Beranda />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}