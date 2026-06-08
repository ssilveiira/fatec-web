const produtos = [
  { nome: "Notebook", preco: 3500, categoria: "eletrônicos" },
  { nome: "Mouse", preco: 89.9, categoria: "eletrônicos" },
  { nome: "Cadeira Gamer", preco: 1200, categoria: "móveis" },
  { nome: "Monitor 24\"", preco: 950, categoria: "eletrônicos" },
  { nome: "Livro JS", preco: 65, categoria: "livros" },
];

const container = document.getElementById("container");
const btnFiltrar = document.getElementById("btn-filtrar");
const btnLimpar = document.getElementById("btn-limpar");
const btnAdicionar = document.getElementById("btn-adicionar");
const inputNome = document.getElementById("input-nome");
const inputPreco = document.getElementById("input-preco");
const inputCategoria = document.getElementById("input-categoria");

let filtrando = false;

function criarCard(produto) {
  const article = document.createElement("article");
  article.className = "card-produto";
  article.dataset.categoria = produto.categoria;
  article.innerHTML = `
    <h3>${produto.nome}</h3>
    <p class="preco">R$ ${produto.preco.toFixed(2)}</p>
    <span class="categoria">${produto.categoria}</span>
  `;
  return article;
}

function renderizarProdutos(lista) {
  container.innerHTML = "";
  lista.forEach((produto) => {
    container.appendChild(criarCard(produto));
  });
}

renderizarProdutos(produtos);

btnFiltrar.addEventListener("click", () => {
  filtrando = !filtrando;
  const cards = container.querySelectorAll(".card-produto");
  cards.forEach((card) => {
    if (filtrando && card.dataset.categoria !== "eletrônicos") {
      card.classList.add("oculto");
    } else {
      card.classList.remove("oculto");
    }
  });
  btnFiltrar.textContent = filtrando ? "Mostrar todos" : "Mostrar só eletrônicos";
});

btnLimpar.addEventListener("click", () => {
  container.innerHTML = "";
  filtrando = false;
  btnFiltrar.textContent = "Mostrar só eletrônicos";
});

btnAdicionar.addEventListener("click", () => {
  const nome = inputNome.value.trim();
  const preco = parseFloat(inputPreco.value);
  const categoria = inputCategoria.value.trim();

  if (!nome || isNaN(preco) || !categoria) return;

  const novoProduto = { nome, preco, categoria };
  produtos.push(novoProduto);
  container.appendChild(criarCard(novoProduto));

  inputNome.value = "";
  inputPreco.value = "";
  inputCategoria.value = "";
});
