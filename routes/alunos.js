// ============================================================
// routes/alunos.js — CRUD de alunos (Exercícios 2, 3, 5, 6, 7)
// ============================================================

var db      = require("../data/db");
var helpers = require("../helpers/response");

// ── Exercício 2 ─────────────────────────────────────────────
// GET /alunos  →  retorna todos os alunos em JSON
function getAlunos(req, res) {
  helpers.sendJson(res, 200, db.alunos);
}

// ── Exercício 3 ─────────────────────────────────────────────
// GET /alunos/:id  →  retorna um aluno pelo id, ou 404 se não existir
function getAlunoPorId(req, res, url) {
  // url = "/alunos/1"
  // split("/") = ["", "alunos", "1"]
  // posição [2] = "1"  →  Number("1") = 1
  var partes = url.split("/");
  var id     = Number(partes[2]);

  var aluno = db.alunos.find(function(a) {
    return a.id === id;
  });

  if (!aluno) {
    return helpers.sendJson(res, 404, { erro: "Aluno com id " + id + " não encontrado" });
  }

  helpers.sendJson(res, 200, aluno);
}

// ── Exercício 5 ─────────────────────────────────────────────
// POST /alunos  →  cadastra novo aluno; exige os campos "nome" e "turma"
async function createAluno(req, res) {
  try {
    var body = await helpers.lerBody(req);

    // Verifica se os campos obrigatórios foram enviados
    if (!body.nome || !body.turma) {
      return helpers.sendJson(res, 400, {
        erro: 'Campos obrigatórios ausentes: "nome" e "turma" são necessários',
      });
    }

    var novoAluno = {
      id:    db.getProximoId(),
      nome:  body.nome,
      turma: body.turma,
      curso: body.curso || "Desenvolvimento de Sistemas",
    };

    db.alunos.push(novoAluno);

    helpers.sendJson(res, 201, {
      mensagem: "Aluno cadastrado com sucesso",
      aluno: novoAluno,
    });
  } catch (err) {
    helpers.sendJson(res, 400, { erro: err.message });
  }
}

// ── Exercício 6 ─────────────────────────────────────────────
// PUT /alunos/:id  →  atualiza os dados de um aluno pelo id
async function updateAluno(req, res, url) {
  try {
    var partes = url.split("/");
    var id     = Number(partes[2]);

    // findIndex retorna a posição no array, ou -1 se não encontrar
    var index = db.alunos.findIndex(function(a) {
      return a.id === id;
    });

    if (index === -1) {
      return helpers.sendJson(res, 404, { erro: "Aluno com id " + id + " não encontrado" });
    }

    var body = await helpers.lerBody(req);

    // Atualiza só os campos que foram enviados no body
    if (body.nome)  db.alunos[index].nome  = body.nome;
    if (body.turma) db.alunos[index].turma = body.turma;
    if (body.curso) db.alunos[index].curso = body.curso;

    helpers.sendJson(res, 200, {
      mensagem: "Aluno atualizado",
      aluno: db.alunos[index],
    });
  } catch (err) {
    helpers.sendJson(res, 400, { erro: err.message });
  }
}

// ── Exercício 7 ─────────────────────────────────────────────
// DELETE /alunos/:id  →  remove o aluno do array; retorna 204 ou 404
function deleteAluno(req, res, url) {
  var partes = url.split("/");
  var id     = Number(partes[2]);

  var index = db.alunos.findIndex(function(a) {
    return a.id === id;
  });

  if (index === -1) {
    return helpers.sendJson(res, 404, { erro: "Aluno com id " + id + " não encontrado" });
  }

  // splice(posição, quantos remover) — remove 1 elemento na posição encontrada
  db.alunos.splice(index, 1);

  // 204 No Content — sucesso, mas sem corpo na resposta
  res.writeHead(204);
  res.end();
}

module.exports.getAlunos     = getAlunos;
module.exports.getAlunoPorId = getAlunoPorId;
module.exports.createAluno   = createAluno;
module.exports.updateAluno   = updateAluno;
module.exports.deleteAluno   = deleteAluno;
