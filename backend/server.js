
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./config/database");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
}));

app.use(express.json());

// Endpoint utama
app.get("/", (req, res) => {
  res.json({
    message: "GunaLagi API berjalan!",
  });
});

// Routes autentikasi
app.use("/api/auth", authRoutes);

// Endpoint tidak ditemukan
app.use((req, res) => {
  res.status(404).json({
    message: "Endpoint tidak ditemukan",
  });
});

const PORT = process.env.PORT || 5000;

// Menjalankan server
const startServer = async () => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET belum diatur");
    }

    await db.query("SELECT 1");

    console.log("MySQL berhasil terhubung!");

    app.listen(PORT, () => {
      console.log(
        `GunaLagi API berjalan di http://localhost:${PORT}`
      );
    });

  } catch (error) {
    console.error("Gagal menjalankan server:", error.message);
    process.exit(1);
  }
};

startServer();
