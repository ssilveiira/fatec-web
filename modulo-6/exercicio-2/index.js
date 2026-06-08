const express = require("express");
const tarefaRoutes = require("./routes/tarefaRoutes");
const logger = require("./middleware/logger");

const app = express();
const PORTA = 3000;

app.use(express.json());
app.use(logger);
app.use(express.static("public"));

app.use("/tarefas", tarefaRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ erro: "Erro interno no servidor" });
});

app.listen(PORTA, () => {
  console.log(`API rodando em http://localhost:${PORTA}`);
});
