import { useState } from "react";

export default function InputField({ label, name, type = "text", error, ...props }) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="mb-2.5 sm:mb-4">
      <label htmlFor={name} className="mb-1 block text-[11px] font-semibold sm:mb-1.5 sm:text-xs">
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={isPassword && show ? "text" : type}
          aria-invalid={Boolean(error)}
          className={`w-full rounded-lg border px-3 py-1.5 text-base leading-5 outline-none transition focus:ring-2 focus:ring-lime-brand sm:py-2.5 md:text-sm ${
            error ? "border-red-500" : "border-neutral-300"
          }`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-500"
          >
            {show ? "Sembunyikan" : "Lihat"}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}