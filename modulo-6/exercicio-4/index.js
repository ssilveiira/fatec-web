const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const alunoRoutes = require("./routes/alunoRoutes");

const app = express();
const PORTA = process.env.PORT || 3000;

app.use(express.json());
app.use("/alunos", alunoRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ erro: "Erro interno no servidor" });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado ao MongoDB Atlas");
    app.listen(PORTA, () =>
      console.log(`API rodando em http://localhost:${PORTA}`)
    );
  })
  .catch((err) => console.error("Erro ao conectar:", err));
