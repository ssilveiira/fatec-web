let tarefas = [];
let proximoId = 1;

function listarTodas() {
  return tarefas;
}

function buscarPorId(id) {
  return tarefas.find((t) => t.id === id);
}

function criar(titulo, descricao = "") {
  const novaTarefa = {
    id: proximoId++,
    titulo,
    descricao,
    concluida: false,
    criadaEm: new Date().toISOString(),
  };
  tarefas.push(novaTarefa);
  return novaTarefa;
}

function atualizar(id, dados) {
  const index = tarefas.findIndex((t) => t.id === id);
  if (index === -1) return null;
  tarefas[index] = { ...tarefas[index], ...dados };
  return tarefas[index];
}

function remover(id) {
  const index = tarefas.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tarefas.splice(index, 1);
  return true;
}

module.exports = { listarTodas, buscarPorId, criar, atualizar, remover };
