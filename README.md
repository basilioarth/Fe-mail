# Fe-mail: The Festus Mail Server

## Introdução

Este trabalho tem como objetivo, utilizando WebServices no modelo REST, implementar um serviço de troca de mensagens simplificado. Tal aplicação envolve tanto a parte cliente quanto a parte servidora. Para o lado do servidor, uma API em NodeJS foi desenvolvida e ela disponibiliza as seguintes funcionalidades:

- Enviar mensagem
- Listar mensagens
- Apagar mensagem
- Abrir mensagem
- Encaminhar mensagem
- Responder mensagem

Para o desenvolvimento no lado clinte se utilizou JavaScript, HTML e CSS.

## Configurações

O único pré-requisito necessário parea a instalação da aplicação é ter uma versão do NodeJS instalada na máquina. Caso você precise, pode ter acesso à página de download do node clicando [aqui](https://nodejs.org/en/download/).

## Como usar

A arquitetura de diretórios da aplicação segue a seguinte estrutura:


    .
    ├── ...
    ├── src                    
    │   ├── back-end
    │   │   └── config
    │   │   └── data
    │   │   └── ...
    │   ├── front-end
    │   |   └── ...              
    └── ...
    
 Para colocar a API me funcionamento, execute a seguinte linha de comando no terminal ou prompt (observe o caminho necessário para se alcançar o arquivo):
 
 `src/back-end/config node config.js`
 
 Para ter acesso ao lado cliente da aplicação, basta abrir o arquivo `index.html` no navegador web de sua preferência. Para encontrar esse arquivo, basta percorrer o caminho: `src/front-end`. Para acessar as funcionalidades da aplicação através do clinte, os seguintes dados estão disponpiveis para autenticação:
 
 `email: weslley@email.com`
 
 `senha: weslley123`
 
 Caso queira analisar toda a dinâmica de funcionamento da aplicação, é possível trocar de usuário através da interface do lado cliente enquanto a aplicação está funcionando. Os dados de autenticação do outro usuário existente estão listados a seguir:

`email: festus@email.com`
 
 `senha: festus123`
 
 ## Como funciona
 
 Como mencionado anteriormente, a API disponibiliza um conjunto de seis funcionalidades. Tais funcionbalidades são providas através de rotas mapeadas na parte servidora da aplicação. Algumas rotas não estão diretamente ligadas com uma dessas funcionalidades específicas, mas servem para que a aplicação funcione da maneira desejada. Os detalhes de funcionamento da API são abordados a seguir.
 
 ### Autenticar usuário
 
 `url: http://127.0.0.1:300/user`
 `method: GET`
 
 Resumo:
 Tal rota recebe como parâmetro, através da prórpia url da requisição, o e-mail e a senha de um usuário já existente e retorna todos os seus dados. Rota acessada pela página login.html da parte cliente da aplicação.
 
 Parâmetros:
 - email de um usuário já existente
 - senha de um usuário já existente
 
 Retornos:
 - Dados do usuário encontrado. `STATUS: 200`
 - Estrutura vazia ao não encontrar usuário. `STATUS: 404`
 - "Requisição inválida" ao passar parâmetros inválidos. `STATUS 400` 

 ### Listar usuários
 
 `url: http://127.0.0.1:300/users`
 `method: GET`
 
 Resumo:
 Tal rota retorna todos os usuários exitentes da aplicação. Rota acessada pelas as telas que possuem a lista de usuários na parte cliente da aplicação.
 
 Parâmetros:
 - Rota sem parâmetros
 
 Retornos:
 - Lista com as informações de todos os usuários encontrados. `STATUS: 200`
 - Estrutura vazia ao não encontrar nenhum usuário. `STATUS: 404`
 
 ### Identificar usuário logado
 
 `url: http://127.0.0.1:300/current_user`
 `method: GET`
 
 Resumo:
 Tal rota retorna o usuário logado atualmente. Rota acessada pelas telas que possuem a lista de usuários na parte cliente da aplicação.
 
 Parâmetros:
 - Rota sem parâmetros
 
 Retornos:
 - Lista com as informações do usuário logado atualmente. `STATUS: 200`
 - Estrutura vazia ao não encontrar usuário. `STATUS: 404`
 
 ### Listar mensagens recebidas
 
 `url: http://127.0.0.1:300/emails-recieved`
 `method: GET`
 
 Resumo:
 Tal rota retorna todos os e-mails recebidos por um usuário. Essa rota é acessada pela página inbox.html no lado do cliente.
 
 Parâmetros:
 - E-mail de um usuário
 
 Retornos:
 - Lista com todos os e-mails encontrados `STATUS: 200`
 - Estrutura vazia ao não encontrar nenhum e-mail. `STATUS: 404`
 - "Requisição inválida" ao passar parâmetros inválidos. `STATUS 400`

 ### Listar mensagens enviadas
 
 `url: http://127.0.0.1:300/emails-sended`
 `method: GET`
 
 Resumo:
 Tal rota retorna todos os e-mails enviados por um usuário. Essa rota é acessada pela página sent.html no lado do cliente.
 
 Parâmetros:
 - E-mail de um usuário
 
 Retornos:
 - Lista com todos os e-mails encontrados `STATUS: 200`
 - Estrutura vazia ao não encontrar nenhum e-mail. `STATUS: 404`
 - "Requisição inválida" ao passar parâmetros inválidos. `STATUS 400`
 
 ### Resgatar um email
 
 `url: http://127.0.0.1:300/email`
 `method: GET`
 
 Resumo:
 Tal rota retorna todos os dados do e-mail requisitado. Essa rota é acessada pela página message.html no lado do cliente.
 
 Parâmetros:
 - E-mail de um usuário
 - Identificador do e-mail a ser resgatado
 - A "classe" do e-mail a ser resgatado ("enviado" ou "recebdido")
 
 Retornos:
 - Lista todos os dados do e-mail encontrado `STATUS: 200`
 - Estrutura vazia ao não encontrar o e-mail. `STATUS: 404`
 - "Requisição inválida" ao passar parâmetros inválidos. `STATUS 400`
 
 ### Definir usuário logado
 
 `url: http://127.0.0.1:300/current_user`
 `method: POST`
 
 Resumo:
 Tal rota passa, através do corpo da requisição, todos os dados de um usuário e o define como o usuário atualmente logado na aplicação. A rota é acessada pela página login.html no lado do cliente.
 
 Parâmetros:
 - Rota sem parâmetros
 
 Retornos:
 - Lista com todos os dados do arquivo emails.json `STATUS: 200`
 
 ### Enviar, Responder e Encaminhar mensagem
 
 `url: http://127.0.0.1:300/send`
 `method: POST`
 
 Resumo:
Tal rota passa, através do corpo da requisição, os dados do novo e-mail a ser criado. Esses dados são: o nome do usuário responsável pela criação do novo e-mail, o e-mail desse usuário, o e-mail do usuário destinatário, o assunto do e-mail, a mensagem do e-mail e o tipo do e-mail. O tipo é o que vai defenir se esse novo e-mail se trata de um novo envio, de uma resposta a um e-mail já existente ou um encaminhamento de um e-mail já existente. Então, independente de que tipo seja o e-mail, ele é considerado como um novo e-mail para a aplicação. Os dados id e data são definidos por cálculos realizados dentro da própria API. A rota é acessada pela página message.html no lado do cliente.
 
 Parâmetros:
 - Rota sem parâmetros
 
 Retornos:
 - Lista com todos os dados do arquivo emails.json `STATUS: 200`
 
 ### Deletar mensagem
 
 `url: http://127.0.0.1:300/delete`
 `method: DELETE`
 
 Resumo:
 Tal rota apaga todos os dados do e-mail informado. Vale informar que cada e-mail é considerado de maneira indepente. Isso significa que o e-mail excluído não interfere na existência dos outros e-mails já registrados, independente da sua ligação com eles (relação de resposta ou encaminhamento). Além disso, a exclusão se delimita aos emails de um único usuário. Sendo assim, um usuário não pode remover um e-mail que pertence à lista de e-mails de outro usuário, indepente de que tipo é esse e-mail (envio, resposta ou encaminhamento). Essa rota é acessada pela página message.html no lado do cliente.
 
 Parâmetros:
 - E-mail de um usuário
 - Identificador do e-mail a ser apagado
 - A "classe" do e-mail a ser apagado ("enviado" ou "recebido")
 
 Retornos:
 - Estrutura vazia ao exluir o email informado `STATUS: 200`
 - Estrutura vazia ao não encontrar o e-mail. `STATUS: 404`
 - "Requisição inválida" ao passar parâmetros inválidos. `STATUS 400`
