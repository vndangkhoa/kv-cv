# Stage 1: Build the Vite React application
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci || npm install

# Copy source files and build
COPY . .
RUN npm run build

# Stage 2: Serve optimized static assets with Nginx
FROM nginx:alpine

# OCI Image Annotations & Metadata
LABEL org.opencontainers.image.title="KHOA.VO Portfolio (kv-cv)" \
      org.opencontainers.image.description="Dual-persona interactive portfolio built with React 18, Vite 6, Three.js WebGL, and Nginx" \
      org.opencontainers.image.url="https://khoavo.myds.me" \
      org.opencontainers.image.source="https://github.com/vndangkhoa/kv-cv" \
      org.opencontainers.image.version="2.0.8" \
      org.opencontainers.image.licenses="MIT"

# Remove default nginx html files
RUN rm -rf /usr/share/nginx/html/*

# Copy compiled assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
