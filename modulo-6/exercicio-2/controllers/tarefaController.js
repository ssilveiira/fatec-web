const Tarefa = require("../models/tarefa");

function listar(req, res) {
  res.json(Tarefa.listarTodas());
}

function buscarUma(req, res) {
  const tarefa = Tarefa.buscarPorId(Number(req.params.id));
  if (!tarefa) return res.status(404).json({ erro: "Tarefa não encontrada" });
  res.json(tarefa);
}

function criar(req, res) {
  const { titulo, descricao } = req.body;
  if (!titulo || titulo.trim().length === 0) {
    return res.status(400).json({ erro: "O título é obrigatório" });
  }
  const nova = Tarefa.criar(titulo.trim(), descricao);
  res.status(201).json(nova);
}

function atualizar(req, res) {
  const tarefa = Tarefa.atualizar(Number(req.params.id), req.body);
  if (!tarefa) return res.status(404).json({ erro: "Tarefa não encontrada" });
  res.json(tarefa);
}

function remover(req, res) {
  const removida = Tarefa.remover(Number(req.params.id));
  if (!removida) return res.status(404).json({ erro: "Tarefa não encontrada" });
  res.status(204).send();
}

module.exports = { listar, buscarUma, criar, atualizar, remover };
