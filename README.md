# 🃏 Truco Manager

Um gerenciador completo de partidas de truco desenvolvido como trabalho final da disciplina de Tópicos Especiais em Desenvolvimento de Software na graduação em Análise e Desenvolvimento de Sistemas na Universidade de Passo Fundo (UPF).

## 📋 Descrição

Sistema web para gerenciar partidas de truco, permitindo cadastrar jogadores, registrar partidas, visualizar placares e acompanhar estatísticas dos jogadores.

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 18 ou superior)
- PostgreSQL
- npm ou yarn

### Backend

```bash
cd backend
npm install
# Configure o arquivo .env com as credenciais do banco
npm run dev
```

### Frontend

```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```

## 🛠️ Tecnologias

### Backend

- **Node.js** com TypeScript
- **Express.js** para API REST
- **TypeORM** para ORM
- **PostgreSQL** como banco de dados
- **JWT** para autenticação

### Frontend

- **Next.js** com React
- **TypeScript**
- **Bootstrap** e **Tailwind CSS** para estilização
- **Axios** para requisições HTTP
- **React Icons** para ícones

## 📁 Estrutura do Projeto

### Backend

```
backend/
├── src/
│   ├── controllers/     # Controladores da API
│   ├── entities/        # Entidades do TypeORM
│   ├── routes/          # Rotas da API
│   ├── repositories/    # Repositórios customizados
│   ├── middleware/      # Middlewares (auth, error handling)
│   ├── seeders/         # Dados iniciais
│   └── migrations/      # Migrações do banco
├── server.ts           # Servidor principal
└── data-source.ts      # Configuração do TypeORM
```

### Frontend

```
frontend/
├── src/pages/
│   ├── components/      # Componentes reutilizáveis
│   ├── services/        # Serviços de API
│   ├── interfaces/      # Interfaces TypeScript
│   ├── index.tsx        # Página inicial
│   ├── login.tsx        # Página de login
│   ├── partidas.tsx     # Gerenciamento de partidas
│   ├── placar.tsx       # Visualização de placares
│   ├── usuario.tsx      # Cadastro de usuários
│   ├── usuarios.tsx     # Listagem de usuários
│   └── sobre.tsx        # Informações do projeto
├── public/
│   └── placar/          # Imagens dos placares
└── styles/
    └── globals.css      # Estilos globais
```

## 🎯 Funcionalidades

### Usuários

- ✅ Cadastro de novos jogadores
- ✅ Listagem de todos os usuários
- ✅ Edição de dados dos usuários
- ✅ Exclusão de usuários

### Partidas

- ✅ Cadastro de novas partidas
- ✅ Listagem de todas as partidas
- ✅ Visualização detalhada de partidas
- ✅ Edição de partidas existentes
- ✅ Exclusão de partidas

### Placar

- ✅ Visualização de placares
- ✅ Estatísticas dos jogadores

### Autenticação

- ✅ Sistema de login/logout
- ✅ Proteção de rotas

## 👨‍💻 Autor

**Mauricio Durante Dall Igna**  
Estudante de Análise e Desenvolvimento de Sistemas  
Universidade de Passo Fundo (UPF)

## 📝 Licença

Este projeto foi desenvolvido como trabalho acadêmico para a disciplina de Tópicos Especiais em Desenvolvimento de Software.
