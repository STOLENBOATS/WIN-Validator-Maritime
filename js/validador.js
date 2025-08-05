// Proteção de sessão (caso usado fora do HTML)
if (!localStorage.getItem('loggedInUser')) {
  window.location.href = 'login.html';
}

// Validação de número WIN
function validarWIN() {
  const input = document.getElementById('input-win').value.trim().toUpperCase();
  const resultado = document.getElementById('resultado-win');
  const dataHora = new Date().toLocaleString();
  let mensagem = '', valido = true;

  if (!/^[A-Z]{2}-[A-Z]{3}[A-Z0-9]{5}[A-Z][0-9][0-9]{2}$/.test(input)) {
    mensagem = 'Formato inválido. O número deve conter 14 caracteres (ex: FR-CNBZA135A612).';
    valido = false;
  } else {
    const campos = {
      pais: input.slice(0, 2),
      fabricante: input.slice(3, 6),
      serie: input.slice(6, 11),
      mes: input[11],
      ano: input[12],
      modelo: input.slice(13)
    };

    const meses = {
      A: 'Janeiro', B: 'Fevereiro', C: 'Março', D: 'Abril', E: 'Maio', F: 'Junho',
      G: 'Julho', H: 'Agosto', J: 'Setembro', K: 'Outubro', L: 'Novembro', M: 'Dezembro'
    };

    const paises = { FR: '🇫🇷 França', PT: '🇵🇹 Portugal', IT: '🇮🇹 Itália', ES: '🇪🇸 Espanha' };

    mensagem += `<strong>Resultado:</strong><br>`;
    mensagem += `<table><tr><th>Campo</th><th>Valor</th><th>Interpretação</th></tr>`;
    mensagem += `<tr><td>País</td><td>${campos.pais}</td><td>${paises[campos.pais] || 'Desconhecido'}</td></tr>`;
    mensagem += `<tr><td>Fabricante</td><td>${campos.fabricante}</td><td>${campos.fabricante}</td></tr>`;
    mensagem += `<tr><td>Série</td><td>${campos.serie}</td><td>Número de registo livre</td></tr>`;
    mensagem += `<tr><td>Mês</td><td>${campos.mes}</td><td>${meses[campos.mes] || 'Inválido'}</td></tr>`;
    mensagem += `<tr><td>Ano</td><td>${campos.ano}</td><td>20${campos.ano}</td></tr>`;
    mensagem += `<tr><td>Modelo</td><td>${campos.modelo}</td><td>Ano modelo 20${campos.modelo}</td></tr>`;
    mensagem += `</table>`;
  }

  resultado.innerHTML = mensagem;

  const historico = JSON.parse(localStorage.getItem('historicoWIN')) || [];
  historico.unshift({
    numero: input,
    data: dataHora,
    valido,
    justificacao: valido ? 'Formato e estrutura reconhecidos.' : mensagem,
    imagem: '' // espaço reservado
  });
  localStorage.setItem('historicoWIN', JSON.stringify(historico));
}

// Campos adaptativos para motores
function atualizarCamposMotor() {
  const marca = document.getElementById('marca-motor').value;
  const container = document.getElementById('campos-motor');
  container.innerHTML = '';

  if (marca === 'yamaha' || marca === 'honda') {
    container.innerHTML = `
      <label><strong>Modelo:</strong></label>
      <input type="text" id="modelo-motor" placeholder="F350NSA" />
      <label><strong>Código:</strong></label>
      <input type="text" id="codigo-motor" placeholder="6ML" />
      <label><strong>Número de Série:</strong></label>
      <input type="text" id="serie-motor" placeholder="1005843" />
    `;
  }
}

function validarMotor() {
  const marca = document.getElementById('marca-motor').value;
  const modelo = document.getElementById('modelo-motor')?.value.trim();
  const codigo = document.getElementById('codigo-motor')?.value.trim();
  const serie = document.getElementById('serie-motor')?.value.trim();
  const resultado = document.getElementById('resultado-motor');
  const dataHora = new Date().toLocaleString();

  if (!marca || !modelo || !codigo || !serie) {
    resultado.innerHTML = 'Preencha todos os campos do motor.';
    return;
  }

  let mensagem = `<strong>Resultado:</strong><br><table>`;
  mensagem += `<tr><th>Campo</th><th>Valor</th><th>Interpretação</th></tr>`;
  mensagem += `<tr><td>Marca</td><td>${marca}</td><td>${marca.toUpperCase()}</td></tr>`;
  mensagem += `<tr><td>Modelo</td><td>${modelo}</td><td>Modelo identificado</td></tr>`;
  mensagem += `<tr><td>Código</td><td>${codigo}</td><td>Código de fábrica</td></tr>`;
  mensagem += `<tr><td>Série</td><td>${serie}</td><td>Número de série atribuído</td></tr>`;
  mensagem += `</table>`;

  resultado.innerHTML = mensagem;

  const historico = JSON.parse(localStorage.getItem('historicoMotor')) || [];
  historico.unshift({
    marca,
    modelo,
    codigo,
    serie,
    data: dataHora,
    valido: true,
    justificacao: 'Número interpretado com base em regras da marca.',
    imagem: ''
  });
  localStorage.setItem('historicoMotor', JSON.stringify(historico));
}
