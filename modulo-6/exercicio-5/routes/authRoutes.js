const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

router.post("/registrar", async (req, res) => {
  try {
    const { nome, email, senha, role } = req.body;
    const usuario = await Usuario.create({ nome, email, senha, role });
    res.status(201).json({ mensagem: "Usuário criado com sucesso", id: usuario._id });
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(401).json({ erro: "Credenciais inválidas" });

    const senhaCorreta = await usuario.verificarSenha(senha);
    if (!senhaCorreta) return res.status(401).json({ erro: "Credenciais inválidas" });

    const token = jwt.sign(
      { id: usuario._id, role: usuario.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, role: usuario.role });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;
