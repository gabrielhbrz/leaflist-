import { useState } from "react";

export default function ModalEdicao({ tarefa, salvar, fechar }) {
  const [titulo, setTitulo] = useState(tarefa.titulo);
  const [descricao, setDescricao] = useState(tarefa.descricao ?? "");
  const [concluido, setConcluido] = useState(tarefa.concluido);
  const [prioridade, setPrioridade] = useState(tarefa.prioridade ?? "media");

  function handleSubmit(e) {
    e.preventDefault();
    if (!titulo.trim()) return;
    salvar({
      titulo: titulo.trim(),
      descricao: descricao.trim() || null,
      concluido,
      prioridade,
    });
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={fechar}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md p-4 sm:p-6 flex flex-col gap-4 mx-4 sm:mx-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Editar tarefa</h2>
          <button
            onClick={fechar}
            className="text-gray-400 hover:text-gray-600 transition-colors text-xl leading-none"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Título</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              autoFocus
              className="border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Descrição
            </label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={3}
              className="border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent resize-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Prioridade
            </label>
            <select
              value={prioridade}
              onChange={(e) => setPrioridade(e.target.value)}
              className="border border-gray-200 rounded-md px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-green-700"
            >
              <option value="baixa">Baixa</option>
              <option value="media">Média</option>
              <option value="alta">Alta</option>
            </select>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={concluido}
              onChange={(e) => setConcluido(e.target.checked)}
              className="accent-green-800"
            />
            <span className="text-sm text-gray-700">Marcar como concluída</span>
          </label>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={fechar}
              className="flex-1 border border-gray-200 text-gray-600 px-4 py-2 rounded-md text-sm hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-green-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
