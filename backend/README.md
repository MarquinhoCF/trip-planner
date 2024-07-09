# Backend Application Setup

Este guia descreve como configurar o backend de uma aplicação usando Node.js, TypeScript, Fastify, Prisma e outras bibliotecas necessárias.

## Passos para Iniciar o Desenvolvimento

### 1. Inicializar o Projeto

Crie um novo diretório para o seu projeto e inicialize um novo projeto Node.js:

```sh
npm init -y
```

### 2. Configurar TypeScript

Instale o TypeScript e os tipos para Node.js:

```sh
npm install typescript @types/node -D
```

Inicialize o TypeScript:

```sh
npx tsc --init
```

### 3. Configurar TSX para Executar TypeScript

Instale o `tsx` para facilitar a execução de arquivos TypeScript:

```sh
npm install tsx -D
```

Adicione o seguinte script ao `package.json` para iniciar o servidor em modo de desenvolvimento:

```json
"scripts": {
  "dev": "tsx watch src/server.ts"
}
```

### 4. Iniciar o Servidor em Modo de Desenvolvimento

Execute o servidor:

```sh
npm run dev
```

### 5. Instalar Fastify

Instale o Fastify:

```sh
npm install fastify -D
```

### 6. Configurar Prisma

Instale o Prisma:

```sh
npm install prisma -D
```

Inicialize o Prisma com o provedor de dados (exemplo com SQLite):

```sh
npx prisma init --datasource-provider SQLite
```

### 7. Migrar o Banco de Dados com Prisma

Execute as migrações do banco de dados:

```sh
npx prisma migrate dev
```

### 8. Instalar Zod para Validação

Instale o Zod:

```sh
npm install zod -D
```

Instale o provedor de tipos Zod para Fastify:

```sh
npm install fastify-type-provider-zod -D
```

### 9. Iniciar Prisma Studio

Para gerenciar visualmente seu banco de dados, use o Prisma Studio:

```sh
npx prisma studio
```

### 10. Instalar Day.js para Manipulação de Datas

Instale o Day.js:

```sh
npm install dayjs -D
```

### 11. Instalar Nodemailer para Envio de Emails

Instale o Nodemailer:

```sh
npm install nodemailer -D
```

Instale os tipos para Nodemailer:

```sh
npm install @types/nodemailer -D
```

### 12. Instalar CORS para Fastify

Instale o plugin CORS para Fastify:

```sh
npm install @fastify/cors -D
```

## Scripts

Aqui estão os scripts úteis definidos no `package.json`:

```json
"scripts": {
  "dev": "tsx watch src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js"
}
```

## Configuração do `tsconfig.json`

Certifique-se de que seu `tsconfig.json` esteja configurado corretamente de acordo com a versão do Node.js que você está usando. Um exemplo de configuração:

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist"
  },
  "include": ["src"]
}
```

## Estrutura do Projeto

Aqui está uma estrutura sugerida para o seu projeto:

```
project-root/
│
├── src/
│   ├── routes/
│   │   └── confirm-trip.ts
│   ├── lib/
│   │   └── prisma.ts
│   └── server.ts
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── package.json
├── tsconfig.json
└── README.md
```