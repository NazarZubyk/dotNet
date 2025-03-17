# Build stage
FROM node:22.11.0 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM caddy:2
COPY --from=build /app/dist /srv