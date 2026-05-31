import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { Leaf, ArrowLeft } from "lucide-react";

export default function Configuracoes() {
  const {
    usuario,
    erroConfig,
    sucessoConfig,
    carregandoConfig,
    atualizarPerfil,
    alterarSenha,
    excluirConta,
  } = useAuth();

  const navigate = useNavigate();

  const [nome, setNome] = useState(usuario?.nome ?? "");
  const [email, setEmail] = useState(usuario?.email ?? "");

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [emailConfirmacao, setEmailConfirmacao] = useState("");
  const podeDeletar = emailConfirmacao === usuario?.email;

  useEffect(() => {
    async () => {
      if (sucessoConfig) {
        await setSenhaAtual("");
        await setNovaSenha("");
        await setConfirmarSenha("");
      }
    };
  }, [sucessoConfig]);

  async function handlePerfil(e) {
    e.preventDefault();
    await atualizarPerfil(nome, email);
  }

  async function handleSenha(e) {
    e.preventDefault();
    await alterarSenha(senhaAtual, novaSenha, confirmarSenha);
  }

  async function handleExcluir(e) {
    e.preventDefault();
    if (!podeDeletar) return;
    await excluirConta();
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-green-800 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">
              <Leaf size={16} />
            </span>
          </div>
          <span className="font-medium text-green-800">LeafList</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Olá, {usuario?.nome}</span>
          <button
            onClick={() => navigate("/")}
            className="text-sm cursor-pointer flex gap-1 p-1 items-center text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={14} />
            <span className="align-center">Voltar</span>
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-6">
        <div>
          <h1 className="text-xl font-medium text-gray-900 mb-1">
            Configurações
          </h1>
          <p className="text-sm text-gray-500">
            Gerencie sua conta e preferências
          </p>
        </div>

        {erroConfig && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
            {erroConfig}
          </div>
        )}
        {sucessoConfig && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3">
            {sucessoConfig}
          </div>
        )}

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-4 sm:px-5 py-4 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900">Dados pessoais</p>
            <p className="text-xs text-gray-500 mt-0.5">
              Nome e email da sua conta
            </p>
          </div>
          <form
            onSubmit={handlePerfil}
            className="p-4 sm:p-5 flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Nome</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={carregandoConfig}
                className="bg-green-800 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {carregandoConfig ? "Salvando..." : "Salvar alterações"}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-4 sm:px-5 py-4 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900">Segurança</p>
            <p className="text-xs text-gray-500 mt-0.5">
              Altere sua senha de acesso
            </p>
          </div>
          <form
            onSubmit={handleSenha}
            className="p-4 sm:p-5 flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">
                Senha atual
              </label>
              <input
                type="password"
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
                placeholder="••••••••"
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">
                Nova senha
              </label>
              <input
                type="password"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                placeholder="mínimo 6 caracteres"
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">
                Confirmar nova senha
              </label>
              <input
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                placeholder="repita a nova senha"
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={carregandoConfig}
                className="bg-green-800 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {carregandoConfig ? "Alterando..." : "Alterar senha"}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white border border-red-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-red-200 bg-red-50">
            <p className="text-sm font-medium text-red-800">Zona de perigo</p>
            <p className="text-xs text-red-500 mt-0.5">
              Ações irreversíveis — tome cuidado
            </p>
          </div>
          <div className="p-5 flex flex-col gap-4">
            <div>
              <p className="text-sm font-medium text-gray-900 mb-1">
                Excluir conta
              </p>
              <p className="text-xs text-gray-500">
                Remove permanentemente sua conta e todas as tarefas. Esta ação
                não pode ser desfeita.
              </p>
            </div>

            <form
              onSubmit={handleExcluir}
              className="bg-red-50 border border-red-200 rounded-lg p-4 flex flex-col gap-3"
            >
              <p className="text-xs text-red-800">
                Para confirmar, digite <strong>{usuario?.email}</strong> no
                campo abaixo:
              </p>
              <input
                type="email"
                value={emailConfirmacao}
                onChange={(e) => setEmailConfirmacao(e.target.value)}
                placeholder="Digite seu email para confirmar"
                className="border border-red-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent bg-white"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!podeDeletar}
                  className="bg-white text-red-600 border border-red-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Excluir minha conta
                </button>
              </div>
              <p className="text-xs text-gray-400 text-center">
                O botão será habilitado quando o email estiver correto
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
