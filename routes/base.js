
var helpers = require("../helpers/response");


function getRaiz(req, res) {
  helpers.sendJson(res, 200, {
    mensagem: "Bem-vindo ao servidor Node.js puro!",
    dica: "Tente /sobre ou /status",
  });
}

// GET /sobre  →  informações sobre o servidor
function getSobre(req, res) {
  helpers.sendJson(res, 200, {
    mensagem: "Este servidor foi criado sem Express.",
    tecnologia: "Node.js puro com módulo http",
    disciplina: "PW II - Desenvolvimento Web",
  });
}

// GET /status  →  estado atual do servidor
function getStatus(req, res) {
  helpers.sendJson(res, 200, {
    status: "ativo",
    horario: new Date().toISOString(),
    uptime: process.uptime().toFixed(0) + "s",
  });
}

// ── Exercício 9 ─────────────────────────────────────────────

// GET /pagina  →  retorna uma página HTML (Content-Type: text/html)
function getPagina(req, res) {
  var html = "<!DOCTYPE html>"
    + "<html lang='pt-BR'>"
    + "<head>"
    + "  <meta charset='UTF-8'>"
    + "  <title>Servidor Node</title>"
    + "  <style>"
    + "    body { font-family: Arial, sans-serif; max-width: 600px; margin: 40px auto; padding: 0 20px; }"
    + "    h1   { color: #2563eb; }"
    + "    li   { margin: 6px 0; }"
    + "  </style>"
    + "</head>"
    + "<body>"
    + "  <h1>Servidor Node.js Puro</h1>"
    + "  <p>Esta página foi gerada pelo servidor sem nenhum framework.</p>"
    + "  <ul>"
    + "    <li>GET /alunos — lista de alunos</li>"
    + "    <li>GET /produtos — lista de produtos</li>"
    + "    <li>GET /status — status do servidor</li>"
    + "  </ul>"
    + "</body>"
    + "</html>";

  helpers.sendHtml(res, html);
}

// GET /api/status  →  retorna JSON (Content-Type: application/json)
// Diferença do /pagina: o navegador recebe texto puro, não uma página formatada
function getApiStatus(req, res) {
  helpers.sendJson(res, 200, {
    api: "online",
    versao: "1.0.0",
    timestamp: new Date().toISOString(),
  });
}

module.exports.getRaiz      = getRaiz;
module.exports.getSobre     = getSobre;
module.exports.getStatus    = getStatus;
module.exports.getPagina    = getPagina;
module.exports.getApiStatus = getApiStatus;
