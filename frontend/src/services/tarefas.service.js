const BASE_URL = "http://localhost:3000/tarefas";

async function request(url, options = {}) {
  const token = localStorage.getItem("token");

  const response = await fetch(url, {
    headers: {
      "Content-type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  });

  if (!response.ok) {
    const erro = await response.json().catch(() => ({}));
    throw new Error(erro.erro || `Erro: ${response.status}`);
  }

  if (response.status === 204) return null;
  return response.json();
}

export const TarefasService = {
  listar: () => request(BASE_URL),

  criar: (dados) =>
    request(BASE_URL, {
      method: "POST",
      body: JSON.stringify(dados),
    }),

  deletar: (id) =>
    request(`${BASE_URL}/${id}`, {
      method: "DELETE",
    }),

  concluir: (id) =>
    request(`${BASE_URL}/${id}/concluir`, {
      method: "PATCH",
    }),

  atualizar: (id, dados) =>
    request(`${BASE_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(dados),
    }),
};
