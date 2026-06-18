

var db      = require("../data/db");
var helpers = require("../helpers/response");


function getProdutos(req, res) {
  
  var urlCompleta = new URL(req.url, "http://" + req.headers.host);
  var categoria   = urlCompleta.searchParams.get("categoria"); 

  var resultado;

  if (categoria) {
    
    resultado = db.produtos.filter(function(p) {
      return p.categoria === categoria;
    });

    if (resultado.length === 0) {
      return helpers.sendJson(res, 404, {
        erro: 'Nenhum produto encontrado na categoria "' + categoria + '"',
      });
    }
  } else {
    resultado = db.produtos;
  }

  helpers.sendJson(res, 200, resultado);
}

module.exports.getProdutos = getProdutos;
