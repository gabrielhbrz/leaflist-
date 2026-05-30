import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormularioTarefa from "../components/FormularioTarefa";

// mock do contexto — substitui useTarefas por versão controlada
const criarTarefaMock = vi.fn();

vi.mock("../context/TarefasContext", () => ({
  useTarefas: () => ({
    criarTarefa: criarTarefaMock,
  }),
}));

describe("FormularioTarefa", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("não deve chamar criarTarefa quando título está vazio", async () => {
    const user = userEvent.setup();
    render(<FormularioTarefa />);

    // clica no botão sem preencher o input
    await user.click(screen.getByRole("button", { name: /adicionar/i }));

    // verifica que criarTarefa não foi chamada
    expect(criarTarefaMock).not.toHaveBeenCalled();
  });

  it("deve limpar o input após criar tarefa", async () => {
    const user = userEvent.setup();
    render(<FormularioTarefa />);

    // digita no input de título
    const input = screen.getByPlaceholderText(/nova tarefa/i);
    await user.type(input, "Estudar testes");

    // envia o formulário
    await user.click(screen.getByRole("button", { name: /adicionar/i }));

    // verifica que o input foi limpo
    expect(input).toHaveValue("");

    // verifica que criarTarefa foi chamada com os dados corretos
    expect(criarTarefaMock).toHaveBeenCalledWith({
      titulo: "Estudar testes",
      descricao: "",
    });
  });
});
