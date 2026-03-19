# Organizador Financeiro Fullstack

Um aplicativo completo para gerenciar suas finanças pessoais, com **backend em Node.js** e **frontend em React + TypeScript**.  
Inclui dashboard interativo, cadastro de despesas e receitas, categorias, gráficos financeiros e resumo mensal.

---

## 🏗 Estrutura do Projeto

finance-organizer/
├─ backend/                  # Node.js API
│  ├─ src/
│  │  ├─ controllers/        # lógica de rotas
│  │  ├─ models/             # schemas do banco de dados
│  │  ├─ routes/             # endpoints da API
│  │  └─ app.ts              # servidor Express
│  ├─ package.json
│  └─ .env                   # variáveis de ambiente
├─ frontend/                 # React + TypeScript
│  ├─ src/
│  │  ├─ components/         # botões, inputs, cards, gráficos
│  │  ├─ pages/              # páginas: Dashboard, Login, Despesas, Receitas
│  │  ├─ services/           # comunicação com a API
│  │  └─ App.tsx             # componente principal
│  ├─ package.json
│  └─ tsconfig.json
├─ .gitignore
└─ README.md

## 💻 Tecnologias Utilizadas

**Backend:**
- Node.js
- Express
- MongoDB / PostgreSQL
- JWT para autenticação
- dotenv para variáveis de ambiente

**Frontend:**
- React
- TypeScript
- React Query para consumo da API
- Chart.js / Recharts para gráficos
- Tailwind CSS para estilização

---

## ⚡ Funcionalidades

**Backend:**
- CRUD de despesas e receitas
- CRUD de categorias
- Autenticação e autorização com JWT
- Endpoints para dados do dashboard (resumo mensal, gráficos)

**Frontend:**
- Dashboard financeiro com gráficos e resumo de saldo
- Cadastro e edição de despesas e receitas
- Filtragem por categoria e período
- Layout responsivo

---

## 🚀 Como Rodar o Projeto Localmente

### 1️⃣ Backend

```bash
cd backend
npm install
cp .env.example .env       # configure suas variáveis de ambiente
npm run dev                # inicia em modo desenvolvimento### 2️⃣ Frontend

```bash
cd frontend
npm install
cp .env.example .env       # configure suas variáveis de ambiente
npm run dev                
```

---


### 2️⃣ 🔒 Configuração de Ambiente 

**Exemplo .env Backend:**

PORT=5000
DB_URI=<sua-string-de-conexao>
JWT_SECRET=<segredo-jwt>

**Exemplo .env Frontend:**

REACT_APP_API_URL=http://localhost:5000

---

## 📦 Estrutura de Pasta Detalhada

**Backend:**
- src/controllers/ # lógica de rotas
- src/models/ # schemas do banco de dados
- src/routes/   # endpoints da API
- app.ts # servidor Express
- package.json # dependências do Node.js
- .gitignore # controle de versão
- .env # variáveis de ambiente
- .env

**Frontend:**
- src/components/ # botões, inputs, cards, gráficos, cards de despesas e receitas
- src/pages/ # páginas: Dashboard, Login, Despesas, Receitas
- src/services/ # comunicação com a API
- App.tsx # componente principal
- package.json # dependências do React
- tsconfig.json # configuração TypeScript

---

## 📈 Proximos Passos / Melhorias Futuras

**Construção do Header da dashboard**
- Barra de navegação com nome do usuário
- Menu de perfil e logout
- Ícones de atalhos para páginas principais

**Dashboard completa**
- Gráficos de receitas vs despesas (Chart.js / Recharts)
- Cards de resumo de saldo, total de despesas e receitas do mês
- Cards de categorias mais gastas ou mais lucrativas

**CRUD completo de despesas e receitas**
- Formulários para criar, editar e excluir despesas e receitas
- Conexão com o backend para persistência de dados

**Categorias de finanças**
- CRUD de categorias (alimentação, transporte, lazer, etc.)
- Filtros por categoria na dashboard

**Autenticação e autorização completas**
- Proteção das rotas da dashboard
- Validação de token JWT no backend
- Mensagens de erro claras para o usuário

**Layout responsivo e estilização**
- Ajustes para mobile e tablet
- Uso de Tailwind CSS ou Styled Components para manter consistência visual

**Próximos endpoints da API**
- Resumo mensal de despesas e receitas
- Dados para gráficos da dashboard
- Relatórios exportáveis (PDF/CSV)

**Testes unitários e integração**
- Backend: Jest + Supertest para endpoints
- Frontend: React Testing Library para componentes da dashboard

**Funcionalidades extras futuras**
- Autenticação social (Google, Facebook)
- Notificações de alertas financeiros
- Integração com APIs bancárias

## 👤 Autor 

Desenvolvido como projeto fullstack para fins de aprendizado e demonstração de React + TypeScript e Node.js.
