function logger(req, res, next) {
  const agora = new Date().toLocaleString("pt-BR");
  console.log(`[${agora}] ${req.method} ${req.url}`);
  next();
}

module.exports = logger;
