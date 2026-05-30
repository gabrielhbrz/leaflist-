import bcrypt from "bcryptjs";
import prisma from "../prisma.js";
import * as AuthService from "../services/auth.service.js";

export async function registrar(req, res, next) {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res
        .status(400)
        .json({ erro: "Nome, email e senha são obrigatórios" });
    }

    if (senha.length < 6) {
      return res
        .status(400)
        .json({ erro: "Senha deve ter no mínimo 6 caracteres" });
    }

    const resultado = await AuthService.registrar({ nome, email, senha });

    if (resultado.erro === "EMAIL_EXISTENTE") {
      return res.status(409).json({ erro: "Email já cadastrado" });
    }

    return res.status(201).json(resultado);
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: "Email e senha são obrigatórios" });
    }

    const resultado = await AuthService.login({ senha, email });

    if (resultado.erro === "CREDENCIAIS_INVALIDAS") {
      return res.status(401).json({ erro: "Email ou senha incorretos" });
    }

    return res.json(resultado);
  } catch (err) {
    next(err);
  }
}

export async function atualizarPerfil(req, res, next) {
  try {
    const { nome, email } = req.body;

    if (!nome || !email) {
      return res.status(400).json({ erro: "Nome e email são obrigatórios" });
    }

    const resultado = await AuthService.atualizarPerfil(req.usuario.id, {
      nome,
      email,
    });

    if (resultado.erro === "EMAIL_EXISTENTE") {
      return res.status(409).json({ erro: "Email já está em uso" });
    }

    return res.json(resultado);
  } catch (err) {
    next(err);
  }
}

export async function alterarSenha(req, res, next) {
  try {
    const { senhaAtual, novaSenha, confirmarSenha } = req.body;

    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
    }

    if (novaSenha !== confirmarSenha) {
      return res.status(400).json({ erro: "As senhas não coincidem" });
    }

    const resultado = await AuthService.alterarSenha(req.usuario.id, {
      senhaAtual,
      novaSenha,
    });

    if (resultado.erro === "SENHA_INCORRETA") {
      return res.status(401).json({ erro: "Senha atual incorreta" });
    }

    if (resultado.erro === "SENHA_CURTA") {
      return res
        .status(400)
        .json({ erro: "Nova senha deve ter no mínimo 6 caracteres" });
    }

    return res.json({ mensagem: "Senha alterada com sucesso" });
  } catch (err) {
    next(err);
  }
}

export async function excluirConta(req, res, next) {
  try {
    await AuthService.excluirConta(req.usuario.id);
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
}
