
#  Teste Pleno

  

Bem-vindo!!

Este projeto é composto por duas partes principais: Backend e Frontend, cada uma com suas especificações e objetivos bem definidos. Este documento serve como um ponto de partida.

  

Visão Geral do Projeto

O objetivo deste teste é demonstrar habilidades técnicas no desenvolvimento de aplicações completas, utilizando as melhores práticas de arquitetura, performance e organização de código. A aplicação foi desenvolvida em duas frentes:

  

-  [Backend: ](/instrucoes_backend.md)

-  [Frontend: ](/instrucoes_frontend.md)

  

##  Como Navegar

Para informações detalhadas sobre cada componente, acesse os respectivos READMEs usando os links acima. Cada documento contém:

  

Passo a passo para configurar e executar o componente.

Estrutura e lógica do código implementado.

Decisões técnicas e desafios enfrentados.

Observação

Este projeto foi desenvolvido para simular um ambiente real, com foco em boas práticas, organização e criatividade ao lidar com restrições de recursos e performance.

  

Boa Sorte!!

## Como utiliza a aplicação
### o que foi utilizado:
```
Laravel: 11
MySQL: 8
Angular: 15
Node: 16
```
# Rotas
Foi proposto para criar um CRUD de pessoas
`GET {rota}/person` 
`GET {rota}/person/{id}` 
`POST{rota}/person` 
`PATCH {rota}/person/{id}` 
`DELETE {rota}/person/{id}`
`GET {rota}/count`
 
 ---
 # Como executar o projeto
existem três pastas no projeto sendo elas 
`api` - projeto backend
`front` - projeto frontend
`api_docs` - aqui está a collection do Postman juntamente com a environment


### Executando projeto 

`docker compose up -d`

O Projeto pode ser executado separadamente
### Executando o back 

```
cd api
cp .env.example .env
docker compose up -d --build
```

ele vai estar rodando em:
`http://localhost:9999/`

### Executando o front
```
cd front
docker compose up -d --build
```
`http://localhost:8080/`

---
API Swagger 
`
http://localhost:9999/api/documentation
`