const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const alunoRoutes = require("./routes/alunoRoutes");
const authRoutes = require("./routes/authRoutes");
const autenticar = require("./middleware/autenticar");

const app = express();
const PORTA = process.env.PORT || 3000;

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/alunos", autenticar, alunoRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ erro: "Erro interno no servidor" });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado ao MongoDB Atlas");
    app.listen(PORTA, () =>
      console.log(`Servidor rodando em http://localhost:${PORTA}`)
    );
  })
  .catch((err) => console.error("Erro na conexão:", err));
