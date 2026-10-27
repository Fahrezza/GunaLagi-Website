import { Navigate } from "react-router-dom";
import { getSession } from "../services/authService.js";

export default function GuestRoute({ children }) {
  return getSession() ? <Navigate to="/beranda" replace /> : children;
}