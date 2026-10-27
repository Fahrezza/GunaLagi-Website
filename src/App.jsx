import { Routes, Route, Navigate } from "react-router-dom";
import Beranda from "./pages/Beranda.jsx";
import BerandaAuth from "./pages/BerandaAuth.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import BelumDibuat from "./pages/BelumDibuat.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import GuestRoute from "./components/GuestRoute.jsx";

const terkunci = (halaman) => <ProtectedRoute>{halaman}</ProtectedRoute>;

export default function App() {
  return (
    <Routes>
      {/* Hanya untuk pengunjung: kalau sudah login, dialihkan ke /beranda */}
      <Route path="/" element={<GuestRoute><Beranda /></GuestRoute>} />
      <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
      <Route path="/daftar" element={<GuestRoute><Register /></GuestRoute>} />

      {/* Wajib login */}
      <Route path="/beranda" element={terkunci(<BerandaAuth />)} />

      {/* Halaman yang belum dibuat */}
      <Route path="/jelajahi" element={terkunci(<BelumDibuat judul="Halaman Jelajahi" />)} />
      <Route path="/pesan" element={terkunci(<BelumDibuat judul="Halaman Pesan" />)} />
      <Route path="/bagikan" element={terkunci(<BelumDibuat judul="Halaman Bagikan Barang" />)} />
      <Route path="/akun" element={terkunci(<BelumDibuat judul="Halaman Akun" />)} />
      <Route path="/permintaan" element={terkunci(<BelumDibuat judul="Halaman Permintaan Barang" />)} />
      <Route path="/kategori/:slug" element={terkunci(<BelumDibuat />)} />
      <Route path="/barang/:id" element={<BelumDibuat judul="Halaman Deskripsi Barang" />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}