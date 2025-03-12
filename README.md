# Security Box

Frontend para a aplicação de gerenciamento de credenciais via teclado eletrônico. Nome do App: Security Box

**Desenvolvedores**: Otavio Murilo Rau

## Configuração do Ambiente  

Este projeto requer a configuração de variáveis de ambiente para o desenvolvimento local. Essas variáveis estão definidas no arquivo `dev-env.yml` e devem ser transferidas para um arquivo `.env.development` para garantir a execução correta. 

### Pré Requsitos
|Tecnologia|Versão|
|-|-|
|Node|v20|

## Primeiros Passos  

Para rodar o projeto localmente, você precisa criar um arquivo `.env.development` no diretório raiz e preenchê-lo com as variáveis necessárias.  

### Passo 1: Criar o arquivo `.env.development`  

No diretório raiz do seu projeto, crie um novo arquivo chamado `.env.development`.  

### Passo 2: Copiar Variáveis do `dev-env.yml`  

Abra o arquivo `dev-env.yml` e copie manualmente cada par chave-valor para o `.env.development`, garantindo o formato correto:  

- _Exemplo de modelo de escrita de .env_:

    ```env
    ...

    NEXTAUTH_UR=http://localhost:3000/api  
    ...
    ```

Essas são as regras para definir todas as variáveis:

- __NEXTAUTH_URL__: Url da aplicação, (http://localhost:3000);
- __NEXTAUTH_SECRET__: Hash usado pelo NextAuth para encriptar as transações internas, pode ser escolhido qualquer string;
- __BACKEND_URL__: Url do backend;

Cada variável do `dev-env.yml` deve ser convertida para o formato `.env`, onde as chaves são escritas em maiúsculas e os valores são atribuídos usando `=` sem espaços.

### Step 4: Instalação das dependências

Em um terminal dentro do diretório do projeto podemos rodar o comando para instalar essa dependências do projeto

```bash
npm install

```

### Step 3: Executar o Servidor de Desenvolvimento

Após configurar o arquivo `.env.development`, inicie o servidor de desenvolvimento local:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## Saiba Mais

Para aprender mais sobre Next.js, confira os seguintes recursos:

- [Documentação do Next.js ](https://nextjs.org/docs) - saiba mais sobre os recursos e API do Next.js.
- [Aprenda Next.js](https://nextjs.org/learn) - um tutorial interativo sobre Next.js.

Você também pode conferir o [repositório do Next.js no GitHub](https://github.com/vercel/next.js) - seu feedback e contribuições são bem-vindos!