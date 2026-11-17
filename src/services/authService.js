
// const API_URL =
//   import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// const TOKEN_KEY = "token";
// const SESSION_KEY = "user";

// // Fungsi komunikasi dengan API
// // async function request(endpoint, options = {}) {
// //   const response = await fetch(`${API_URL}${endpoint}`, {
// //     ...options,
// //     headers: {
// //       "Content-Type": "application/json",
// //       ...options.headers,
// //     },
// //   });

// //   const data = await response.json().catch(() => ({}));

// //   if (!response.ok) {
// //     throw new Error(
// //       data.message || "Terjadi kesalahan pada server"
// //     );
// //   }

// //   return data;
// // }
// async function request(endpoint, options = {}) {
//   const url = `${API_URL}${endpoint}`;

//   console.log("[GunaLagi API] Request:", options.method || "GET", url);

//   const response = await fetch(url, {
//     ...options,
//     headers: {
//       "Content-Type": "application/json",
//       ...options.headers,
//     },
//   });

//   const contentType = response.headers.get("content-type") || "";

//   // Pastikan backend mengembalikan JSON
//   if (!contentType.includes("application/json")) {
//     throw new Error(
//       `Respons API bukan JSON. HTTP ${response.status}. Periksa alamat API: ${url}`
//     );
//   }

//   const data = await response.json();

//   console.log(
//     "[GunaLagi API] Response:",
//     response.status,
//     data.message || "Tanpa pesan"
//   );

//   if (!response.ok) {
//     throw new Error(
//       data.message || "Terjadi kesalahan pada server"
//     );
//   }

//   return data;
// }
// // REGISTER
// export async function register({
//   nama,
//   email,
//   username,
//   password,
// }) {
//   try {
//     await request("/auth/register", {
//       method: "POST",
//       body: JSON.stringify({
//         nama,
//         email,
//         username,
//         password,
//       }),
//     });

//     return { ok: true };

//   } catch (error) {
//     return {
//       ok: false,
//       error: error.message,
//     };
//   }
// }

// // LOGIN
// export async function login(identifier, password) {
//   try {
//     const data = await request("/auth/login", {
//       method: "POST",
//       body: JSON.stringify({
//         identifier,
//         password,
//       }),
//     });

//     // Simpan token JWT
//     localStorage.setItem(TOKEN_KEY, data.token);

//     // Sesuaikan bentuk data agar kompatibel
//     // dengan komponen frontend lama
//     const sessionUser = {
//       id: data.user.id,
//       name: data.user.nama,
//       nama: data.user.nama,
//       username: data.user.username,
//       email: data.user.email,
//     };

//     localStorage.setItem(
//       SESSION_KEY,
//       JSON.stringify(sessionUser)
//     );

//     return {
//       ok: true,
//       user: sessionUser,
//     };

//   } catch (error) {
//     return {
//       ok: false,
//       error: error.message,
//     };
//   }
// }

// // MENGAMBIL SESI
// export function getSession() {
//   try {
//     const token = localStorage.getItem(TOKEN_KEY);
//     const user = JSON.parse(
//       localStorage.getItem(SESSION_KEY)
//     );

//     if (!token || !user) return null;

//     return user;

//   } catch {
//     return null;
//   }
// }

// // MENGAMBIL TOKEN
// export function getToken() {
//   return localStorage.getItem(TOKEN_KEY);
// }

// // LOGOUT
// export function logout() {
//   localStorage.removeItem(TOKEN_KEY);
//   localStorage.removeItem(SESSION_KEY);
// }

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// true = frontend saja
// false = menggunakan backend Express
const USE_MOCK_AUTH =
  import.meta.env.VITE_USE_MOCK_AUTH === "true";

const TOKEN_KEY = "token";
const SESSION_KEY = "user";
const MOCK_USERS_KEY = "mock_users";

// Akun simulasi awal
const DEFAULT_MOCK_USERS = [
  {
    id: 1,
    nama: "Demo User",
    username: "demo",
    email: "demo@gmail.com",
    password: "12345678",
  },
];

// Mengambil akun simulasi
function getMockUsers() {
  try {
    const users = JSON.parse(
      localStorage.getItem(MOCK_USERS_KEY)
    );

    return Array.isArray(users)
      ? users
      : DEFAULT_MOCK_USERS;
  } catch {
    return DEFAULT_MOCK_USERS;
  }
}

// Menyimpan akun simulasi
function saveMockUsers(users) {
  localStorage.setItem(
    MOCK_USERS_KEY,
    JSON.stringify(users)
  );
}

// Menyimpan sesi
function saveSession(user, token) {
  const sessionUser = {
    id: user.id,
    name: user.nama,
    nama: user.nama,
    username: user.username,
    email: user.email,
  };

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify(sessionUser)
  );

  return sessionUser;
}

// Komunikasi dengan API
async function request(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));

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
    if (USE_MOCK_AUTH) {
      const users = getMockUsers();

      const exists = users.some(
        (user) =>
          user.email.toLowerCase() === email.toLowerCase() ||
          user.username.toLowerCase() === username.toLowerCase()
      );

      if (exists) {
        throw new Error("Email atau username sudah digunakan");
      }

      const newUser = {
        id: Date.now(),
        nama,
        email,
        username,
        password,
      };

      saveMockUsers([...users, newUser]);

      return { ok: true };
    }

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
    if (USE_MOCK_AUTH) {
      const users = getMockUsers();

      const user = users.find(
        (user) =>
          user.email.toLowerCase() === identifier.toLowerCase() ||
          user.username.toLowerCase() === identifier.toLowerCase()
      );

      if (!user || user.password !== password) {
        throw new Error("Username/email atau password salah");
      }

      const sessionUser = saveSession(
        user,
        "mock-token"
      );

      return {
        ok: true,
        user: sessionUser,
      };
    }

    const data = await request("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const sessionUser = saveSession(
      data.user,
      data.token
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

    // Jangan menerima token simulasi
    // ketika sedang menggunakan backend asli.
    if (!USE_MOCK_AUTH && token === "mock-token") {
      return null;
    }

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
