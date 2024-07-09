Comandos utilizados para iniciar o desenvolvimento da aplicação:

npm init -y  -> Cria o package.json

npm i typescript @types/node -D

npx tsc --init  -> Cria tsconfig.json - entrar no tsconfig bases e copiar as configurações referentes a sua versão do node

npm i tsx -D

npm tsx watch src/server.ts  -> definir esse script ("tsx watch src/server.ts") como dev no package.json
npm run dev

npm fastify -D

npm prisma -D

npx prisma init --datasource-provider SQLite

npx prisma migrate dev -> Sehouver mudanças no banco de dados do prisma e atualiza

npm i zod -D

npm i fastify-type-provider-zod -D

npx prisma studio