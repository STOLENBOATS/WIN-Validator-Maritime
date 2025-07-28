
function validarWIN() {
    const input = document.getElementById('winInput').value.trim();
    const output = document.getElementById('resultado');
    const detalhes = document.getElementById('detalhesValidacao');
    detalhes.innerHTML = '';

    let win = input.replace(/-/g, '');
    if (win.length !== 14 && win.length !== 16) {
        output.innerHTML = '<span class="invalid">❌ Formato inválido: Deve ter 14 ou 16 caracteres (ignorando hífen).</span>';
        return;
    }

    let valid = true;
    let detalhesTexto = '';

    // País
    const pais = win.substring(0, 2);
    if (!/^[A-Z]{2}$/.test(pais)) {
        valid = false;
        detalhesTexto += '<p class="invalid">País inválido</p>';
    } else {
        detalhesTexto += `<p class="valid">🇪🇺 País: ${pais}</p>`;
    }

    // Fabricante
    const fabricante = win.substring(2, 5);
    if (!/^[A-Z]{3}$/.test(fabricante)) {
        valid = false;
        detalhesTexto += '<p class="invalid">Fabricante inválido</p>';
    } else {
        detalhesTexto += `<p class="valid">🏭 Fabricante: ${fabricante}</p>`;
    }

    // Série
    const serie = win.substring(5, win.length === 14 ? 10 : 12);
    detalhesTexto += `<p class="valid">🔢 Série: ${serie}</p>`;

    // Mês
    const mes = win.charAt(win.length === 14 ? 10 : 12);
    if (!/^[A-HJ-NPR-Z]$/.test(mes)) {
        valid = false;
        detalhesTexto += '<p class="invalid">Mês inválido</p>';
    } else {
        detalhesTexto += `<p class="valid">🗓️ Mês: ${mes}</p>`;
    }

    // Ano
    const ano = win.charAt(win.length === 14 ? 11 : 13);
    if (!/^[0-9]$/.test(ano)) {
        valid = false;
        detalhesTexto += '<p class="invalid">Ano inválido</p>';
    } else {
        detalhesTexto += `<p class="valid">📅 Ano: 20${ano}</p>`;
    }

    const modelo = win.substring(win.length - 2);
    if (!/^[0-9]{2}$/.test(modelo)) {
        valid = false;
        detalhesTexto += '<p class="invalid">Ano do modelo inválido</p>';
    } else {
        detalhesTexto += `<p class="valid">⚙️ Ano do Modelo: 20${modelo}</p>`;
    }

    output.innerHTML = valid
        ? '<span class="valid">✅ WIN válido</span>'
        : '<span class="invalid">❌ WIN inválido</span>';

    detalhes.innerHTML = detalhesTexto;

    if (valid) {
        const historico = JSON.parse(localStorage.getItem('historicoWIN') || '[]');
        historico.push({
            data: new Date().toLocaleString(),
            win: input,
            resultado: 'Válido',
            justificacao: 'Formato e estrutura válidos.',
            foto: ''
        });
        localStorage.setItem('historicoWIN', JSON.stringify(historico));
    }
}

function carregarHistorico() {
    const historico = JSON.parse(localStorage.getItem('historicoWIN') || '[]');
    const tbody = document.querySelector('#tabelaHistorico tbody');
    if (!tbody) return;

    tbody.innerHTML = '';
    historico.forEach(entry => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${entry.data}</td>
            <td>${entry.win}</td>
            <td>${entry.resultado}</td>
            <td>${entry.justificacao}</td>
            <td><em>(foto reservada)</em></td>
        `;
        tbody.appendChild(tr);
    });
}
window.onload = carregarHistorico;
