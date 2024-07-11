# ecommerce-web-app

Projeto frontend desenvolvido para consumir backend desenvolvido para a cadeira de Serviços Web.

1. **Instalar dependencias**

```sh
npm install
```

2. **Configurar URL da API**
  Para fins didáticos, foi dispobilizado o arquivo "env", que pode ser renomeado para ".env".

  ```bash
  mv env .env
  ```

3. **Compilar o projeto para ambiente de desenvolvimento**

```sh
npm run dev
```

## Documentação do projeto
1. Foi utilizado o vue-router para fazer o roteamento dos caminhos. Além disso, em `/src/router/index.js` foi adicionado um "guard" de navegação global (beforeEach) que executa uma função antes de cada navegação. Essa função verifica se o usuário está autenticado ao tentar acessar qualquer rota, exceto a de login. Se o usuário não estiver autenticado, ele é redirecionado para a página de login.

2. Em `/src/views` temos as views `Cart, List, Login, Orders, Product`, respectivamente **Carrinho, listagem de produtos (se o usuário autenticado for admin, aparecerá um botão para cadastro de novos produtos), form de login, pedidos e detalhes do produto**

3. `/src/cadastro` encontramos a view `Produtos` responsável pelo cadastro de novos produtos.

4. Em `/src/App.vue` temos o layout padrão com header, onde os componentes mencionados à cima serão carregados, e como mencionado, utilizamos do vue-router para fazer o roteamento.

OBS: Utilizei da biblioteca "toast" para adicionar cards dinâmicos e também tailwind para estilização.
OBS2: Conforme mencionado na documentação da API desenvolvida para serviços web, o login pode ser feito através do e-mail `teste@gmail.com` e senha `teste123`.
