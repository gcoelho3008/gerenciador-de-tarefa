
# APP

[x] Deve ser possível criar uma Tarefa
[x] Deve ser possível alterar uma Tarefa
[x] Deve ser possível deletar uma tarefa
[x] Deve ser possível excluir uma tarefa
[x] Deve ser possível favoritar uma tarefa
[x] Deve ser possível escolher uma cor para tarefa# 

O App foi desenvolvido usando, React e CSS para o front-end
O Back-end foi utilizado NODE, Typescript, Docker como Container, Prisma com PostgreSql para Banco de Dados

Docker compose foi criado para acesso ao container
Configuração
npm install -g npm@10.8.2
npm init
npm i ts-node typescript nodemon @types/cors @types/express @types/node --save
npm i @prisma/client cors express prisma
 npx tsc --init
 curl localhost:5000/api/notes
 docker run --name task-api-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQ_PASSWORD=docker -e POSTGRE_DATABASE=apitask -p 5432:5432 bitnami/postgresql
 npm i prisma -D
npx  prisma init
 npm i prisma client
 

Para executar o front-end insira o comando cd notes-app-ui dentro da pasta notes-app-ui execute npm start

Para executar o back-end execute entre na pasta usando cd notes-app-server dentro da pasta npm start
 
 
