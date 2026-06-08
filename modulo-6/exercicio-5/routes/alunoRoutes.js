const express = require("express");
const router = express.Router();
const Aluno = require("../models/Aluno");

router.get("/", async (req, res) => {
  try {
    const filtro = {};
    if (req.query.curso) filtro.curso = req.query.curso;
    const alunos = await Aluno.find(filtro);
    res.json(alunos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const aluno = await Aluno.findById(req.params.id);
    if (!aluno) return res.status(404).json({ erro: "Aluno não encontrado" });
    res.json(aluno);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const aluno = await Aluno.create(req.body);
    res.status(201).json(aluno);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const aluno = await Aluno.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!aluno) return res.status(404).json({ erro: "Aluno não encontrado" });
    res.json(aluno);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const aluno = await Aluno.findByIdAndDelete(req.params.id);
    if (!aluno) return res.status(404).json({ erro: "Aluno não encontrado" });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

module.exports = router;
