import { describe, expect, it, vi, beforeEach } from "vitest";
import * as TarefasService from "../tarefas.service.js";
import prisma from "../../prisma.js";

vi.mock("../prisma.js", () => ({
  default: {
    tarefa: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
  },
}));

describe("TarefasService.concluirTarefas", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve retornar NAO_ENCONTRADA quando tarefa não existe", async () => {
    prisma.tarefa.findUnique.mockResolvedValue(null);

    const resultado = await TarefasService.concluirTarefa("uuid-qualquer");

    expect(resultado).toEqual({ erro: "NAO_ENCONTRADA" });
  });

  it("deve retornar JA_CONCLUIDA quando tarefa já está concluída", async () => {
    prisma.tarefa.findUnique.mockResolvedValue({
      id: "uuid-qualquer",
      titulo: "Estudar testes",
      concluido: true,
    });

    const resultado = await TarefasService.concluirTarefa("uuid-qualquer");

    expect(resultado).toEqual({ erro: "JA_CONCLUIDA" });
  });

  it("deve retornar a tarefa atualizada quando concluir com sucesso", async () => {
    prisma.tarefa.findUnique.mockResolvedValue({
      id: "uuid-qualquer",
      titulo: "Estudar testes",
      concluido: false,
    });

    prisma.tarefa.update.mockResolvedValue({
      id: "uuid-qualquer",
      titulo: "Estudar testes",
      concluido: true,
    });

    const resultado = await TarefasService.concluirTarefa("uuid-qualquer");

    expect(resultado).toMatchObject({
      id: "uuid-qualquer",
      concluido: true,
    });
  });
});
