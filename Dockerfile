# Vaihe 1: Sovelluksen kääntäminen (Build stage)
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build && \
    if [ -d "/app/dist/angular-example/browser" ]; then \
      cp -r /app/dist/angular-example/browser /app/dist-output; \
    else \
      cp -r /app/dist/angular-example /app/dist-output; \
    fi

# Vaihe 2: Tuotantopalvelin (Production stage)
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist-output /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
