function somar(a, b) {
  return a + b;
}

function formatarMoeda(valor) {
  return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}

function calcularMedia(notas) {
  if (!notas.length) return 0;
  const soma = notas.reduce((acc, n) => acc + n, 0);
  return soma / notas.length;
}

module.exports = { somar, formatarMoeda, calcularMedia };
