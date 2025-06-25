# 🃏 Truco Manager

Sistema web para gerenciamento de partidas de truco desenvolvido como trabalho final da disciplina de Tópicos Especiais em Desenvolvimento de Software.

## 🚀 Como executar

### Pré-requisitos

- Node.js
- PostgreSQL

### 1. Configure o banco

```sql
CREATE DATABASE truco_manager_db;
```

### 2. Configure as variáveis de ambiente

Crie `.env` na pasta `backend`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=truco_manager_db
TOKEN=seu_token_secreto
```

### 3. Instale e execute

**Backend:**

```bash
cd backend
npm install
npm run dev
```

**Frontend:**

```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```

### 4. Acesse

- Frontend: http://localhost:3000
- Backend: http://localhost:3002

## 🛠️ Tecnologias

- **Backend:** Node.js, TypeScript, Express, TypeORM, PostgreSQL
- **Frontend:** Next.js, React, TypeScript, Bootstrap
- **Autenticação:** JWT

## 📋 Funcionalidades

- Gerenciamento de usuários
- Criação e controle de partidas
- Placar em tempo real
- Sistema de autenticação

## 👨‍💻 Autor

Mauricio Durante Dall Igna
