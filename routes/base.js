
var helpers = require("../helpers/response");


function getRaiz(req, res) {
  helpers.sendJson(res, 200, {
    mensagem: "Bem-vindo ao meu servidor Rafael",
    dica: "Tente /sobre ou /status",
  });
}

function getSobre(req, res) {
  helpers.sendJson(res, 200, {
    mensagem: "Criado por Perninha.",
    tecnologia: "Node.js puro com módulo http",
    disciplina: "PW II - Desenvolvimento Web",
  });
}

function getStatus(req, res) {
  helpers.sendJson(res, 200, {
    status: "ativo",
    horario: new Date().toISOString(),
    uptime: process.uptime().toFixed(0) + "s",
  });
}

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
module.exports.getApiStatus = getApiStatus;
