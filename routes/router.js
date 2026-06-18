

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

function rotaDinamica(url, method, req, res) {

  if (url.startsWith("/alunos/")) {
    if (method === "GET")    return alunos.getAlunoPorId(req, res, url);
    if (method === "PUT")    return alunos.updateAluno(req, res, url);
    if (method === "DELETE") return alunos.deleteAluno(req, res, url);

    return helpers.methodNotAllowed(res);
  }

  if (url.startsWith("/produtos")) {
    if (method === "GET") return produtos.getProdutos(req, res);

    return helpers.methodNotAllowed(res);
  }

  helpers.notFound(res);
}

//  Exercício 8: 
function handleRoutes(req, res) {
  var partes  = req.url.split("?");
  var caminho = partes[0];
  var method  = req.method;

  if (rotasExatas[caminho]) {
    var handlers = rotasExatas[caminho];

    if (!handlers[method]) {
      return helpers.methodNotAllowed(res);
    }

    return handlers[method](req, res);
  }

  rotaDinamica(caminho, method, req, res);
}

module.exports.handleRoutes = handleRoutes;
