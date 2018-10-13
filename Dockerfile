# build stage
FROM node:9.11.1-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# EXPOSE 8080
# CMD ["npm", "run", "serve"]


RUN npm run build

# production stage
FROM nginx:1.13.12-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/config.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
