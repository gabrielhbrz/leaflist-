import { useState } from "react";
import { useTarefas } from "../context/TarefasContext.jsx";

export default function FormularioTarefa() {
  const { criarTarefa } = useTarefas();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prioridade, setPrioridade] = useState("media");

  const enviarDados = async (e) => {
    e.preventDefault();
    if (!titulo.trim()) return;

    await criarTarefa({
      titulo: titulo.trim(),
      descricao: descricao?.trim() ?? null,
      prioridade,
    });

    setTitulo("");
    setDescricao("");
    setPrioridade("media");
  };

  return (
    <form
      onSubmit={enviarDados}
      className="bg-white rounded-lg border border-gray-200 p-4 mb-6"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-green-800 font-medium text-sm">
          + Adicionar Tarefa
        </span>
      </div>

      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Nova tarefa..."
        className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent mb-3"
      />

      <div className="flex items-center gap-2">
        <select
          value={prioridade}
          onChange={(e) => setPrioridade(e.target.value)}
          className="border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-700 text-gray-600 bg-white min-w-20 shrink-0"
        >
          <option value="baixa">Baixa</option>
          <option value="media">Média</option>
          <option value="alta">Alta</option>
        </select>

        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descrição (opcional)"
          className="min-w-0 flex-1 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
        />

        <button
          type="submit"
          className="bg-green-800 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors shrink-0"
        >
          <span className="hidden sm:inline">+ Adicionar</span>
          <span className="sm:hidden">+</span>
        </button>
      </div>
    </form>
  );
}
