import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma.js";

export async function registrar({ nome, email, senha }) {
  const usuarioExistente = await prisma.usuario.findUnique({
    where: { email },
  });

  if (usuarioExistente) {
    return { erro: "EMAIL_EXISTENTE" };
  }

  // o número 10 é o "cost factor" — quanto maior, mais seguro e mais lento
  const senhaHash = await bcrypt.hash(senha, 10);

  const usuario = await prisma.usuario.create({
    data: { nome, email, senha: senhaHash },
  });

  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
  };
}

export async function login({ email, senha }) {
  const usuario = await prisma.usuario.findUnique({
    where: { email },
  });

  if (!usuario) {
    return { erro: "CREDENCIAIS_INVALIDAS" };
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

  if (!senhaCorreta) {
    return { erro: "CREDENCIAIS_INVALIDAS" };
  }

  const token = jwt.sign(
    { id: usuario.id, email: usuario.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRA_EM },
  );

  return {
    token,
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    },
  };
}

export async function atualizarPerfil(id, { nome, email }) {
  if (email) {
    const existente = await prisma.usuario.findUnique({ where: { email } });
    if (existente && existente.id === id) {
      return { erro: "EMAIL_EXISTENTE" };
    }
  }

  const usuario = await prisma.usuario.update({
    where: { id },
    data: { nome, email },
  });

  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
  };
}

export async function alterarSenha(id, { senhaAtual, novaSenha }) {
  const usuario = await prisma.usuario.findUnique({ where: { id } });

  const senhaCorreta = await bcrypt.compare(senhaAtual, usuario.senha);
  if (!senhaCorreta) {
    return { erro: "SENHA_INCORRETA" };
  }

  if (novaSenha.length < 6) {
    return { erro: "SENHA_CURTA" };
  }

  const senhaHash = await bcrypt.hash(novaSenha, 10);
  await prisma.usuario.update({
    where: { id },
    data: { senha: senhaHash },
  });

  return { sucesso: true };
}

export async function excluirConta(id) {
  await prisma.usuario.delete({ where: { id } });
  return { sucesso: true };
}
