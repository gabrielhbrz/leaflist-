import { Pencil, Trash2 } from "lucide-react";

const badgePrioridade = {
  baixa: "bg-green-100 text-green-800",
  media: "bg-yellow-100 text-yellow-800",
  alta: "bg-red-100 text-red-800",
};

const labelPrioridade = {
  baixa: "Baixa",
  media: "Média",
  alta: "Alta",
};

export default function ItemTarefa({ tarefa, deletar, completar, editar }) {
  const { titulo, descricao, concluido, prioridade, criadaEm } = tarefa;

  const dataFormatada = new Date(criadaEm).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div
      className={`group bg-gray-50 border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow ${
        concluido ? "border-gray-100 opacity-75" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={concluido}
          onChange={() => completar()}
          className="mt-0.5 accent-green-800 cursor-pointer"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-sm font-medium ${
                concluido ? "line-through text-gray-400" : "text-gray-900"
              }`}
            >
              {titulo}
            </span>

            {prioridade && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  badgePrioridade[prioridade] ?? badgePrioridade.media
                }`}
              >
                {labelPrioridade[prioridade] ?? prioridade}
              </span>
            )}
          </div>

          {descricao && (
            <p className="max-w-0 min-w-0 text-xs text-gray-500 mt-0.5 truncate">
              {descricao}
            </p>
          )}

          <p className="text-xs text-gray-400 mt-1">{dataFormatada}</p>
        </div>

        <div className="flex items-center gap-1 shrink-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => editar()}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => deletar()}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
