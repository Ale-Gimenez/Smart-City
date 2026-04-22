# 🏙️ Smart City — TecnoVille

Sistema de monitoramento ambiental para a escola TecnoVille, com sensores de temperatura, umidade, luminosidade e contador. Desenvolvido com **Django REST Framework** no back-end e **React + Vite** no front-end.

---

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
- [Instalação e Execução — Back-end](#instalação-e-execução--back-end)
- [Instalação e Execução — Front-end](#instalação-e-execução--front-end)
- [Criando o Superusuário](#criando-o-superusuário)
- [Populando o Banco de Dados](#populando-o-banco-de-dados)
- [Endpoints da API](#endpoints-da-api)
- [Autenticação JWT](#autenticação-jwt)
- [Funcionalidades do Front-end](#funcionalidades-do-front-end)
- [Regras de Negócio](#regras-de-negócio)
- [Estrutura de Pastas](#estrutura-de-pastas)

---

## 🔍 Visão Geral

O sistema coleta dados de sensores instalados em ambientes da escola (praças, corredores, pátios) e os disponibiliza via API RESTful. Um painel web permite visualizar e gerenciar todos os dados com autenticação JWT.

**Tipos de sensor suportados:**

| Sensor       | Unidade |
|--------------|---------|
| Temperatura  | °C      |
| Umidade      | %       |
| Luminosidade | lux     |
| Contador     | uni     |

---

## 🛠️ Tecnologias

**Back-end:**
- Python 3.x
- Django 6.0.4
- Django REST Framework 3.17.1
- djangorestframework-simplejwt 5.5.1
- django-filter 25.2
- django-cors-headers 4.9.0
- MySQL (via mysqlclient 2.2.8 + PyMySQL 1.1.2)
- Pandas 3.0.2 + openpyxl 3.1.5 (importação de planilhas)

**Front-end:**
- React 19 + Vite
- React Router DOM 7
- Axios 1.x

---

## 📁 Estrutura do Projeto

```
Smart-City/
├── backend/
│   ├── api/
│   │   ├── models.py         # Modelos do banco
│   │   ├── serializers.py    # Serializers DRF
│   │   ├── views.py          # ViewSets + views de importação
│   │   ├── urls.py           # Rotas da API
│   │   ├── filters.py        # Filtros django-filter
│   │   ├── permissions.py    # IsAdminOrReadOnly
│   │   ├── admin.py          # Registro no Django Admin
│   │   └── migrations/       # Migrações do banco
│   ├── config/
│   │   ├── settings.py       # Configurações Django
│   │   └── urls.py           # URLs raiz
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js      # Instância Axios + interceptors JWT
│   │   ├── components/
│   │   │   ├── Layout.jsx    # Sidebar + navegação
│   │   │   ├── Modal.jsx     # Modal reutilizável
│   │   │   ├── Table.jsx     # Tabela reutilizável
│   │   │   ├── FormField.jsx # Campo de formulário + estilos
│   │   │   └── PrivateRoute.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Home.jsx      # Dashboard com última leitura por sensor
│   │   │   ├── sensores/     # Histórico por tipo de sensor
│   │   │   │   ├── Temperatura.jsx
│   │   │   │   ├── Umidade.jsx
│   │   │   │   ├── Luminosidade.jsx
│   │   │   │   └── Contador.jsx
│   │   │   └── crud/         # CRUD completo de cada entidade
│   │   │       ├── Sensores.jsx
│   │   │       ├── Microcontroladores.jsx
│   │   │       ├── Ambientes.jsx
│   │   │       ├── Locais.jsx
│   │   │       ├── Responsaveis.jsx
│   │   │       ├── Usuarios.jsx
│   │   │       └── Historicos.jsx
│   │   ├── App.jsx           # Rotas
│   │   ├── main.jsx
│   │   └── index.css         # Tema dark global
│   ├── package.json
│   └── vite.config.js
└── population/               # Planilhas para popular o banco
    ├── locais.xlsx
    ├── responsaveis.xlsx
    ├── ambientes.xlsx
    ├── microcontroladores.xlsx
    ├── sensores.xlsx
    └── historicos.xlsx
```

---

## ✅ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Python** 3.10 ou superior → https://python.org
- **MySQL** 8.0 ou superior → https://dev.mysql.com/downloads/
- **Node.js** 18 ou superior → https://nodejs.org
- **Git** → https://git-scm.com

---

## 🗄️ Configuração do Banco de Dados

1. Abra o MySQL e crie o banco de dados:

```sql
CREATE DATABASE smartcity CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. Verifique (ou ajuste) as credenciais em `backend/config/settings.py`:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'smartcity',
        'USER': 'root',       # seu usuário MySQL
        'PASSWORD': 'senai',  # sua senha MySQL
        'HOST': '127.0.0.1',
        'PORT': '3306',
    }
}
```

---

## 🐍 Instalação e Execução — Back-end

```bash
# 1. Entrar na pasta do back-end
cd backend

# 2. Criar e ativar o ambiente virtual
python -m venv venv

# Windows:
venv\Scripts\activate

# Linux/Mac:
source venv/bin/activate

# 3. Instalar dependências
pip install -r requirements.txt

# 4. Aplicar as migrações
python manage.py migrate

# 5. Criar o superusuário padrão (ver seção abaixo)

# 6. Iniciar o servidor
python manage.py runserver
```

O servidor estará disponível em: **http://127.0.0.1:8000/**

---

## 👤 Criando o Superusuário

O projeto utiliza o superusuário padrão definido no PDF:

```bash
python manage.py createsuperuser
```

Quando solicitado, informe:
- **Username:** `senai`
- **Password:** `123`

Após criar o usuário Django, crie também o perfil na tabela `Usuarios` via Django Admin ou pelo endpoint `/api/register/`:

```json
POST /api/register/
{
  "username": "senai",
  "password": "123",
  "nome": "Administrador SENAI",
  "tipo": "ADMINISTRADOR"
}
```

> O Django Admin está disponível em **http://127.0.0.1:8000/admin/** com as mesmas credenciais.

---

## 🌐 Instalação e Execução — Front-end

```bash
# 1. Entrar na pasta do front-end
cd frontend

# 2. Instalar dependências
npm install

# 3. Iniciar o servidor de desenvolvimento
npm run dev
```

O front-end estará disponível em: **http://localhost:5173/**

> **Atenção:** o back-end precisa estar rodando na porta `8000` antes de iniciar o front-end.

---

## 📊 Populando o Banco de Dados

As planilhas para popular o banco estão na pasta `population/`. Importe-as **nesta ordem** (respeitando as dependências entre tabelas) via Postman, Insomnia ou a interface do front-end (se implementada):

| Ordem | Endpoint                          | Arquivo                    |
|-------|-----------------------------------|----------------------------|
| 1º    | `POST /api/importar/locais/`      | `locais.xlsx`              |
| 2º    | `POST /api/importar/responsaveis/`| `responsaveis.xlsx`        |
| 3º    | `POST /api/importar/ambientes/`   | `ambientes.xlsx`           |
| 4º    | `POST /api/importar/microcontroladores/` | `microcontroladores.xlsx` |
| 5º    | `POST /api/importar/sensores/`    | `sensores.xlsx`            |
| 6º    | `POST /api/importar/historicos/`  | `historicos.xlsx`          |

**Como importar com Postman:**

1. Autentique-se em `POST /api/token/` e copie o `access` token
2. No header: `Authorization: Bearer <token>`
3. Em Body → `form-data`: chave `file`, tipo `File`, selecione a planilha
4. Envie a requisição

---

## 🔌 Endpoints da API

### Autenticação

| Método | Endpoint          | Descrição                        |
|--------|-------------------|----------------------------------|
| POST   | `/api/token/`     | Obtém o par de tokens JWT        |
| POST   | `/api/refresh/`   | Renova o access token            |
| POST   | `/api/register/`  | Cadastra novo usuário            |
| GET    | `/api/me/`        | Dados do usuário autenticado     |

### Recursos principais (CRUD completo)

| Método          | Endpoint                      | Descrição                      |
|-----------------|-------------------------------|--------------------------------|
| GET / POST      | `/api/sensores/`              | Lista / cria sensores          |
| GET/PUT/DELETE  | `/api/sensores/{id}/`         | Detalhe / edita / exclui       |
| GET / POST      | `/api/microcontroladores/`    | Lista / cria microcontroladores|
| GET/PUT/DELETE  | `/api/microcontroladores/{id}/` | Detalhe / edita / exclui     |
| GET / POST      | `/api/ambientes/`             | Lista / cria ambientes         |
| GET/PUT/DELETE  | `/api/ambientes/{id}/`        | Detalhe / edita / exclui       |
| GET / POST      | `/api/locais/`                | Lista / cria locais            |
| GET/PUT/DELETE  | `/api/locais/{id}/`           | Detalhe / edita / exclui       |
| GET / POST      | `/api/responsaveis/`          | Lista / cria responsáveis      |
| GET/PUT/DELETE  | `/api/responsaveis/{id}/`     | Detalhe / edita / exclui       |
| GET / POST      | `/api/historicos/`            | Lista / registra medições      |
| GET/PUT/DELETE  | `/api/historicos/{id}/`       | Detalhe / edita / exclui       |
| GET             | `/api/historicos/recentes/`   | Medições das últimas 24h       |
| GET / POST      | `/api/usuarios/`              | Lista / cria usuários          |
| GET/PUT/DELETE  | `/api/usuarios/{id}/`         | Detalhe / edita / exclui       |

### Filtros disponíveis

```
# Filtrar histórico por tipo de sensor
GET /api/historicos/?sensor__sensor=TEMPERATURA
GET /api/historicos/?sensor__sensor=UMIDADE
GET /api/historicos/?sensor__sensor=LUMINOSIDADE
GET /api/historicos/?sensor__sensor=CONTADOR

# Filtrar histórico por faixa de data
GET /api/historicos/?timestamp_min=2025-01-01T00:00:00&timestamp_max=2025-12-31T23:59:59

# Filtrar sensores por tipo e status
GET /api/sensores/?sensor=TEMPERATURA&status=true

# Filtrar microcontroladores por status
GET /api/microcontroladores/?status=true

# Medições das últimas 24h
GET /api/historicos/recentes/
```

### Importação de planilhas

| Método | Endpoint                              |
|--------|---------------------------------------|
| POST   | `/api/importar/locais/`               |
| POST   | `/api/importar/responsaveis/`         |
| POST   | `/api/importar/ambientes/`            |
| POST   | `/api/importar/microcontroladores/`   |
| POST   | `/api/importar/sensores/`             |
| POST   | `/api/importar/historicos/`           |

---

## 🔐 Autenticação JWT

Todos os endpoints (exceto `/api/token/` e `/api/register/`) exigem autenticação.

**1. Obter o token:**

```bash
POST /api/token/
Content-Type: application/json

{
  "username": "senai",
  "password": "123"
}
```

**Resposta:**

```json
{
  "access": "eyJhbGciOiJIUzI1NiIs...",
  "refresh": "eyJhbGciOiJIUzI1NiIs..."
}
```

**2. Usar o token nas requisições:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**3. Renovar o token (expira em 30 minutos):**

```bash
POST /api/refresh/
Content-Type: application/json

{
  "refresh": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Níveis de acesso:**

| Tipo          | Permissões                        |
|---------------|-----------------------------------|
| ADMINISTRADOR | CRUD completo em todos os recursos|
| USUARIO       | Somente leitura (GET)             |

---

## 💻 Funcionalidades do Front-end

### Fluxo de navegação

```
/login  →  /home (dashboard)
               ├── /sensores/temperatura
               ├── /sensores/umidade
               ├── /sensores/luminosidade
               ├── /sensores/contador
               ├── /crud/sensores
               ├── /crud/microcontroladores
               ├── /crud/ambientes
               ├── /crud/locais
               ├── /crud/responsaveis
               ├── /crud/usuarios
               └── /crud/historicos
```

### Páginas disponíveis

- **Login** — autenticação com JWT, armazenamento do token no `localStorage`, redirecionamento automático
- **Home (Dashboard)** — cards para os 4 tipos de sensor com a última leitura de cada um, dados do usuário logado
- **Temperatura / Umidade / Luminosidade / Contador** — histórico de medições em tabela, filtrado por tipo
- **CRUD Sensores** — listagem em tabela, criar/editar/excluir via modal
- **CRUD Microcontroladores** — listagem com status ativo/inativo, edição completa
- **CRUD Ambientes** — com seleção de Local e Responsável via dropdown
- **CRUD Locais** — gerenciamento de locais físicos
- **CRUD Responsáveis** — gerenciamento de responsáveis
- **CRUD Usuários** — criação via `/api/register/`, edição de perfil, definição de tipo (Admin/Usuário)
- **CRUD Medições** — filtro por tipo de sensor, registro manual de medições

### Comportamentos implementados

- **Proteção de rotas:** páginas sem token redirecionam para `/login` automaticamente
- **Tratamento de erro 401:** token expirado → logout automático + redirecionamento para login
- **Logout:** remove o token do `localStorage` e redireciona para login
- **Formulários com FK:** selects populados dinamicamente com dados da API

---

## ⚙️ Regras de Negócio

1. **Sensor inativo não aceita medições** — ao tentar registrar um histórico para um sensor com `status = false`, a API retorna erro 400:
   ```json
   { "erro": "Não é possível registrar medições para um sensor inativo." }
   ```

2. **Níveis de usuário** — `ADMINISTRADOR` tem acesso completo (CRUD); `USUARIO` tem acesso somente leitura.

3. **Importação de planilhas** — a importação de ambientes depende de Locais e Responsáveis já cadastrados; a importação de sensores depende de Microcontroladores; a importação de históricos depende de Sensores.

---

## 📦 Dependências completas

**Back-end (`requirements.txt`):**

```
asgiref==3.11.1
Django==6.0.4
django-cors-headers==4.9.0
django-filter==25.2
djangorestframework==3.17.1
djangorestframework_simplejwt==5.5.1
mysqlclient==2.2.8
numpy==2.4.4
openpyxl==3.1.5
pandas==3.0.2
PyJWT==2.12.1
PyMySQL==1.1.2
python-dateutil==2.9.0.post0
six==1.17.0
sqlparse==0.5.5
tzdata==2026.1
```

**Front-end (`package.json`):**

```json
"dependencies": {
  "axios": "^1.15.0",
  "react": "^19.2.4",
  "react-dom": "^19.2.4",
  "react-router-dom": "^7.14.1"
}
```

---

## 🧪 Testando a API

Recomenda-se usar **Postman** ou **Insomnia**. Passos básicos:

1. Crie uma requisição `POST` para `http://127.0.0.1:8000/api/token/` com body JSON `{ "username": "senai", "password": "123" }`
2. Copie o campo `access` da resposta
3. Em todas as próximas requisições, adicione o header: `Authorization: Bearer <access_token>`
4. Explore os endpoints listados na seção acima

---

## 📝 Observações

- O projeto foi desenvolvido como **trabalho individual** para a disciplina PWBE do SENAI "Roberto Mange"
- Banco de dados configurado para **MySQL** — não é compatível com SQLite sem alteração no `settings.py`
- O token JWT expira em **30 minutos**; use o endpoint `/api/refresh/` para renová-lo
- Em produção, altere o `SECRET_KEY` e desative o `DEBUG` no `settings.py`
