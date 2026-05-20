# Etapa 1: Construcción
FROM node:20-alpine as build

WORKDIR /app

# Copiamos archivos de dependencias
COPY package*.json ./

# Instalamos todas las dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Generamos el build de producción
RUN npm run build

# Etapa 2: Ejecución
FROM node:20-alpine

WORKDIR /app

# Copiamos solo lo necesario desde la etapa de build
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

# Instalamos solo las dependencias de producción para evitar fallos de módulos ausentes
RUN npm install --omit=dev

# Exponemos el puerto por defecto de Angular SSR
EXPOSE 4000

# Comando para arrancar el servidor SSR
CMD ["npm", "run", "serve:ssr:frontend-ies"]
