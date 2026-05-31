import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Link, Navigate } from "react-router-dom";
import { Leaf, Flag, Lock, Grid3x3 } from "lucide-react";

export default function Login() {
  const { login, erro, carregando, estaLogado } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  if (estaLogado) return <Navigate to="/" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    await login(email, senha);
  }

  const features = [
    {
      icon: <Grid3x3 size={14} />,
      titulo: "Pendentes e concluídas separadas",
      desc: "Visualize seu progresso em tempo real",
    },
    {
      icon: <Flag size={14} />,
      titulo: "Prioridade por tarefa",
      desc: "Baixa, média ou alta — você decide o foco",
    },
    {
      icon: <Lock size={14} />,
      titulo: "Dados privados e seguros",
      desc: "Cada conta acessa apenas suas próprias tarefas",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl overflow-hidden border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-130">
          <div className="hidden md:flex bg-green-800 p-12 flex-col justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Leaf size={18} className="text-green-800" />
              </div>
              <span className="text-white font-medium text-lg">LeafList</span>
            </div>

            <div>
              <h1 className="text-2xl font-medium text-white leading-snug mb-3">
                Organize suas tarefas com clareza
              </h1>
              <p className="text-green-200 text-sm mb-8 leading-relaxed">
                Crie, priorize e acompanhe tudo o que precisa fazer — de um
                jeito simples e visual.
              </p>

              <div className="flex flex-col gap-4">
                {features.map((f) => (
                  <div key={f.titulo} className="flex items-start gap-3">
                    <div className="w-7 h-7 bg-white/20 rounded-md flex items-center justify-center shrink-0 mt-0.5 text-white">
                      {f.icon}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">
                        {f.titulo}
                      </p>
                      <p className="text-green-200 text-xs">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-green-300 text-xs">
              Gratuito para usar. Sem cartão de crédito.
            </p>
          </div>

          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-xl font-medium text-gray-900 mb-1">
              Entrar na sua conta
            </h2>
            <p className="text-sm text-gray-500 mb-7">
              Bem-vindo de volta ao LeafList
            </p>

            {erro && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-3 py-2 mb-4">
                {erro}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  autoFocus
                  className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Senha
                </label>
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="••••••"
                  className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={carregando}
                className="bg-green-800 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50 mt-1"
              >
                {carregando ? "Entrando..." : "Entrar"}
              </button>
            </form>

            <p className="text-sm text-gray-500 text-center mt-6">
              Não tem conta?{" "}
              <Link
                to="/registro"
                className="text-green-800 font-medium hover:underline"
              >
                Criar conta gratuitamente
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
