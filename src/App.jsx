
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Beranda from "./pages/Beranda.jsx";
import BerandaAuth from "./pages/BerandaAuth.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import BelumDibuat from "./pages/BelumDibuat.jsx";
import BagikanBarang from "./pages/BagikanBarang.jsx";
import Permintaan from "./pages/Permintaan.jsx";
import DetailBarang from "./pages/DetailBarang.jsx";
import JelajahiBarang from "./pages/JelajahiBarang.jsx";

// Route protection
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import GuestRoute from "./components/GuestRoute.jsx";

// Helper untuk halaman yang wajib login
const terkunci = (halaman) => (
  <ProtectedRoute>{halaman}</ProtectedRoute>
);

export default function App() {
  return (
    <Routes>

      {/* HALAMAN PUBLIK */}

      <Route
        path="/"
        element={
          <GuestRoute>
            <Beranda />
          </GuestRoute>
        }
      />

      <Route
        path="/jelajahi"
        element={<JelajahiBarang />}
      />

      <Route
        path="/barang/:id"
        element={<DetailBarang />}
      />


      {/* LOGIN DAN REGISTER */}

      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />

      <Route
        path="/daftar"
        element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        }
      />


      {/* HALAMAN PENGGUNA LOGIN */}

      <Route
        path="/beranda"
        element={terkunci(<BerandaAuth />)}
      />

      <Route
        path="/pesan"
        element={terkunci(
          <BelumDibuat judul="Halaman Pesan" />
        )}
      />

      <Route
        path="/akun"
        element={terkunci(
          <BelumDibuat judul="Halaman Akun" />
        )}
      />

      <Route
        path="/kategori/:slug"
        element={terkunci(<BelumDibuat />)}
      />

      <Route
        path="/bagikan"
        element={terkunci(<BagikanBarang />)}
      />

      <Route
        path="/permintaan"
        element={terkunci(<Permintaan />)}
      />

      <Route
        path="/barang/:id/ajukan"
        element={terkunci(
          <BelumDibuat judul="Halaman Ajukan Permintaan" />
        )}
      />


      {/* HALAMAN TIDAK DITEMUKAN */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}
