# OdontoForense - BackEnd

Backend do Projeto Integrador desenvolvido com **Node.js**, responsável pelo gerenciamento de **Casos Periciais**.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework web para Node.js.
- **MongoDB**: Banco de dados NoSQL.
- **Mongoose**: ODM para MongoDB.
- **dotenv**: Gerenciamento de variáveis de ambiente.
- **PDFKit**: Geração de arquivos PDF.
- **Swagger**: Documentação interativa da API.
- **Multer**: Upload de arquivos `multipart/form-data`.
- **Cors**: Middleware de conexão entre diferentes origens.

---

## 📁 Estrutura do Projeto

```
odontoforense_backend/
├── src/
│   ├── controllers/       # Lógica dos endpoints
│   ├── db/                # Conexão com o Banco de Dados
│   ├── docs/              # Documentação do Swagger
│   ├── models/            # Modelos do Mongoose
│   ├── middlewares/       # Autenticação e Upload
│   ├── routes/            # Definição das rotas da API
│   ├── utils/             # Funções utilitárias (cloudinary.js)
├── .env.example           # Exemplo de variáveis de ambiente
├── server.js              # Ponto de entrada da aplicação
├── package.json           # Dependências e scripts
```

---

## ⚙️ Configuração

### 1. Clone o repositório:

```bash
git clone https://github.com/alessandramacedodev/odontoforense_backend.git
cd odontoforense_backend
```

### 2. Instale as dependências:

```bash
npm install
```

### 3. Configure as variáveis de ambiente:

Renomeie o arquivo `.env.example` para `.env` e preencha com seus dados:

```env

MONGODB= 
JWT_SECRET= 
JWT_EXPIRES_IN 
CLOUDINARY_URL=
```

### 4. Inicie o servidor:

```bash
npm run dev
```

A aplicação estará disponível em: https://odontoforense-backend-wur1.onrender.com/ e http://localhost:3000 de forma local

---

