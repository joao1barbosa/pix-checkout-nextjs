# 💸 Desafio Next.js: Criação de Transação PIX

Este projeto foi desenvolvido para atender ao desafio de criar uma interface para consumir uma API de pagamentos (simulada via rota API interna), gerando uma transação PIX. A aplicação coleta dados do comprador, envia-os para o backend (middleware de autenticação) e exibe os detalhes do PIX (QR Code e Código Copia e Cola) em uma página de resultado separada, utilizando gerenciamento de estado via Context API.

## 💻 Tecnologias Utilizadas

| Categoria                   | Tecnologia                 | Uso Principal                                                                  |
| :-------------------------- | :------------------------- | :----------------------------------------------------------------------------- |
| **Framework Web**           | Next.js (v14+, App Router) | Servidor API (Middleware) e Frontend React.                                    |
| **Linguagem**               | TypeScript                 | Tipagem segura em todo o projeto.                                              |
| **Estilização**             | Tailwind CSS & Shadcn/ui   | Estilização rápida e componentes reutilizáveis.                                |
| **Requisições HTTP**        | Axios                      | Cliente HTTP para fazer requisições para a API de pagamentos (via middleware). |
| **Gerenciamento de Estado** | React Context API          | Passagem dos dados da transação entre páginas (Formulário -> Detalhes).        |
| **Geração de QR Code**      | `qrcode.react`             | Geração dinâmica do QR Code a partir do link/código PIX retornado pela API.    |
| **Ambiente**                | Docker / Docker Compose    | Build de produção otimizado (`standalone`) e fácil execução local.             |

## 🔒 Autenticação (Basic Auth)

Para proteger a chave secreta da API de pagamentos (`Basic Auth`), o projeto utiliza uma **Rota API interna (`/api/payments`)** como _middleware_. O frontend envia os dados para esta rota, que, por sua vez, faz a requisição para a API externa, mantendo a chave secreta no lado do servidor (variáveis de ambiente).

## Status do Deploy (Vercel)

O projeto está configurado para ser implantado na Vercel.

| Ambiente     | Status    | URL de Acesso                                         |
| :----------- | :-------- | :---------------------------------------------------- |
| **Produção** | ✅ Online | [Deploy](https://payevo-code-challenge-2.vercel.app/) |

## 🚀 Executando o Projeto Localmente

O projeto é configurado para ser executado de forma eficiente, sendo a execução via Docker Compose a forma preferível, pois abstrai a instalação de dependências e configura variáveis de ambiente em tempo de execução.

### Pré-requisitos

1.  **Node.js (v20+) & npm** (Opcional, se usar a Opção 2)
2.  **Docker** (Recomendado)

### 🔑 Configuração de Variáveis de Ambiente

Copie o arquivo `.env.example`, renomei-o como `.env` e configure as credenciais.

```ini
# .env

PAYMENT_API_BASE_URL="[A URL BASE DA SUA API DE PAGAMENTOS]"

PAYMENT_API_SECRET_KEY="sk_sua_chave_secreta_aqui"
```

### Opção 1: Execução com Docker Compose (Recomendado)

Utilize este método para construir a imagem de produção e iniciar o contêiner de forma isolada e otimizada.

1.  **Executar o Setup e a Aplicação:**
    O comando abaixo irá construir a imagem Next.js (payevo), injetar as variáveis de ambiente e iniciar o contêiner.

    ```bash
    docker compose up --build -d
    ```

2.  **Acesso:**
    A aplicação estará acessível em: `http://localhost:3000`

### Opção 2: Execução Manual com npm run dev

Use esta opção para desenvolvimento rápido e hot reloading.

1.  **Instalar Dependências:**

    ```bash
    npm install
    ```

2.  **Iniciar o Servidor de Desenvolvimento:**

    ```bash
    npm run dev
    ```

3.  **Acesso:**
    A aplicação estará acessível em: `http://localhost:3000`

---
