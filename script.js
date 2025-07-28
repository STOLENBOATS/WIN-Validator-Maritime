
function validarWIN() {
  const win = document.getElementById("winInput").value;
  let resultado = "Válido"; // Apenas exemplo
  let justificacao = "Exemplo de validação correta";
  document.getElementById("resultadoValidacao").innerText = "Número WIN válido!";

  // Guardar no histórico
  const historico = JSON.parse(localStorage.getItem("historico")) || [];
  historico.push({
    data: new Date().toLocaleString(),
    win,
    resultado,
    justificacao,
    foto: ""
  });
  localStorage.setItem("historico", JSON.stringify(historico));
}

function carregarHistorico() {
  const historico = JSON.parse(localStorage.getItem("historico")) || [];
  const tabela = document.getElementById("historicoTable").querySelector("tbody");
  historico.forEach(reg => {
    const row = tabela.insertRow();
    row.innerHTML = `
      <td>${reg.data}</td>
      <td>${reg.win}</td>
      <td>${reg.resultado}</td>
      <td>${reg.justificacao}</td>
      <td>${reg.foto || "—"}</td>
    `;
  });
}
