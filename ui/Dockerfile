FROM node:18-alpine as build-stage

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

# NGINX
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80/tcp

CMD ["nginx", "-g", "daemon off;"]
