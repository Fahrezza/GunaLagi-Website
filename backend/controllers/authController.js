
const db = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

// REGISTER
const register = async (req, res) => {
  try {
    const { nama, email, username, password } = req.body;

    if (
      typeof nama !== "string" ||
      typeof email !== "string" ||
      typeof username !== "string" ||
      typeof password !== "string" ||
      !nama.trim() ||
      !email.trim() ||
      !username.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "Semua field wajib diisi",
      });
    }

    const namaBersih = nama.trim();
    const emailBersih = email.trim().toLowerCase();
    const usernameBersih = username.trim().toLowerCase();

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameValid = /^[a-zA-Z0-9._-]{3,30}$/;

    if (namaBersih.length > 100 || emailBersih.length > 150) {
      return res.status(400).json({
        message: "Nama atau email terlalu panjang",
      });
    }

    if (!emailValid.test(emailBersih)) {
      return res.status(400).json({
        message: "Format email tidak valid",
      });
    }

    if (!usernameValid.test(usernameBersih)) {
      return res.status(400).json({
        message: "Username harus 3-30 karakter dan hanya berisi huruf, angka, titik, _ atau -",
      });
    }

    if (
      password.length < 8 ||
      Buffer.byteLength(password, "utf8") > 72
    ) {
      return res.status(400).json({
        message: "Password harus minimal 8 karakter",
      });
    }

    // Cek email dan username
    const [existing] = await db.execute(
      `SELECT id, email, username
       FROM users
       WHERE email = ? OR username = ?`,
      [emailBersih, usernameBersih]
    );

    if (existing.some((user) => user.email === emailBersih)) {
      return res.status(409).json({
        message: "Email sudah terdaftar",
      });
    }

    if (existing.some((user) => user.username === usernameBersih)) {
      return res.status(409).json({
        message: "Username sudah digunakan",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Simpan ke MySQL
    const [result] = await db.execute(
      `INSERT INTO users (nama, username, email, password)
       VALUES (?, ?, ?, ?)`,
      [namaBersih, usernameBersih, emailBersih, hashedPassword]
    );

    const user = {
      id: result.insertId,
      nama: namaBersih,
      username: usernameBersih,
      email: emailBersih,
    };

    const token = createToken(user);

    return res.status(201).json({
      message: "Registrasi berhasil",
      token,
      user,
    });

  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "Email atau username sudah digunakan",
      });
    }

    console.error("Register error:", error.message);

    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const identifier = req.body.identifier ?? req.body.email;
    const { password } = req.body;

    if (
      typeof identifier !== "string" ||
      typeof password !== "string" ||
      !identifier.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "Username/email dan password wajib diisi",
      });
    }

    const idBersih = identifier.trim().toLowerCase();

    // Login bisa menggunakan username atau email
    const [rows] = await db.execute(
      `SELECT id, nama, username, email, password
       FROM users
       WHERE email = ? OR username = ?
       LIMIT 1`,
      [idBersih, idBersih]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        message: "Username/email atau password salah",
      });
    }

    const userDB = rows[0];

    const passwordCocok = await bcrypt.compare(
      password,
      userDB.password
    );

    if (!passwordCocok) {
      return res.status(401).json({
        message: "Username/email atau password salah",
      });
    }

    const user = {
      id: userDB.id,
      nama: userDB.nama,
      username: userDB.username,
      email: userDB.email,
    };

    const token = createToken(user);

    return res.status(200).json({
      message: "Login berhasil",
      token,
      user,
    });

  } catch (error) {
    console.error("Login error:", error.message);

    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

// GET PROFILE
const getMe = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT id, nama, username, email, created_at
       FROM users
       WHERE id = ?
       LIMIT 1`,
      [req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Pengguna tidak ditemukan",
      });
    }

    return res.status(200).json({
      user: rows[0],
    });

  } catch (error) {
    console.error("Profile error:", error.message);

    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
};
