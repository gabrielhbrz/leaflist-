import { useTarefas } from "../context/TarefasContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { Leaf, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FormularioTarefa from "../components/FormularioTarefa.jsx";
import ListaTarefas from "../components/ListaTarefas.jsx";
import ContadorTarefas from "../components/ContadorTarefas.jsx";
import ModalEdicao from "../components/ModalEdicao.jsx";

export default function ToDoApp() {
  const { carregando, erro, tarefaEditando, salvarEdicao, fecharModal } =
    useTarefas();
  const { usuario, logout } = useAuth();

  const navigate = useNavigate();

  if (carregando)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Carregando...</p>
      </div>
    );

  if (erro)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500">Erro: {erro}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="w-7 h-7 bg-green-800 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold p-2">
              <Leaf size={16} />
            </span>
          </div>
          <span className="font-semibold text-green-700">LeafList</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Olá, {usuario?.nome}</span>
          <button
            onClick={() => navigate("/configuracoes")}
            className="flex items-center gap-1.5 text-sm cursor-pointer text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Settings size={14} />
            Configurações
          </button>
          <button
            onClick={logout}
            className="text-sm text-gray-500 cursor-pointer hover:text-gray-900 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-green-900">Minhas Tarefas</h1>
          <ContadorTarefas />
        </div>

        <FormularioTarefa />

        <ListaTarefas />
      </main>

      {tarefaEditando && (
        <ModalEdicao
          tarefa={tarefaEditando}
          salvar={salvarEdicao}
          fechar={fecharModal}
        />
      )}
    </div>
  );
}
