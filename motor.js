
function mostrarCampos() {
  const marca = document.getElementById("marca").value;
  const div = document.getElementById("camposMarca");
  const resultado = document.getElementById("resultadoMotor");
  resultado.innerHTML = '';

  let html = "";

  switch (marca) {
    case "mercury":
      html = `
        <label>S/N (Mercury):</label>
        <input type="text" id="snMercury" placeholder="Ex: 1B234567"><br>
        <button onclick="validarMercury()">Validar</button>
      `;
      break;
    case "yamaha":
      html = `
        <label>Prefixo:</label>
        <input type="text" id="prefixoYamaha" placeholder="Ex: 6DV"><br>
        <label>Veio (S/L/X):</label>
        <input type="text" id="veioYamaha" placeholder="Ex: X"><br>
        <label>Serial:</label>
        <input type="text" id="serialYamaha" placeholder="Ex: 1012820"><br>
        <button onclick="validarYamaha()">Validar</button>
      `;
      break;
    case "suzuki":
      html = `
        <label>Core plug ou Sticker:</label>
        <input type="text" id="snSuzuki" placeholder="Ex: 12345678"><br>
        <button onclick="validarSuzuki()">Validar</button>
      `;
      break;
    case "honda":
      html = `
        <label>S/N no eixo:</label>
        <input type="text" id="snEixoHonda"><br>
        <label>S/N no bloco:</label>
        <input type="text" id="snBlocoHonda"><br>
        <button onclick="validarHonda()">Validar</button>
      `;
      break;
    case "volvo":
      html = `
        <label>S/N (Volvo Penta):</label>
        <input type="text" id="snVolvo" placeholder="Ex: A123456"><br>
        <button onclick="validarVolvo()">Validar</button>
      `;
      break;
    default:
      html = "";
  }

  div.innerHTML = html;
}

function validarMercury() {
  const sn = document.getElementById("snMercury").value.trim().toUpperCase();
  const res = document.getElementById("resultadoMotor");
  const valid = /^[0-3][A-Z][0-9]{6}$/.test(sn);
  res.innerHTML = valid ? "✅ Mercury: Número válido" : "❌ Número inválido para Mercury/Mariner";
}

function validarYamaha() {
  const prefixo = document.getElementById("prefixoYamaha").value.trim().toUpperCase();
  const veio = document.getElementById("veioYamaha").value.trim().toUpperCase();
  const serial = document.getElementById("serialYamaha").value.trim();
  const res = document.getElementById("resultadoMotor");

  const prefixoOK = /^[0-9A-Z]{3}$/.test(prefixo);
  const veioOK = /^[SLX]$/.test(veio);
  const serialOK = /^[0-9]{5,7}$/.test(serial);

  if (prefixoOK && veioOK && serialOK) {
    res.innerHTML = "✅ Yamaha: Número válido";
  } else {
    res.innerHTML = "❌ Número inválido para Yamaha";
  }
}
