# Etapa de build
FROM node:18 AS builder
WORKDIR /app

# Copiar apenas os arquivos essenciais para instalar dependências
COPY package.json package-lock.json ./
RUN npm install -g @angular/cli@latest
RUN npm install

# Copiar o restante dos arquivos para o container
COPY . .

# Gerar a build
RUN npm run build

# Etapa de produção
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
