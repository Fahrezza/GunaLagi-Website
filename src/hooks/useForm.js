import { useState } from "react";

// Custom hook: menyimpan nilai form, error, dan handler input.
export default function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

 const handleSubmit = (onValid) => (e) => {
  e.preventDefault();

  console.log("[FORM] Tombol submit terpanggil");

  const found = validate(values);

  console.log("[FORM] Hasil validasi:", found);

  setErrors(found);

  if (Object.keys(found).length === 0) {
    console.log("[FORM] Validasi berhasil, menjalankan onValid");

    onValid(values);
  } else {
    console.warn("[FORM] Validasi gagal:", Object.keys(found));
  }
};

  return { values, errors, handleChange, handleSubmit };
}