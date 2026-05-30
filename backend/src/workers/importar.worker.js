import { parentPort, workerData } from "node:worker_threads";

const { tarefas } = workerData;

const validas = tarefas.filter(
  (tarefa) =>
    tarefa.titulo && typeof tarefa.titulo === "string" && tarefa.titulo.trim(),
);

parentPort.postMessage({
  validas,
  invalidas: tarefas.length - validas.length,
});
