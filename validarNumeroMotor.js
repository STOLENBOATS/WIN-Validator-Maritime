function validarNumeroMotor(marca, numero) {
  if (!regrasMotor[marca]) {
    return {
      valido: false,
      mensagem: "Marca não suportada.",
      camposEsperados: [],
      descricao: "",
      notas: ""
    };
  }

  const regra = regrasMotor[marca];
  const regex = new RegExp(regra.regex);
  const valido = regex.test(numero);

  return {
    valido,
    mensagem: valido ? "Número de motor válido para " + marca : "Formato inválido para " + marca,
    camposEsperados: regra.camposEsperados,
    descricao: regra.descricao,
    notas: regra.notas
  };
}