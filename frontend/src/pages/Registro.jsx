import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Link, Navigate } from "react-router-dom";
import { Leaf, Flag, Lock, Check } from "lucide-react";

export default function Registro() {
  const { registrar, erro, carregando, estaLogado } = useAuth();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  if (estaLogado) return <Navigate to="/" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    await registrar(nome, email, senha);
  }

  const beneficios = [
    {
      icon: <Check size={14} />,
      titulo: "Simples",
      desc: "Interface limpa e intuitiva",
    },
    {
      icon: <Flag size={14} />,
      titulo: "Prioridades",
      desc: "Foque no que importa",
    },
    { icon: <Lock size={14} />, titulo: "Seguro", desc: "Seus dados são seus" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-green-800 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold p-2">
              <Leaf size={15} />
            </span>
          </div>
          <span className="text-green-800 font-medium">LeafList</span>
        </div>
        <p className="text-sm text-gray-500">
          Já tem conta?{" "}
          <Link
            to="/login"
            className="text-green-800 font-medium hover:underline"
          >
            Entrar
          </Link>
        </p>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-2xl font-medium text-gray-900 mb-2">
          Comece a organizar seu dia
        </h1>
        <p className="text-sm text-gray-500">
          Crie sua conta gratuita e tenha suas tarefas sempre organizadas.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl mb-6">
        {beneficios.map((b) => (
          <div
            key={b.titulo}
            className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center text-center"
          >
            <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center mb-3 text-green-800 font-bold">
              {b.icon}
            </div>
            <p className="text-sm font-medium text-gray-900 mb-1">{b.titulo}</p>
            <p className="text-xs text-gray-500">{b.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-8 w-full max-w-md">
        {erro && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-3 py-2 mb-4">
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome"
              autoFocus
              className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="mínimo 6 caracteres"
              className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={carregando}
            className="bg-green-800 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50 mt-1"
          >
            {carregando ? "Criando conta..." : "Criar conta gratuitamente"}
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-4">
          Ao criar sua conta você concorda com os termos de uso.
        </p>
      </div>
    </div>
  );
}
