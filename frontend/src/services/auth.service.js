const BASE_URL = `${import.meta.env.VITE_API_URL}/auth`;

async function request(url, method, body) {
  const token = localStorage.getItem("token");

  const resposta = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  if (resposta.status === 204) return null;

  if (!resposta.ok) {
    const erro = await resposta.json().catch(() => ({}));
    throw new Error(erro.erro || `Erro ${resposta.status}`);
  }

  return resposta.json();
}

export const AuthService = {
  login: (dados) => request(`${BASE_URL}/login`, "POST", dados),
  registrar: (dados) => request(`${BASE_URL}/registro`, "POST", dados),
  atualizarPerfil: (dados) => request(`${BASE_URL}/perfil`, "PUT", dados),
  alterarSenha: (dados) => request(`${BASE_URL}/senha`, "PUT", dados),
  excluirConta: () => request(`${BASE_URL}/conta`, "DELETE"),
};
