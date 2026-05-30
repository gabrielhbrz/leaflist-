import { Worker } from "worker_threads";
import * as TarefasServices from "../services/tarefas.service.js";

export async function listar(req, res, next) {
  try {
    const tarefas = await TarefasServices.listarTarefas({
      ...req.query,
      usuarioId: req.usuario.id,
    });
    return res.json(tarefas);
  } catch (err) {
    next(err);
  }
}

export async function buscarPorId(req, res, next) {
  try {
    const { id } = req.params;
    const tarefa = await TarefasServices.buscarTarefaPorId(id);

    if (!tarefa) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    return res.json(tarefa);
  } catch (err) {
    next(err);
  }
}

export async function criar(req, res, next) {
  try {
    const { titulo, descricao, prioridade } = req.body;

    if (!titulo || typeof titulo !== "string" || !titulo.trim()) {
      return res.status(400).json({ erro: "Título é obrigatório" });
    }

    const tarefa = await TarefasServices.criarTarefa({
      titulo,
      descricao,
      prioridade,
      usuarioId: req.usuario.id,
    });
    return res.status(201).json(tarefa);
  } catch (err) {
    next(err);
  }
}

export async function resumo(req, res, next) {
  try {
    const dados = await TarefasServices.resumoTarefas();
    return res.json(dados);
  } catch (err) {
    next(err);
  }
}

export async function concluir(req, res, next) {
  try {
    const { id } = req.params;
    const resultado = await TarefasServices.concluirTarefa(id);

    if (resultado?.erro === "NAO_ENCONTRADA") {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    if (resultado?.erro === "JA_CONCLUIDA") {
      return res.status(400).json({ erro: "Tarefa já está concluída" });
    }

    return res.json(resultado);
  } catch (err) {
    next(err);
  }
}

export async function atualizar(req, res, next) {
  try {
    const { id } = req.params;
    const dados = req.body;

    if (Object.keys(dados).length === 0) {
      return res.status(400).json({ erro: "Nenhuma mudança encontrada" });
    }

    const camposPermitidos = ["titulo", "descricao", "concluido", "prioridade"];
    let mudancas = {};
    for (const campo of camposPermitidos) {
      if (campo in dados) {
        mudancas[campo] = dados[campo];
      }
    }
    const tarefaAtualizada = await TarefasServices.atualizarTarefa(
      id,
      mudancas,
    );
    return res.json(tarefaAtualizada);
  } catch (err) {
    next(err);
  }
}

export async function atualizarParcial(req, res, next) {
  try {
    const { id } = req.params;
    const { titulo, descricao, concluido, prioridade } = req.body;

    const tarefaAtualizada = await TarefasServices.atualizarParcial(id, {
      titulo,
      descricao,
      concluido,
      prioridade,
    });

    return res.json(tarefaAtualizada);
  } catch (err) {
    next(err);
  }
}

export async function deletar(req, res, next) {
  try {
    const { id } = req.params;
    await TarefasServices.deletarTarefa(id);

    return res.status(204).send();
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }
    next(err);
  }
}

function executarWorker(caminho, dados) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(caminho, { workerData: dados });
    worker.on("message", resolve);
    worker.on("error", reject);
  });
}

export async function importar(req, res, next) {
  try {
    const { tarefas } = req.body;

    if (!Array.isArray(tarefas) || tarefas.length === 0) {
      return res.status(400).json({ erro: "Envie um array de tarefas" });
    }

    const { validas, invalidas } = await executarWorker(
      "./src/workers/importar.worker.js",
      { tarefas },
    );

    await TarefasServices.importarTarefas(validas);
    return res.status(201).json({
      importadas: validas.length,
      ignoradas: invalidas,
    });
  } catch (err) {
    next(err);
  }
}
