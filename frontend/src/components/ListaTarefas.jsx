import { useTarefas } from "../context/TarefasContext.jsx";
import ItemTarefa from "./ItemTarefa";
import { Check } from "lucide-react";

export default function ListaTarefas() {
  const { tarefas, deletar, completar, abrirModal } = useTarefas();

  const pendentes = tarefas.filter((t) => !t.concluido);
  const concluidas = tarefas.filter((t) => t.concluido);

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-gray-400">○</span>
          <h2 className="font-semibold text-gray-700">
            Pendentes ({pendentes.length})
          </h2>
        </div>
        <div className="flex flex-col gap-2">
          {pendentes.length === 0 && (
            <p className="text-sm text-gray-400 py-4 text-center">
              Nenhuma tarefa pendente
            </p>
          )}
          {pendentes.map((tarefa) => (
            <ItemTarefa
              key={tarefa.id}
              tarefa={tarefa}
              deletar={() => deletar(tarefa.id)}
              completar={() => completar(tarefa.id)}
              editar={() => abrirModal(tarefa)}
            />
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <span>
            <Check color="#016630" size={19} />
          </span>
          <h2 className="font-semibold text-gray-700">
            Concluídas ({concluidas.length})
          </h2>
        </div>
        <div className="flex flex-col gap-2">
          {concluidas.length === 0 && (
            <p className="text-sm text-gray-400 py-4 text-center">
              Nenhuma tarefa concluída
            </p>
          )}
          {concluidas.map((tarefa) => (
            <ItemTarefa
              key={tarefa.id}
              tarefa={tarefa}
              deletar={() => deletar(tarefa.id)}
              completar={() => completar(tarefa.id)}
              editar={() => abrirModal(tarefa)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
