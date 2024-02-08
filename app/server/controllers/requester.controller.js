// Importando os modelos necessários
const { User, Material, Request, MaterialRequest } = require('./models');

// Criando uma função assíncrona para executar o script
async function solicitanteScript() {
  try {
    // Buscando um usuário com o papel de solicitante
    const solicitante = await User.findOne({
      where: { permissionName: 'solicitante' }
    });
    // Verificando se o usuário existe
    if (solicitante) {
      // Exibindo os dados do usuário
      console.log(`Solicitante: ${solicitante.firstName} ${solicitante.lastName} (${solicitante.email})`);
      // Buscando todos os materiais disponíveis
      const materiais = await Material.findAll();
      // Verificando se há materiais disponíveis
      if (materiais.length > 0) {
        // Exibindo os materiais disponíveis
        console.log('Materiais disponíveis:');
        materiais.forEach(material => {
          console.log(`- ${material.name} (${material.type}): ${material.availableQuantity} unidades`);
        });
        // Selecionando um material aleatório para solicitar
        const material = materiais[Math.floor(Math.random() * materiais.length)];
        // Gerando uma quantidade aleatória para solicitar
        const quantidade = Math.ceil(Math.random() * material.availableQuantity);
        // Exibindo o material e a quantidade solicitados
        console.log(`Solicitando ${quantidade} unidades de ${material.name} (${material.type})`);
        // Criando uma nova requisição com os dados do solicitante, do material e da quantidade
        const requisicao = await Request.create({
          userId: solicitante.id,
          requesterId: solicitante.id,
          requesterName: `${solicitante.firstName} ${solicitante.lastName}`,
          requestTime: new Date(),
          requestDate: new Date(),
          status: 'pendente'
        });
        // Criando um novo registro na tabela de junção entre materiais e requisições
        const materialRequisicao = await MaterialRequest.create({
          requestId: requisicao.id,
          materialId: material.id,
          requestedQuantity: quantidade
        });
        // Exibindo uma mensagem de sucesso
        console.log('Requisição criada com sucesso!');
      } else {
        // Exibindo uma mensagem de erro
        console.log('Não há materiais disponíveis.');
      }
    } else {
      // Exibindo uma mensagem de erro
      console.log('Não há usuário com o papel de solicitante.');
    }
  } catch (error) {
    // Exibindo uma mensagem de erro
    console.log('Ocorreu um erro ao executar o script: ' + error.message);
  }
}

// Chamando a função assíncrona
solicitanteScript();
