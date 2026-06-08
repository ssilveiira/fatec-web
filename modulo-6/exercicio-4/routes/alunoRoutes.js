const express = require("express");
const router = express.Router();
const controller = require("../controllers/alunoController");

router.get("/", controller.listar);
router.get("/:id", controller.buscarUm);
router.post("/", controller.criar);
router.put("/:id", controller.atualizar);
router.delete("/:id", controller.remover);

module.exports = router;
