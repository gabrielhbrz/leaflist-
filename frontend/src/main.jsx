import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { TarefasProvider } from "./context/TarefasContext.jsx";
import RotaProtegida from "./components/RotaProtegida.jsx";
import Login from "./pages/Login.jsx";
import Registro from "./pages/Registro.jsx";
import ToDoApp from "./pages/ToDoApp.jsx";
import Configuracoes from "./pages/Configuracoes.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registro",
    element: <Registro />,
  },
  {
    path: "/",
    element: (
      <RotaProtegida>
        <TarefasProvider>
          <ToDoApp />
        </TarefasProvider>
      </RotaProtegida>
    ),
  },
  {
    path: "/configuracoes",
    element: (
      <RotaProtegida>
        <Configuracoes />,
      </RotaProtegida>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
