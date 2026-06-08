const fs = require("fs");
const http = require("http");
const { somar, formatarMoeda, calcularMedia } = require("./utils");

const resultadoSoma = somar(15, 27);
const valorFormatado = formatarMoeda(199.9);
const media = calcularMedia([7, 8, 9, 6]);

console.log(`Soma: ${resultadoSoma}`);
console.log(`Valor formatado: ${valorFormatado}`);
console.log(`Média: ${media}`);

const conteudo = `Resultados gerados em: ${new Date().toLocaleString("pt-BR")}
Soma (15 + 27): ${resultadoSoma}
Valor formatado: ${valorFormatado}
Média das notas [7, 8, 9, 6]: ${media}
`;

fs.writeFileSync("resultado.txt", conteudo, "utf8");
console.log("Arquivo resultado.txt gerado com sucesso!");

const servidor = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head><meta charset="UTF-8"><title>Servidor Node</title></head>
    <body>
      <h1>Servidor HTTP com Node.js</h1>
      <p>Soma (15 + 27): <strong>${resultadoSoma}</strong></p>
      <p>Valor: <strong>${valorFormatado}</strong></p>
      <p>Média: <strong>${media}</strong></p>
    </body>
    </html>
  `);
});

const PORTA = 3000;
servidor.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
