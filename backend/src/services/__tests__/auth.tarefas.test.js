import { it, describe, expect, vi, beforeEach } from "vitest";
import * as AuthService from "../auth.service.js";
import prisma from "../../prisma.js";
import bcrypt, { compare } from "bcryptjs";

vi.mock("../prisma.js", () => ({
  default: {
    usuario: {
      findUnique: vi.fn(),
      create: vi.fn(),
      sign: vi.fn(),
      compare: vi.fn(),
    },
  },
}));

describe("AuthService.login", async () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve retornar EMAIL_EXISTENTE quando email já está cadastrado", async () => {
    prisma.usuario.findUnique.mockResolvedValue({
      id: "uuid-v1",
      email: "g@gmail.com",
    });

    const resultado = await AuthService.registrar({
      nome: "Gabriel",
      email: "g@gmail.com",
      senha: "123456",
    });

    expect(resultado).toEqual({ erro: "EMAIL_EXISTENTE" });
  });

  it("deve criar um usuário quando o email não existe", async () => {
    prisma.usuario.findUnique.mockResolvedValue(null);

    prisma.usuario.create.mockResolvedValue({
      id: "shshsihsihsihsishis",
      nome: "Gabriela",
      email: "gaby@gmail.com",
      senha: "123456",
    });

    const resultado = await AuthService.registrar({
      nome: "Gabriela",
      email: "gaby@gmail.com",
      senha: "123456",
    });

    expect(resultado).toMatchObject({
      id: "shshsihsihsihsishis",
      nome: "Gabriela",
      email: "gaby@gmail.com",
    });
    expect(resultado).not.toHaveProperty("senha");
  });

  it("deve retornar CREDENCIAIS_INVALIDAS quando o email ou senha não são validos", async () => {
    prisma.usuario.findUnique.mockResolvedValue(false);

    const resultado = await AuthService.login({
      email: "e@qualquer.com",
      senha: "2222222",
    });

    expect(resultado).toEqual({ erro: "CREDENCIAIS_INVALIDAS" });
  });
});
