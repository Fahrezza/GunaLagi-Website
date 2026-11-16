import { Link } from "react-router-dom";
import GatedLink from "../GatedLink.jsx";
import { IkonPanahKanan } from "./IkonDetail.jsx";

export default function Breadcrumb({ berandaPath, nama }) {
  const kelas = "text-xs text-neutral-800 underline-offset-4 hover:underline";
  const pemisah = (
    <li aria-hidden="true">
      <IkonPanahKanan width={14} height={14} className="text-neutral-500" />
    </li>
  );

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link to={berandaPath} className={kelas}>
            Beranda
          </Link>
        </li>
        {pemisah}
        <li>
          <GatedLink to="/jelajahi" perluLogin className={kelas}>
            Jelajahi
          </GatedLink>
        </li>
        {pemisah}
        <li aria-current="page" className="text-xs font-semibold text-neutral-950">
          {nama}
        </li>
      </ol>
    </nav>
  );
}