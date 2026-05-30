import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ContadorTarefas from "../components/ContadorTarefas.jsx";
import { TarefasContext } from "../context/TarefasContext.jsx";

function renderComContexto(tarefas) {
  return render(
    <TarefasContext.Provider value={{ tarefas }}>
      <ContadorTarefas />
    </TarefasContext.Provider>,
  );
}

describe("ContadorTarefas", () => {
  it("exibe zero tarefas quando a lista está vazia", () => {
    renderComContexto([]);
    expect(screen.getByText(/0 tarefas/i)).toBeInTheDocument();
  });
});
