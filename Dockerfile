from node:16-alpine as base

RUN apk add git

WORKDIR /app

COPY . .

RUN yarn

RUN yarn build

FROM nginx:1.15 as production
COPY --from=base /app/build/ /usr/share/nginx/html
COPY --from=base /app/k8s/server.conf /etc/nginx/conf.d/default.conf
