<!-- Modelo Sequencial Usuário -->

@startuml
actor Usuario
boundary Sistema
entity usuarios
entity permissoes
entity materiais
entity requisicoes
entity materiais_requisicoes

Usuario -> Sistema : Acessa o sistema com email e senha
Sistema -> usuarios : Verifica se o email e a senha são válidos
usuarios -> Sistema : Retorna o id e a unidade_id do usuário
Sistema -> permissoes : Verifica se o usuário tem permissão para solicitar materiais
permissoes -> Sistema : Retorna o nome_permissao do usuário
alt nome_permissao = "solicitante"
    Sistema -> Usuario : Exibe a lista de materiais disponíveis
    Usuario -> Sistema : Seleciona um ou mais materiais e informa a quantidade desejada
    Sistema -> materiais : Verifica se a quantidade desejada é menor ou igual à quantidade_disponivel de cada material
    materiais -> Sistema : Retorna a quantidade_disponivel de cada material
    loop para cada material selecionado
        alt quantidade desejada <= quantidade_disponivel
            Sistema -> requisicoes : Cria uma nova requisição com o usuario_id, usuario_solicitante_id, usuario_solicitante_nome, horario_solicitacao, data_requisicao e status = "pendente"
            requisicoes -> Sistema : Retorna o id da requisição criada
            Sistema -> materiais_requisicoes : Cria um novo registro com o requisicao_id, material_id e qtde_quantidade_requisitada
            materiais_requisicoes -> Sistema : Confirma a criação do registro
            Sistema -> Usuario : Exibe uma mensagem de sucesso
        else
            Sistema -> Usuario : Exibe uma mensagem de erro
        end
    end
else
    Sistema -> Usuario : Exibe uma mensagem de acesso negado
end
@enduml

<!-- Modelo Sequencial para Solicitante -->

@startuml
actor Aprovador
boundary Sistema
entity usuarios
entity permissoes
entity materiais
entity requisicoes
entity materiais_requisicoes

Aprovador -> Sistema : Acessa o sistema com email e senha
Sistema -> usuarios : Verifica se o email e a senha são válidos
usuarios -> Sistema : Retorna o id e a unidade_id do aprovador
Sistema -> permissoes : Verifica se o aprovador tem permissão para aprovar requisições
permissoes -> Sistema : Retorna o nome_permissao do aprovador
alt nome_permissao = "aprovador"
    Sistema -> Usuario : Exibe a lista de requisições pendentes
    Aprovador -> Sistema : Seleciona uma requisição e informa se aprova ou rejeita
    Sistema -> requisicoes : Atualiza o status da requisição para "aprovada" ou "rejeitada"
    requisicoes -> Sistema : Confirma a atualização do status
    alt status = "aprovada"
        Sistema -> materiais_requisicoes : Consulta os materiais e as quantidades requisitadas
        materiais_requisicoes -> Sistema : Retorna os materiais e as quantidades requisitadas
        loop para cada material requisitado
            Sistema -> materiais : Atualiza a quantidade_disponivel do material, subtraindo a quantidade requisitada
            materiais -> Sistema : Confirma a atualização da quantidade_disponivel
        end
    end
    Sistema -> Aprovador : Exibe uma mensagem de sucesso
else
    Sistema -> Aprovador : Exibe uma mensagem de acesso negado
end
@enduml

