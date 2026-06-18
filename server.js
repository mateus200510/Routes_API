// ============================================================
// server.js — Ponto de entrada do servidor (porta 3000)
// ============================================================

// Importa o módulo nativo "http" do Node.js
// Não precisa instalar nada — já vem com o Node
var http = require("http");

// Importa o módulo de rotas que criamos
// O ponto (.) significa "pasta atual"; depois entra em routes/router.js
var router = require("./routes/router");

// Define a porta onde o servidor vai escutar
var PORTA = 3000;

// Cria o servidor
// Toda vez que alguém faz uma requisição, o Node chama a função dentro do createServer
// req = informações do pedido (qual rota, qual método, body...)
// res = o objeto que usamos para enviar a resposta
var servidor = http.createServer(function(req, res) {
  // Repassa a requisição para o router, que decide o que fazer
  router.handleRoutes(req, res);
});

// Coloca o servidor para escutar na porta definida
// A função dentro do listen só roda uma vez, quando o servidor iniciar com sucesso
servidor.listen(PORTA, function() {
  console.log("Servidor rodando em http://localhost:" + PORTA);
  console.log("--------------------------------------");
  console.log("Rotas disponíveis:");
  console.log("  GET    /                    -> boas-vindas");
  console.log("  GET    /sobre               -> informações");
  console.log("  GET    /status              -> status do servidor");
  console.log("  GET    /pagina              -> página HTML");
  console.log("  GET    /api/status          -> status em JSON");
  console.log("  GET    /alunos              -> lista todos os alunos");
  console.log("  GET    /alunos/:id          -> busca aluno por id");
  console.log("  POST   /alunos              -> cadastra novo aluno");
  console.log("  PUT    /alunos/:id          -> atualiza aluno");
  console.log("  DELETE /alunos/:id          -> remove aluno");
  console.log("  GET    /produtos            -> lista todos os produtos");
  console.log("  GET    /produtos?categoria= -> filtra por categoria");
  console.log("--------------------------------------");
});
