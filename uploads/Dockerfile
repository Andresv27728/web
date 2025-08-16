# Dockerfile para el Bot de WhatsApp
FROM node:18-alpine

# Instalar dependencias del sistema necesarias para Puppeteer
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Configurar Puppeteer para usar Chromium instalado
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production && npm cache clean --force

# Copiar el resto del código
COPY . .

# Crear directorios necesarios
RUN mkdir -p uploads plugins public

# Establecer permisos
RUN addgroup -g 1001 -S nodejs
RUN adduser -S whatsapp -u 1001
RUN chown -R whatsapp:nodejs /app
USER whatsapp

# Exponer puerto
EXPOSE 3000

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=3000

# Comando de inicio
CMD ["npm", "start"]
