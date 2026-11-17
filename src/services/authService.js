
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const TOKEN_KEY = "token";
const SESSION_KEY = "user";

// Fungsi komunikasi dengan API
// async function request(endpoint, options = {}) {
//   const response = await fetch(`${API_URL}${endpoint}`, {
//     ...options,
//     headers: {
//       "Content-Type": "application/json",
//       ...options.headers,
//     },
//   });

//   const data = await response.json().catch(() => ({}));

//   if (!response.ok) {
//     throw new Error(
//       data.message || "Terjadi kesalahan pada server"
//     );
//   }

//   return data;
// }
async function request(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;

  console.log("[GunaLagi API] Request:", options.method || "GET", url);

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const contentType = response.headers.get("content-type") || "";

  // Pastikan backend mengembalikan JSON
  if (!contentType.includes("application/json")) {
    throw new Error(
      `Respons API bukan JSON. HTTP ${response.status}. Periksa alamat API: ${url}`
    );
  }

  const data = await response.json();

  console.log(
    "[GunaLagi API] Response:",
    response.status,
    data.message || "Tanpa pesan"
  );

  if (!response.ok) {
    throw new Error(
      data.message || "Terjadi kesalahan pada server"
    );
  }

  return data;
}
// REGISTER
export async function register({
  nama,
  email,
  username,
  password,
}) {
  try {
    await request("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        nama,
        email,
        username,
        password,
      }),
    });

    return { ok: true };

  } catch (error) {
    return {
      ok: false,
      error: error.message,
    };
  }
}

// LOGIN
export async function login(identifier, password) {
  try {
    const data = await request("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    // Simpan token JWT
    localStorage.setItem(TOKEN_KEY, data.token);

    // Sesuaikan bentuk data agar kompatibel
    // dengan komponen frontend lama
    const sessionUser = {
      id: data.user.id,
      name: data.user.nama,
      nama: data.user.nama,
      username: data.user.username,
      email: data.user.email,
    };

    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify(sessionUser)
    );

    return {
      ok: true,
      user: sessionUser,
    };

  } catch (error) {
    return {
      ok: false,
      error: error.message,
    };
  }
}

// MENGAMBIL SESI
export function getSession() {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    const user = JSON.parse(
      localStorage.getItem(SESSION_KEY)
    );

    if (!token || !user) return null;

    return user;

  } catch {
    return null;
  }
}

// MENGAMBIL TOKEN
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

// LOGOUT
export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(SESSION_KEY);
}
