// Memperkecil foto supaya muat di penyimpanan browser. Hasilnya data URL JPEG.
export async function kecilkanGambar(file, sisiMaks = 800, mutu = 0.75) {
  const bitmap = await createImageBitmap(file);
  const skala = Math.min(1, sisiMaks / Math.max(bitmap.width, bitmap.height));
  const lebar = Math.max(1, Math.round(bitmap.width * skala));
  const tinggi = Math.max(1, Math.round(bitmap.height * skala));

  const kanvas = document.createElement("canvas");
  kanvas.width = lebar;
  kanvas.height = tinggi;

  const ctx = kanvas.getContext("2d");
  ctx.fillStyle = "#ffffff"; // latar putih untuk PNG transparan
  ctx.fillRect(0, 0, lebar, tinggi);
  ctx.drawImage(bitmap, 0, 0, lebar, tinggi);
  bitmap.close();

  return kanvas.toDataURL("image/jpeg", mutu);
}