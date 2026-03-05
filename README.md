# Scalable URL Shortener

Sistema distribuído de encurtamento de URLs construído com Node.js, NestJS e TypeScript, implementando arquitetura escalável e padrões de sistemas distribuídos.

## 🚀 Tecnologias

### Backend
- **Node.js** com **NestJS** e **TypeScript**
- **Fastify** como servidor HTTP
- **Cassandra** para persistência NoSQL distribuída
- **Redis** para cache e otimização de leituras
- **Nginx** como load balancer
- **Docker Compose** para orquestração de containers

### Frontend
- **React** com **TypeScript**
- **Vite** como build tool
- **Zod** para validação de formulários
- **React Hook Form** para gerenciamento de formulários
- Hospedado no **Cloudflare Pages**

### Integrações
- **Stripe** (simulação de checkout)
- **OAuth2 Google** para autenticação social
- **Nodemailer** para envio de emails

## 🏗️ Arquitetura

### Padrões Implementados

- **Cache-Aside Pattern**: Redis como cache de leitura com TTL de 15 minutos
- **Horizontal Scaling**: 3 réplicas do backend balanceadas por Nginx
- **Distributed Database**: Cassandra em cluster multi-nó
- **JWT Authentication**: Tokens com expiração de 15 minutos
- **Modular Architecture**: Separação em módulos (Auth, Billing, URL Shortener)

### Estrutura do Projeto

```
src/
├── modules/
│   ├── auth/           # Autenticação JWT e OAuth2
│   ├── billing/        # Integração com Stripe
│   └── url-shortener/  # Lógica de encurtamento
├── config/
│   ├── database/       # Cassandra e Redis clients
│   └── env/            # Validação de variáveis de ambiente
└── common/             # Utilitários compartilhados
```

## 📦 Funcionalidades

### Autenticação
- ✅ Registro e login com email/senha
- ✅ Autenticação via Google OAuth2
- ✅ JWT com refresh tokens
- ✅ Recuperação de senha via email
- ✅ Hash de senhas com bcrypt

### URL Shortener
- ✅ Geração de IDs únicos com nanoid (Base62, 7 caracteres)
- ✅ Cache-Aside Pattern com Redis
- ✅ Redirecionamento 302 para URLs originais
- ✅ Persistência em Cassandra

### Billing (Simulação)
- ✅ Checkout com Stripe
- ✅ Webhook para confirmação de pagamento
- ✅ Rotas de sucesso/cancelamento

## 🔧 Configuração

### Pré-requisitos

- Node.js 20+
- Docker e Docker Compose
- pnpm

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
NODE_ENV=prod
JWT_SECRET=your_jwt_secret
PORT=3000
CASSANDRA_URL=cassandra1
REDIS_URL=redis://redis-cdn:6379

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_email_password

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

### Instalação

```bash
# Instalar dependências
pnpm install

# Subir infraestrutura
docker-compose up -d

# Build do projeto
pnpm build

# Iniciar aplicação
pnpm start
```

### Desenvolvimento

```bash
# Modo desenvolvimento com hot-reload
pnpm dev
```

## 🐳 Docker

### Serviços

- **api** (3 réplicas): Backend NestJS
- **load-balancer**: Nginx balanceando requisições
- **cassandra1**: Banco de dados NoSQL
- **redis-cdn**: Cache em memória
- **cloudflare-tunnel**: Túnel para exposição externa

### Comandos Úteis

```bash
# Subir todos os serviços
docker-compose up -d

# Ver logs
docker-compose logs -f api

# Rebuild sem cache
docker-compose build --no-cache

# Parar e remover volumes
docker-compose down -v
```

## 📡 API Endpoints

### Autenticação

```http
POST /auth/register
POST /auth/login
GET  /auth/google
GET  /auth/google/callback
POST /auth/forgot-password
POST /auth/reset-password
```

### URL Shortener

```http
POST /shorten-url        # Criar URL curta (requer autenticação)
GET  /shorten-url/:id    # Redirecionar para URL original
```

### Billing

```http
POST /billing/checkout   # Criar sessão de checkout (requer autenticação)
POST /billing/webhook    # Webhook do Stripe
GET  /billing/success    # Página de sucesso
GET  /billing/cancel     # Página de cancelamento
```

### Documentação

Acesse a documentação Swagger em:
```
http://localhost:3000/api/docs
```

## 🔐 Segurança

- Senhas hasheadas com bcrypt
- JWT com expiração configurável
- CORS configurado para domínios específicos
- Validação de dados com Zod
- Cookies HTTP-only para tokens
- Webhook signature verification (Stripe)

## 📊 Performance

### Cache Strategy
- **Cache-Aside Pattern** no Redis
- TTL de 900 segundos (15 minutos)
- Renovação automática de TTL em cache hit

### Escalabilidade
- 3 réplicas do backend
- Load balancing round-robin via Nginx
- Cassandra distribuído para alta disponibilidade