const input = document.getElementById("input-pokemon");
const btnBuscar = document.getElementById("btn-buscar");
const btnAnterior = document.getElementById("btn-anterior");
const btnProximo = document.getElementById("btn-proximo");
const mensagem = document.getElementById("mensagem");
const card = document.getElementById("card");
const imgPokemon = document.getElementById("img-pokemon");
const nomePokemon = document.getElementById("nome-pokemon");
const tiposPokemon = document.getElementById("tipos-pokemon");
const statsPokemon = document.getElementById("stats-pokemon");

let idAtual = null;

async function buscarPokemon(nomeOuId) {
  mensagem.textContent = "Carregando...";
  card.style.display = "none";

  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${String(nomeOuId).toLowerCase()}`
    );

    if (!res.ok) throw new Error("Pokémon não encontrado");

    const data = await res.json();
    idAtual = data.id;

    imgPokemon.src =
      data.sprites.other["official-artwork"].front_default ||
      data.sprites.front_default;
    imgPokemon.alt = data.name;
    nomePokemon.textContent = `#${data.id} ${data.name}`;

    tiposPokemon.innerHTML = data.types
      .map(
        (t) =>
          `<span class="tipo tipo-${t.type.name}">${t.type.name}</span>`
      )
      .join("");

    statsPokemon.innerHTML = data.stats
      .map(
        (s) => `
        <div class="stat">
          <label>${s.stat.name}: ${s.base_stat}</label>
          <div class="stat-bar">
            <div class="stat-fill" style="width: ${Math.min(s.base_stat, 150) / 1.5}%"></div>
          </div>
        </div>`
      )
      .join("");

    mensagem.textContent = "";
    card.style.display = "block";
  } catch {
    mensagem.textContent = "Pokémon não encontrado. Tente outro nome ou número.";
  }
}

btnBuscar.addEventListener("click", () => {
  const valor = input.value.trim();
  if (valor) buscarPokemon(valor);
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") btnBuscar.click();
});

btnAnterior.addEventListener("click", () => {
  if (idAtual && idAtual > 1) buscarPokemon(idAtual - 1);
});

btnProximo.addEventListener("click", () => {
  if (idAtual) buscarPokemon(idAtual + 1);
});
