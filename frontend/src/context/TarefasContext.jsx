import { createContext, useContext, useEffect, useState } from "react";
import { TarefasService } from "../services/tarefas.service";

export const TarefasContext = createContext(null);

export function TarefasProvider({ children }) {
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [tarefaEditando, setTarefaEditando] = useState(null);

  useEffect(() => {
    async function buscarTarefas() {
      try {
        const data = await TarefasService.listar();
        setTarefas(data);
      } catch (err) {
        setErro(err.message);
      } finally {
        setCarregando(false);
      }
    }
    buscarTarefas();
  }, []);

  function abrirModal(tarefa) {
    setTarefaEditando(tarefa);
  }

  function fecharModal() {
    setTarefaEditando(null);
  }

  async function criarTarefa(dados) {
    try {
      const novaTarefa = await TarefasService.criar(dados);
      setTarefas((atual) => [...atual, novaTarefa]);
    } catch (err) {
      setErro(err.message);
    }
  }

  async function deletar(id) {
    try {
      await TarefasService.deletar(id);
      setTarefas((atual) => atual.filter((t) => t.id !== id));
    } catch (err) {
      setErro(err.message);
    }
  }

  async function completar(id) {
    try {
      await TarefasService.concluir(id);
      setTarefas((atual) =>
        atual.map((t) => (t.id === id ? { ...t, concluido: !t.concluido } : t)),
      );
    } catch (err) {
      setErro(err.message);
    }
  }

  async function salvarEdicao(dadosAtualizados) {
    try {
      const tarefaAtualizada = await TarefasService.atualizar(
        tarefaEditando.id,
        dadosAtualizados,
      );
      const novaLista = tarefas.map((t) =>
        t.id === tarefaEditando.id ? tarefaAtualizada : t,
      );
      setTarefas(novaLista);
      fecharModal();
    } catch (err) {
      setErro(err.message);
    }
  }

  const valor = {
    tarefas,
    carregando,
    erro,
    tarefaEditando,
    criarTarefa,
    deletar,
    completar,
    abrirModal,
    fecharModal,
    salvarEdicao,
  };

  return (
    <TarefasContext.Provider value={valor}>{children}</TarefasContext.Provider>
  );
}

export function useTarefas() {
  const contexto = useContext(TarefasContext);

  if (!contexto) {
    throw new Error("useTarefas precisa estar dentro da TarefasProvider");
  }

  return contexto;
}
