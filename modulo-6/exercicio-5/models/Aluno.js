const mongoose = require("mongoose");

const alunoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "Nome é obrigatório"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email é obrigatório"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    idade: { type: Number, min: 16 },
    curso: {
      type: String,
      required: [true, "Curso é obrigatório"],
      trim: true,
    },
    notas: { type: [Number], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Aluno", alunoSchema);
