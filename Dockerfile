FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

# npm ci es una opción más rápida que 'npm install' para instalar dependencias en un entorno de integración continua
RUN npm ci

COPY . .

# COPY ./data ./dist/data

RUN npm run tsc

RUN chmod +x ./scripts/start.sh

EXPOSE 3000

CMD ["/bin/sh", "./scripts/start.sh"]