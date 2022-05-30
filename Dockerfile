# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY . .
RUN rm -rf node_modules
RUN npm install
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
ENV PORT=80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]