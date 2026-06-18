// ============================================================
// routes/produtos.js — Listagem com query string (Exercício 4)
// ============================================================

var db      = require("../data/db");
var helpers = require("../helpers/response");

// GET /produtos             →  retorna todos os produtos
// GET /produtos?categoria=X →  retorna só os da categoria informada
function getProdutos(req, res) {
  // new URL lê a URL completa e separa o caminho dos parâmetros
  // Ex.: "/produtos?categoria=limpeza"
  //   urlCompleta.pathname      = "/produtos"
  //   urlCompleta.searchParams  = { categoria: "limpeza" }
  var urlCompleta = new URL(req.url, "http://" + req.headers.host);
  var categoria   = urlCompleta.searchParams.get("categoria"); // null se não enviado

  var resultado;

  if (categoria) {
    // Filtra só os produtos que têm a categoria igual ao valor recebido
    resultado = db.produtos.filter(function(p) {
      return p.categoria === categoria;
    });

    if (resultado.length === 0) {
      return helpers.sendJson(res, 404, {
        erro: 'Nenhum produto encontrado na categoria "' + categoria + '"',
      });
    }
  } else {
    // Nenhuma categoria informada → devolve tudo
    resultado = db.produtos;
  }

  helpers.sendJson(res, 200, resultado);
}

module.exports.getProdutos = getProdutos;
