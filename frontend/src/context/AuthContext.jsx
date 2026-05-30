import { createContext, useContext, useState } from "react";
import { AuthService } from "../services/auth.service.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [usuario, setUsuario] = useState(() => {
    const salvo = localStorage.getItem("usuario");
    return salvo ? JSON.parse(salvo) : null;
  });
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(false);

  const [erroConfig, setErroConfig] = useState(null);
  const [sucessoConfig, setSucessoConfig] = useState(null);
  const [carregandoConfig, setCarregandoConfig] = useState(false);

  const estaLogado = !!token;

  async function login(email, senha) {
    try {
      setCarregando(true);
      setErro(null);
      const dados = await AuthService.login({ email, senha });

      localStorage.setItem("token", dados.token);
      localStorage.setItem("usuario", JSON.stringify(dados.usuario));

      setToken(dados.token);
      setUsuario(dados.usuario);
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  async function registrar(nome, email, senha) {
    try {
      setCarregando(true);
      setErro(null);
      await AuthService.registrar({ nome, email, senha });

      await login(email, senha);
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setToken(null);
    setUsuario(null);
  }

  async function atualizarPerfil(nome, email) {
    try {
      setCarregandoConfig(true);
      setErroConfig(null);
      setSucessoConfig(null);

      const dados = await AuthService.atualizarPerfil({ nome, email });

      const usuarioAtualizado = {
        ...usuario,
        nome: dados.nome,
        email: dados.email,
      };
      localStorage.setItem("usuario", JSON.stringify(usuarioAtualizado));
      setUsuario(usuarioAtualizado);

      setSucessoConfig("Perfil atualizado com sucesso");
    } catch (err) {
      setErroConfig(err.message);
    } finally {
      setCarregandoConfig(false);
    }
  }

  async function alterarSenha(senhaAtual, novaSenha, confirmarSenha) {
    try {
      setCarregandoConfig(true);
      setErroConfig(null);
      setSucessoConfig(null);

      await AuthService.alterarSenha({ senhaAtual, novaSenha, confirmarSenha });
      setSucessoConfig("Senha alterada com sucesso");
    } catch (err) {
      setErroConfig(err.message);
    } finally {
      setCarregandoConfig(false);
    }
  }

  async function excluirConta() {
    try {
      await AuthService.excluirConta();
      logout();
    } catch (err) {
      setErroConfig(err.message);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        usuario,
        estaLogado,
        erro,
        carregando,
        login,
        registrar,
        logout,
        erroConfig,
        sucessoConfig,
        carregandoConfig,
        atualizarPerfil,
        alterarSenha,
        excluirConta,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error("useAuth precisa estar dentro de AuthProvider");
  }
  return contexto;
}
