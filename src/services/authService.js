const USERS_KEY = "users";
const SESSION_KEY = "user";

const demoUser = {
  nama: "Cakrawala",
  email: "cakrawala@gunalagi.com",
  username: "cakrawalateam,",
  password: "akundemocakrawala01",
};

const read = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};

const getUsers = () => read(USERS_KEY, [demoUser]);

export function register({ nama, email, username, password }) {
  const users = getUsers();
  const sama = (a, b) => a.toLowerCase() === b.toLowerCase();

  if (users.some((u) => sama(u.username, username))) {
    return { ok: false, error: "Username sudah dipakai" };
  }
  if (users.some((u) => sama(u.email, email))) {
    return { ok: false, error: "Email sudah terdaftar" };
  }

  localStorage.setItem(
    USERS_KEY,
    JSON.stringify([...users, { nama, email, username, password }])
  );
  return { ok: true };
}

export function login(identifier, password) {
  const id = identifier.trim().toLowerCase();
  const user = getUsers().find(
    (u) => u.username.toLowerCase() === id || u.email.toLowerCase() === id
  );

  if (!user || user.password !== password) {
    return { ok: false, error: "Username/email atau kata sandi salah" };
  }

  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ name: user.nama, email: user.email, username: user.username })
  );
  return { ok: true };
}

export function loginWithGoogle(profile) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(profile));
}

export function getSession() {
  return read(SESSION_KEY, null);
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}