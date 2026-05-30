import prisma from "../prisma.js";

export async function listarTarefas({
  concluido,
  limite,
  ordenarPor,
  ordem,
  usuarioId,
}) {
  const filtro = { usuarioId };

  if (concluido !== undefined) {
    filtro.concluido = concluido === "true";
  }

  return prisma.tarefa.findMany({
    where: filtro,
    orderBy: {
      [ordenarPor || "criadaEm"]: ordem === "asc" ? "asc" : "desc",
    },
    take: limite ? parseInt(limite) : undefined,
  });
}

export async function buscarTarefaPorId(id) {
  return prisma.tarefa.findUnique({
    where: { id: id },
  });
}

export async function criarTarefa({
  titulo,
  descricao,
  prioridade,
  usuarioId,
}) {
  return prisma.tarefa.create({
    data: {
      titulo: titulo.trim(),
      descricao: descricao?.trim() ?? null,
      prioridade: (prioridade || "media").trim(),
      usuarioId,
    },
  });
}

export async function resumoTarefas() {
  const resultado = await prisma.$queryRaw`
    SELECT
        COUNT(*)::int                                 AS total,
        COUNT(*) FILTER (WHERE concluido = true)::int  AS concluidas,
        COUNT(*) FILTER (WHERE concluido = false)::int AS pendentes
      FROM "Tarefa"
    `;

  return resultado[0];
}

export async function concluirTarefa(id) {
  const tarefa = await prisma.tarefa.findUnique({
    where: { id: id },
  });

  if (!tarefa) {
    return { erro: "NAO_ENCONTRADA" };
  }

  if (tarefa.concluido === true) {
    return { erro: "JA_CONCLUIDA" };
  }

  return prisma.tarefa.update({
    where: { id: id },
    data: { concluido: true },
  });
}

export async function atualizarTarefa(id, tarefa) {
  return await prisma.tarefa.update({
    where: { id: id },
    data: tarefa,
  });
}

export async function atualizarParcial(id, dados) {
  const camposPermitidos = ["titulo", "descricao", "concluido", "prioridade"];
  const atualizacao = {};

  for (const campo of camposPermitidos) {
    if (dados[campo] !== undefined) {
      atualizacao[campo] =
        typeof dados[campo] === "string" ? dados[campo].trim() : dados[campo];
    }
  }

  return prisma.tarefa.update({
    where: { id },
    data: atualizacao,
  });
}

export async function deletarTarefa(id) {
  return prisma.tarefa.delete({
    where: { id: id },
  });
}

export async function importarTarefas(dados) {
  return prisma.tarefa.createMany({
    data: dados,
    skipDuplicates: true,
  });
}
