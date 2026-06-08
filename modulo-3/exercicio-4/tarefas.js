const form = document.getElementById("form-tarefa");
const inputTarefa = document.getElementById("input-tarefa");
const lista = document.getElementById("lista-tarefas");
const busca = document.getElementById("busca");

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function salvarLocalStorage() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function renderizarTarefas(filtro = "") {
  lista.innerHTML = "";
  const tarefasFiltradas = tarefas.filter((t) =>
    t.texto.toLowerCase().includes(filtro.toLowerCase())
  );
  tarefasFiltradas.forEach((tarefa, index) => {
    const li = document.createElement("li");
    li.className = tarefa.concluida ? "concluida" : "";
    li.dataset.index = index;
    li.innerHTML = `
      <span>${tarefa.texto}</span>
      <button class="btn-remover">✕</button>
    `;
    lista.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const texto = inputTarefa.value.trim();
  if (!texto) return;
  tarefas.push({ texto, concluida: false });
  salvarLocalStorage();
  renderizarTarefas();
  inputTarefa.value = "";
});

lista.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;
  const index = Number(li.dataset.index);

  if (e.target.classList.contains("btn-remover")) {
    tarefas.splice(index, 1);
  } else {
    tarefas[index].concluida = !tarefas[index].concluida;
  }

  salvarLocalStorage();
  renderizarTarefas(busca.value);
});

busca.addEventListener("input", () => {
  renderizarTarefas(busca.value);
});

renderizarTarefas();
