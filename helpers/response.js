// ============================================================
// helpers/response.js — Funções auxiliares de resposta (Ex. 8)
// ============================================================

// Envia JSON com o status HTTP escolhido e encerra a resposta
function sendJson(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

// Envia HTML e encerra a resposta
function sendHtml(res, html) {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
}

// Resposta padrão quando a rota não existe (404)
function notFound(res) {
  sendJson(res, 404, { erro: "Rota não encontrada" });
}

// Resposta padrão quando o método HTTP não é permitido (405)
function methodNotAllowed(res) {
  sendJson(res, 405, { erro: "Método HTTP não permitido para esta rota" });
}

// Lê o corpo (body) da requisição e devolve um objeto JavaScript
// O body chega em pedaços (chunks), por isso usamos req.on("data") e req.on("end")
function lerBody(req) {
  return new Promise(function(resolve, reject) {
    var corpo = "";

    // Cada vez que chega um pedaço do body, junta na variável corpo
    req.on("data", function(chunk) {
      corpo = corpo + chunk;
    });

    // Quando terminar de receber, converte o texto para objeto JavaScript
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
