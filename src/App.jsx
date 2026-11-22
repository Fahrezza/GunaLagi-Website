import { Routes, Route, Navigate, useParams } from "react-router-dom";

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
import Akun from "./pages/Akun";
import EditProfil from "./pages/EditProfil";
import RequestBarter from "./pages/RequestBarter";
import PermintaanDonasi from "./pages/PermintaanDonasi";

// Route protection
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import GuestRoute from "./components/GuestRoute.jsx";

// Helper untuk halaman yang wajib login
const terkunci = (halaman) => (
  <ProtectedRoute>{halaman}</ProtectedRoute>
);

// Alamat lama /kategori/elektronik dialihkan ke /jelajahi?kategori=elektronik.
function KategoriKeJelajahi() {
  const { slug } = useParams();
  return <Navigate to={`/jelajahi?kategori=${encodeURIComponent(slug)}`} replace />;
}

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
        element={terkunci(<Akun />)} />

      <Route path="/kategori/:slug" element={<KategoriKeJelajahi />} />

      <Route
        path="/bagikan"
        element={terkunci(<BagikanBarang />)}
      />

      <Route
        path="/permintaan"
        element={terkunci(<Permintaan />)}
      />

      <Route
      path="/barang/:id/minta"
      element={terkunci(<PermintaanDonasi />)} 
      />
      
      <Route 
        path="/barang/:id/barter" 
        element={terkunci
        (<RequestBarter />)} 
      />

      <Route 
        path="/akun/edit" 
        element={terkunci(<EditProfil />)} />  


      {/* HALAMAN TIDAK DITEMUKAN */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}
