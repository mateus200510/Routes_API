// ============================================================
// data/db.js — Dados em memória (simulando um banco de dados)
// ============================================================

var alunos = [
  { id: 1, nome: "Ana Souza",   turma: "3DS-A", curso: "Desenvolvimento de Sistemas" },
  { id: 2, nome: "Bruno Lima",  turma: "3DS-A", curso: "Desenvolvimento de Sistemas" },
  { id: 3, nome: "Carla Melo",  turma: "2DS-B", curso: "Desenvolvimento de Sistemas" },
  { id: 4, nome: "Diego Rocha", turma: "2DS-B", curso: "Desenvolvimento de Sistemas" },
  { id: 5, nome: "Elena Costa", turma: "1DS-C", curso: "Desenvolvimento de Sistemas" },
];

var produtos = [
  { id: 1, nome: "Detergente",   categoria: "limpeza",   preco: 2.50  },
  { id: 2, nome: "Arroz 5kg",    categoria: "alimentos", preco: 22.90 },
  { id: 3, nome: "Sabão em Pó",  categoria: "limpeza",   preco: 8.75  },
  { id: 4, nome: "Feijão 1kg",   categoria: "alimentos", preco: 7.99  },
  { id: 5, nome: "Desinfetante", categoria: "limpeza",   preco: 4.30  },
  { id: 6, nome: "Caderno",      categoria: "papelaria", preco: 14.00 },
];

// Contador usado para gerar IDs únicos ao cadastrar novos alunos
var proximoId = 6;

function getProximoId() {
  proximoId = proximoId + 1;
  return proximoId;
}

module.exports.alunos      = alunos;
module.exports.produtos    = produtos;
module.exports.getProximoId = getProximoId;
