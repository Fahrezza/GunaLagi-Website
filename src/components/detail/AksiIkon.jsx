import { useEffect, useRef, useState } from "react";
import { IkonBagikanTautan, IkonHati, IkonTitikTiga, IkonBendera } from "./IkonDetail.jsx";

const kelasIkon =
  "flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";

export default function AksiIkon({ favorit, onFavorit, onBagikan, onLapor, milikSendiri }) {
  const [buka, setBuka] = useState(false);
  const wadah = useRef(null);
  const pemicu = useRef(null);

  useEffect(() => {
    if (!buka) return;

    wadah.current?.querySelector('[role="menuitem"]')?.focus();

    const klikLuar = (e) => {
      if (wadah.current && !wadah.current.contains(e.target)) setBuka(false);
    };
    const tekanEsc = (e) => {
      if (e.key === "Escape") {
        setBuka(false);
        pemicu.current?.focus();
      }
    };

    document.addEventListener("pointerdown", klikLuar);
    document.addEventListener("keydown", tekanEsc);
    return () => {
      document.removeEventListener("pointerdown", klikLuar);
      document.removeEventListener("keydown", tekanEsc);
    };
  }, [buka]);

  const lapor = () => {
    setBuka(false);
    pemicu.current?.focus(); // supaya fokus kembali ke sini saat dialog ditutup
    onLapor();
  };

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={onBagikan}
        aria-label="Bagikan barang"
        title="Bagikan"
        className={`${kelasIkon} text-neutral-800`}
      >
        <IkonBagikanTautan />
      </button>

      {!milikSendiri && (
        <>
          <button
            type="button"
            onClick={onFavorit}
            aria-pressed={favorit}
            aria-label={favorit ? "Hapus dari favorit" : "Tambahkan ke favorit"}
            title="Favorit"
            className={`${kelasIkon} ${favorit ? "text-red-500" : "text-neutral-800"}`}
          >
            <IkonHati isi={favorit} />
          </button>

          <div ref={wadah} className="relative">
            <button
              ref={pemicu}
              type="button"
              onClick={() => setBuka((b) => !b)}
              aria-haspopup="menu"
              aria-expanded={buka}
              aria-label="Opsi lainnya"
              title="Lainnya"
              className={`${kelasIkon} text-neutral-800`}
            >
              <IkonTitikTiga />
            </button>

            {buka && (
              <div
                role="menu"
                className="absolute left-0 top-full z-20 mt-2 w-44 overflow-hidden rounded-xl border border-neutral-300 bg-white py-1 shadow-lg"
              >
                <button
                  type="button"
                  role="menuitem"
                  onClick={lapor}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50 focus-visible:bg-red-50 focus-visible:outline-none"
                >
                  <IkonBendera />
                  Laporkan
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}