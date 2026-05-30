import { Router } from "express";
import * as TarefasController from "../controllers/tarefas.controller.js";
const router = Router();

router.get("/resumo", TarefasController.resumo);
router.get("/", TarefasController.listar);
router.get("/:id", TarefasController.buscarPorId);
router.post("/", TarefasController.criar);
router.patch("/:id/concluir", TarefasController.concluir);
router.put("/:id", TarefasController.atualizar);
router.patch("/:id", TarefasController.atualizarParcial);
router.delete("/:id", TarefasController.deletar);
router.post("/importar", TarefasController.importar);
export default router;
