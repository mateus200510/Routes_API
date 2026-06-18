const http = require("http");
const { handleRoutes } = require("./routes/router");

const PORT = 3000;

const routes = [
  "GET /                    -> boas-vindas",
  "GET /sobre               -> informações",
  "GET /status              -> status do servidor",
  "GET /pagina              -> página HTML",
  "GET /api/status          -> status em JSON",
  "GET /alunos              -> lista todos os alunos",
  "GET /alunos/:id          -> busca aluno por id",
  "POST /alunos              -> cadastra novo aluno",
  "PUT /alunos/:id          -> atualiza aluno",
  "DELETE /alunos/:id          -> remove aluno",
  "GET /produtos            -> lista todos os produtos",
  "GET /produtos?categoria= -> filtra por categoria",
];

const server = http.createServer(handleRoutes);
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log("Rotas disponíveis:");
  routes.forEach((route) => console.log("  " + route));
  console.log("--------------------------------------");
});
