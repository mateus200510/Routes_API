
var db      = require("../data/db");
var helpers = require("../helpers/response");


function getAlunos(req, res) {
  helpers.sendJson(res, 200, db.alunos);
}


function getAlunoPorId(req, res, url) {
  
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

//  Exercício
async function createAluno(req, res) {
  try {
    var body = await helpers.lerBody(req);

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

// Exercício 6
async function updateAluno(req, res, url) {
  try {
    var partes = url.split("/");
    var id     = Number(partes[2]);

    var index = db.alunos.findIndex(function(a) {
      return a.id === id;
    });

    if (index === -1) {
      return helpers.sendJson(res, 404, { erro: "Aluno com id " + id + " não encontrado" });
    }

    var body = await helpers.lerBody(req);

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

//  Exercício 7 
function deleteAluno(req, res, url) {
  var partes = url.split("/");
  var id     = Number(partes[2]);

  var index = db.alunos.findIndex(function(a) {
    return a.id === id;
  });

  if (index === -1) {
    return helpers.sendJson(res, 404, { erro: "Aluno com id " + id + " não encontrado" });
  }

  db.alunos.splice(index, 1);

  res.writeHead(204);
  res.end();
}

module.exports.getAlunos     = getAlunos;
module.exports.getAlunoPorId = getAlunoPorId;
module.exports.createAluno   = createAluno;
module.exports.updateAluno   = updateAluno;
module.exports.deleteAluno   = deleteAluno;
