import { Router } from "express";
import * as AuthController from "../controllers/auth.controller.js";
import { autenticar } from "../middlewares/autenticar.js";

const router = Router();

router.post("/registro", AuthController.registrar);
router.post("/login", AuthController.login);

router.put("/perfil", autenticar, AuthController.atualizarPerfil);
router.put("/senha", autenticar, AuthController.alterarSenha);
router.delete("/conta", autenticar, AuthController.excluirConta);

export default router;
