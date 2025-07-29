function validarNumeroWIN(win) {
  const original = win;
  win = win.replace(/-/g, "").trim().toUpperCase();

  const resposta = {
    valido: false,
    mensagem: "",
    campos: []
  };

  if (win.length !== 14 && win.length !== 16) {
    resposta.mensagem = "Número WIN inválido: deve ter 14 ou 16 caracteres (excluindo hífen).";
    return resposta;
  }

  const pais = win.slice(0, 2);
  const fabricante = win.slice(2, 5);

  if (/\d/.test(pais) || /\d/.test(fabricante)) {
    resposta.mensagem = "Código de país ou fabricante inválido: não pode conter números.";
    return resposta;
  }

  const serieLivre = win.length === 14 ? win.slice(5, 10) : win.slice(5, 12);
  const mesLetra = win.length === 14 ? win[10] : win[12];
  const anoNumero = win.length === 14 ? win[11] : win[13];
  const modelo = win.length === 14 ? win.slice(12, 14) : win.slice(14, 16);

  const meses = {
    A: "Janeiro", B: "Fevereiro", C: "Março", D: "Abril",
    E: "Maio", F: "Junho", G: "Julho", H: "Agosto",
    J: "Setembro", K: "Outubro", L: "Novembro", M: "Dezembro",
    N: "Reservado", P: "Reservado", R: "Reservado", S: "Reservado",
    T: "Reservado", U: "Reservado", V: "Reservado", W: "Reservado",
    X: "Reservado", Y: "Reservado", Z: "Reservado"
  };

  if (!meses[mesLetra] || ["I", "O", "Q"].includes(mesLetra)) {
    resposta.mensagem = "Letra do mês inválida.";
    return resposta;
  }

  if (!/^[0-9]$/.test(anoNumero)) {
    resposta.mensagem = "Ano de produção inválido.";
    return resposta;
  }

  if (!/^[0-9]{2}$/.test(modelo)) {
    resposta.mensagem = "Ano do modelo inválido.";
    return resposta;
  }

  resposta.valido = true;
  resposta.mensagem = "Número WIN válido. Interpretação abaixo:";

  resposta.campos.push({
    nome: "País",
    valor: pais,
    interpretacao: pais === "FR" ? "🇫🇷 França" : pais
  });
  resposta.campos.push({
    nome: "Fabricante",
    valor: fabricante,
    interpretacao: fabricante === "CNB" ? "CNB Yacht Builder" : fabricante
  });
  resposta.campos.push({
    nome: "Série",
    valor: serieLivre,
    interpretacao: "Número de registo livre"
  });
  resposta.campos.push({
    nome: "Mês de produção",
    valor: mesLetra,
    interpretacao: meses[mesLetra]
  });
  resposta.campos.push({
    nome: "Ano de produção",
    valor: anoNumero,
    interpretacao: "200" + anoNumero
  });
  resposta.campos.push({
    nome: "Ano do modelo",
    valor: modelo,
    interpretacao: "20" + modelo
  });

  return resposta;
}