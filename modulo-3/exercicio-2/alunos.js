const alunos = [
  { nome: "Ana", nota1: 8, nota2: 7 },
  { nome: "Bruno", nota1: 5, nota2: 4 },
  { nome: "Carla", nota1: 9, nota2: 10 },
  { nome: "Diego", nota1: 6, nota2: 5 },
  { nome: "Eva", nota1: 3, nota2: 4 },
];

function calcularMedia(nota1, nota2) {
  return (nota1 + nota2) / 2;
}

const alunosComMedia = alunos.map((aluno) => ({
  ...aluno,
  media: calcularMedia(aluno.nota1, aluno.nota2),
}));

const aprovados = alunosComMedia.filter((aluno) => aluno.media >= 6);
const reprovados = alunosComMedia.filter((aluno) => aluno.media < 6);

const mediaGeral =
  alunosComMedia.reduce((acc, aluno) => acc + aluno.media, 0) /
  alunosComMedia.length;

const alunosOrdenados = [...alunosComMedia].sort((a, b) => b.media - a.media);

console.log("=== Todos os alunos (por média) ===");
alunosOrdenados.forEach((aluno) => {
  console.log(`${aluno.nome}: média ${aluno.media.toFixed(1)}`);
});

console.log("\n=== Aprovados ===");
aprovados.forEach((aluno) => {
  console.log(`${aluno.nome}: ${aluno.media.toFixed(1)}`);
});

console.log("\n=== Reprovados ===");
reprovados.forEach((aluno) => {
  console.log(`${aluno.nome}: ${aluno.media.toFixed(1)}`);
});

console.log(`\nMédia geral da turma: ${mediaGeral.toFixed(1)}`);
