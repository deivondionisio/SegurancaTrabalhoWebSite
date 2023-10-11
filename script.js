function adicionarLinha() {
  const tabela = document.getElementById("tabela-formulario").getElementsByTagName('tbody')[0];
  const primeiraLinha = tabela.rows[0];
  const novaLinha = tabela.insertRow(-1);

  for (let i = 0; i < primeiraLinha.cells.length; i++) {
      const coluna = novaLinha.insertCell(i);
      coluna.innerHTML = primeiraLinha.cells[i].innerHTML;
  }

  const botaoRemover = novaLinha.querySelector(".btn-danger");
  botaoRemover.onclick = function () {
      removerLinha(this);
  };

  // Adicione a classe "clicked" ao ícone para ativar o efeito de salto
  const icone = novaLinha.querySelector(".icon-container img");
  icone.classList.add("clicked");
}

function removerLinha(botao) {
  const linha = botao.parentNode.parentNode;
  const tabela = linha.parentNode;

  // Verifique se a linha a ser removida não é a primeira
  if (linha.rowIndex !== 1) {
      linha.parentNode.removeChild(linha);
  } else {
      // Exiba um alerta se o usuário tentar remover a primeira linha
      alert("Não é possível remover o item de solicitação atual.");
  }
}
