let perguntas = [];
let atual = 0;
let pontos = 0;
let respondeu = false;

const elInicio = document.getElementById("inicio");
const elQuiz = document.getElementById("quiz");
const elResultado = document.getElementById("resultado");
const elProgresso = document.getElementById("progresso");
const elPergunta = document.getElementById("pergunta");
const elOpcoes = document.getElementById("opcoes");
const btnIniciar = document.getElementById("btnIniciar");

async function buscarPerguntas() {
  const url =
    "https://tryvia.ptr.red/api.php?amount=10&type=multiple";
  try {
    const res = await fetch(url);
    const data = await res.json();
    perguntas = data.results;
  } catch (erro) {
    elPergunta.textContent = "Erro ao carregar perguntas. Tente novamente.";
    console.error("Erro:", erro);
  }
}

function embaralhar(array) {
  return array.sort(() => Math.random() - 0.5);
}

function getAlternativas(pergunta) {
  const todas = [...pergunta.incorrect_answers, pergunta.correct_answer];
  return embaralhar(todas);
}

function exibirPergunta() {
  respondeu = false;
  const p = perguntas[atual];
  const alternativas = getAlternativas(p);

  elProgresso.textContent = `${atual + 1} / ${perguntas.length}`;
  elPergunta.innerHTML = p.question;

  elOpcoes.innerHTML = "";
  alternativas.forEach((alt) => {
    const btn = document.createElement("button");
    btn.innerHTML = alt;
    btn.className = "opcao";
    elOpcoes.appendChild(btn);
  });
}

elOpcoes.addEventListener("click", (e) => {
  if (!e.target.classList.contains("opcao") || respondeu) return;
  respondeu = true;

  const resposta = e.target.innerHTML;
  const correta = perguntas[atual].correct_answer;

  document.querySelectorAll(".opcao").forEach((btn) => {
    btn.disabled = true;
  });

  if (resposta === correta) {
    pontos++;
    e.target.classList.add("correta");
  } else {
    e.target.classList.add("errada");
    document.querySelectorAll(".opcao").forEach((btn) => {
      if (btn.innerHTML === correta) btn.classList.add("correta");
    });
  }

  setTimeout(() => {
    atual++;
    if (atual < perguntas.length) {
      exibirPergunta();
    } else {
      exibirResultado();
    }
  }, 1200);
});

function exibirResultado() {
  elQuiz.hidden = true;
  elResultado.hidden = false;

  const total = perguntas.length;
  const pct = Math.round((pontos / total) * 100);

  let msg = "Continue praticando!";
  if (pct >= 80) msg = "Excelente! 🏆";
  else if (pct >= 60) msg = "Bom trabalho! 👏";

  elResultado.innerHTML = `
    <h2>${msg}</h2>
    <p>${pontos} de ${total} corretas (${pct}%)</p>
    <button id="btnReiniciar">Jogar novamente</button>
  `;

  document.getElementById("btnReiniciar").addEventListener("click", reiniciar);
}

async function reiniciar() {
  atual = 0;
  pontos = 0;
  respondeu = false;
  elResultado.hidden = true;
  elQuiz.hidden = false;
  elPergunta.textContent = "Carregando...";
  elOpcoes.innerHTML = "";
  await buscarPerguntas();
  exibirPergunta();
}

btnIniciar.addEventListener("click", async () => {
  elInicio.hidden = true;
  elQuiz.hidden = false;
  elPergunta.textContent = "Carregando perguntas...";
  await buscarPerguntas();
  exibirPergunta();
});
