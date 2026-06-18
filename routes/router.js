

var base    = require("./base");
var alunos  = require("./alunos");
var produtos = require("./produtos");
var helpers = require("../helpers/response");


var rotasExatas = {
  "/": {
    GET: base.getRaiz,
  },
  "/sobre": {
    GET: base.getSobre,
  },
  "/status": {
    GET: base.getStatus,
  },
  "/alunos": {
    GET:  alunos.getAlunos,
    POST: alunos.createAluno,
  },
  "/pagina": {
    GET: base.getPagina,
  },
  "/api/status": {
    GET: base.getApiStatus,
  },
};

// ── Rotas com parâmetro dinâmico ─────────────────────────────
// Quando a URL tem um id no caminho: /alunos/3, /alunos/99, etc.
function rotaDinamica(url, method, req, res) {

  // Verifica se a URL começa com "/alunos/" (com a barra no final)
  if (url.startsWith("/alunos/")) {
    if (method === "GET")    return alunos.getAlunoPorId(req, res, url);
    if (method === "PUT")    return alunos.updateAluno(req, res, url);
    if (method === "DELETE") return alunos.deleteAluno(req, res, url);

    // Exercício 10: caminho /alunos/:id existe, mas o método não é permitido
    return helpers.methodNotAllowed(res);
  }

  if (url.startsWith("/produtos")) {
    if (method === "GET") return produtos.getProdutos(req, res);

    // Exercício 10: /produtos existe mas não aceita outros métodos
    return helpers.methodNotAllowed(res);
  }

  // Nenhuma rota bateu → 404
  helpers.notFound(res);
}

// ── Exercício 8: dispatcher principal ───────────────────────
// O createServer chama apenas esta função.
// Ela decide para onde a requisição vai.
function handleRoutes(req, res) {
  // Remove a query string do caminho para comparar corretamente
  // Ex.: "/produtos?categoria=limpeza" → "/produtos"
  var partes  = req.url.split("?");
  var caminho = partes[0];
  var method  = req.method;

  // 1. Tenta encontrar o caminho na tabela de rotas exatas
  if (rotasExatas[caminho]) {
    var handlers = rotasExatas[caminho];

    // Caminho existe, mas o método HTTP não é aceito → 405
    if (!handlers[method]) {
      return helpers.methodNotAllowed(res);
    }

    // Chama a função correta para esse caminho + método
    return handlers[method](req, res);
  }

  // 2. Tenta encontrar nas rotas com parâmetro (/alunos/3, etc.)
  rotaDinamica(caminho, method, req, res);
}

module.exports.handleRoutes = handleRoutes;
