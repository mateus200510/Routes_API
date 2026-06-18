
function sendJson(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

function sendHtml(res, html) {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
}

function notFound(res) {
  sendJson(res, 404, { erro: "Rota não encontrada" });
}

function methodNotAllowed(res) {
  sendJson(res, 405, { erro: "Método HTTP não permitido para esta rota" });
}

 req.on("end")
function lerBody(req) {
  return new Promise(function(resolve, reject) {
    var corpo = "";

    
    req.on("data", function(chunk) {
      corpo = corpo + chunk;
    });

    
    req.on("end", function() {
      try {
        resolve(JSON.parse(corpo));
      } catch (erro) {
        reject(new Error("Body inválido: não é um JSON válido"));
      }
    });
  });
}

module.exports.sendJson         = sendJson;
module.exports.sendHtml         = sendHtml;
module.exports.notFound         = notFound;
module.exports.methodNotAllowed = methodNotAllowed;
module.exports.lerBody          = lerBody;
