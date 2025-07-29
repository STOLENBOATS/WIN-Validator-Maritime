
function validarWIN() {
  const win = document.getElementById('winInput').value.trim().toUpperCase();
  const resultadoDiv = document.getElementById('resultado');
  const detalhesDiv = document.getElementById('detalhes');
  resultadoDiv.innerHTML = '';
  detalhesDiv.innerHTML = '';

  const regexUE = /^[A-Z]{2}-[A-Z]{3}[A-Z0-9]{5}[A-HJ-NP-Z]{1}[0-9]{1}[0-9]{2}$/;
  const regexEUA = /^[A-Z]{2}-[A-Z]{3}[A-Z0-9]{7}[A-HJ-NP-Z]{1}[0-9]{1}[0-9]{2}$/;

  if (!regexUE.test(win) && !regexEUA.test(win)) {
    resultadoDiv.innerHTML = "<span style='color:red'>❌ WIN inválido</span>";
    guardarHistorico(win, "Inválido", "Formato não reconhecido");
    return;
  }

  const pais = win.substring(0, 2);
  const fabricante = win.substring(3, 6);
  const serie = win.substring(6, win.length - 6);
  const mes = win.charAt(win.length - 6);
  const anoProducao = win.charAt(win.length - 5);
  const anoModelo = win.substring(win.length - 2);

  const meses = {
    A: "Janeiro", B: "Fevereiro", C: "Março", D: "Abril", E: "Maio",
    F: "Junho", G: "Julho", H: "Agosto", J: "Setembro", K: "Outubro",
    L: "Novembro", M: "Dezembro", N: "Janeiro", P: "Fevereiro", R: "Março",
    S: "Abril", T: "Maio", U: "Junho", V: "Julho", W: "Agosto", X: "Setembro",
    Y: "Outubro", Z: "Novembro"
  };

  const paises = { FR: "🇫🇷 França", US: "🇺🇸 EUA", IT: "🇮🇹 Itália", PT: "🇵🇹 Portugal" };
  const fabricantes = { CNB: "CNB Yacht Builder", BEN: "Beneteau", JBO: "J-Boats" };

  const paisNome = paises[pais] || "Desconhecido";
  const fabricanteNome = fabricantes[fabricante] || "Desconhecido";
  const mesNome = meses[mes] || "Desconhecido";
  const anoReal = anoProducao >= 5 ? "20" + anoProducao : "19" + anoProducao;

  resultadoDiv.innerHTML = "<span style='color:green'>✅ WIN Válido</span>";
  detalhesDiv.innerHTML = `
    <table>
      <tr><th>Campo</th><th>Valor</th><th>Interpretação</th></tr>
      <tr><td>País</td><td>${pais}</td><td>${paisNome}</td></tr>
      <tr><td>Fabricante</td><td>${fabricante}</td><td>${fabricanteNome}</td></tr>
      <tr><td>Série</td><td>${serie}</td><td>Número de registo livre</td></tr>
      <tr><td>Mês produção</td><td>${mes}</td><td>${mesNome}</td></tr>
      <tr><td>Ano produção</td><td>${anoProducao}</td><td>${anoReal}</td></tr>
      <tr><td>Ano modelo</td><td>${anoModelo}</td><td>20${anoModelo}</td></tr>
    </table>
  `;

  guardarHistorico(win, "Válido", "Formato reconhecido e campos interpretados");
}

function guardarHistorico(win, resultado, justificacao) {
  const historico = JSON.parse(localStorage.getItem("historicoWIN") || "[]");
  const data = new Date().toLocaleString();
  historico.unshift({ data, win, resultado, justificacao, imagem: "—" });
  localStorage.setItem("historicoWIN", JSON.stringify(historico));
}

window.onload = function () {
  const tabela = document.getElementById("historicoTable");
  if (tabela) {
    const historico = JSON.parse(localStorage.getItem("historicoWIN") || "[]");
    const tbody = tabela.querySelector("tbody");
    historico.forEach(item => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${item.data}</td>
        <td>${item.win}</td>
        <td>${item.resultado}</td>
        <td>${item.justificacao}</td>
        <td>${item.imagem}</td>
      `;
      tbody.appendChild(tr);
    });
  }
};
