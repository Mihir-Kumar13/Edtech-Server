# Build Stage
FROM node:alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .

# Production Stage
FROM node:alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app .

EXPOSE 4000

CMD ["npm", "run", "dev"]

