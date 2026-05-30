import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function RotaProtegida({ children }) {
  const { estaLogado } = useAuth();

  if (!estaLogado) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
