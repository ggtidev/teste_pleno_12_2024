# Teste Técnico - Frontend

## Resumo

- O frontend deve consumir os endpoints definidos no teste do backend e apresentar uma interface simples e funcional para interagir com as funcionalidades da API.
- O projeto deverá ser desenvolvido com **React.js** (ou outro framework moderno de frontend, como Vue.js ou Angular, à sua escolha) e implementado com boas práticas de desenvolvimento frontend.
- O layout não precisa ser visualmente impressionante, mas deve ser funcional, responsivo e intuitivo para o usuário.
- O deploy será realizado utilizando **Docker**, e a aplicação deverá ser acessível na porta **8080**.

---

## Funcionalidades e Requisitos

### 1. **Formulário de Cadastro de Pessoas**
- O frontend deve conter um formulário para permitir a criação de pessoas.
- **Campos obrigatórios do formulário:**
  - **Apelido:** campo de texto, obrigatório, limitado a 32 caracteres.
  - **Nome:** campo de texto, obrigatório, limitado a 100 caracteres.
  - **Nascimento:** campo de data, obrigatório, no formato `AAAA-MM-DD`.

#### Comportamento:
- Após o envio do formulário:
  - **Sucesso:** Exibir uma mensagem de sucesso e o ID da pessoa criada (status 201).
  - **Erro:** Exibir mensagens de validação claras para o usuário (status 422 ou 400).

---

### 2. **Lista de Pessoas**
- Exibir uma tabela ou lista mostrando todas as pessoas cadastradas.
- Cada item da lista deve exibir:
  - ID
  - Apelido
  - Nome
  - Data de nascimento
- O frontend deve fazer uma requisição ao endpoint `GET /pessoas` ao carregar a página para exibir os dados iniciais.

---

### 3. **Busca de Pessoas**
- Adicionar uma barra de busca na interface que permita ao usuário pesquisar por pessoas com base no termo informado.
- A busca deve interagir com o endpoint `GET /pessoas?t=[:termo da busca]`.
- Exibir os resultados da busca em tempo real ou após o envio do termo pelo usuário.
- Caso nenhum resultado seja encontrado, exibir uma mensagem amigável como **"Nenhum resultado encontrado"**.

---

### 4. **Detalhes de uma Pessoa**
- Ao clicar em uma pessoa na lista, abrir uma visualização detalhada (pode ser uma modal ou uma página separada).
- Essa visualização deve consumir o endpoint `GET /pessoas/[:id]` para obter e exibir os dados completos da pessoa selecionada.

---

### 5. **Contador de Pessoas**
- Adicionar um contador visível no topo ou no rodapé da interface que mostre o total de pessoas cadastradas.
- Este contador deve ser atualizado ao consumir o endpoint `GET /contagem-pessoas`.

---

## Requisitos Técnicos

- **Framework:** React.js (ou outro framework moderno de frontend, à escolha).
- **Estilo:** Pode usar bibliotecas como **Bootstrap**, **Material UI** ou **Tailwind CSS** para estilização, mas o layout deve ser limpo e responsivo.
- **Gerenciamento de Estado:** Use **Context API**, **Redux** ou outro gerenciador de estado para lidar com dados compartilhados, se necessário.
- **Consumo de API:** Utilize `fetch` ou bibliotecas como **Axios** para consumir os endpoints.
- **Validação de Formulários:** Implemente validação no frontend para os campos obrigatórios antes de enviar os dados à API.
- **Testes:** Inclua testes básicos para os componentes utilizando uma biblioteca como **Jest** ou **Cypress**.

---

## Docker e Deploy

- O frontend deverá ser empacotado em um contêiner **Docker**.
- O arquivo `Dockerfile` deve ser configurado para criar e servir a aplicação via um servidor web como **Nginx**.
- O `docker-compose.yml` deverá incluir a configuração do frontend, com as portas mapeadas para **8080**.

### Exemplo de `docker-compose.yml`:
```yaml
version: '3.5'
services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8080:80"

```
### Exemplo de `Dockerfile`:
# Etapa de build
```
FROM node:16 AS builder
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa de produção
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```