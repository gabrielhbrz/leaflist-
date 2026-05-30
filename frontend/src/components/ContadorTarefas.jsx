import { useTarefas } from "../context/TarefasContext";

export default function ContadorTarefas() {
  const { tarefas } = useTarefas();

  const tarefasConcluidas = tarefas.filter((tarefa) => tarefa.concluido).length;

  return (
    <p className="text-sm text-gray-500 mt-1">
      {tarefas.length} tarefas - {tarefasConcluidas} concluída
      {tarefasConcluidas > 1 ? "s" : ""}
    </p>
  );
}
