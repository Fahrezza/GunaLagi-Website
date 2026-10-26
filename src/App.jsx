import { Routes, Route, Navigate } from "react-router-dom";
import Beranda from "./pages/Beranda.jsx";

// Rute Login dan Daftar ditambahkan setelah PR Login di-merge.
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Beranda />} />
      <Route path="/beranda" element={<Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}