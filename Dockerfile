# base node image
FROM node:18-bullseye-slim as base

# install all node_modules, including dev
FROM base as deps

RUN mkdir /app/
WORKDIR /app/

ADD package.json package-lock.json ./
RUN npm install --production=false

# setup production node_modules
FROM base as production-deps

RUN mkdir /app/
WORKDIR /app/

COPY --from=deps /app/node_modules /app/node_modules
ADD package.json package-lock.json /app/
RUN npm prune --production

# build app
FROM base as build

ARG GITHUB_SHA
ENV GITHUB_SHA=$GITHUB_SHA

ARG SERVICE_URL
ENV SERVICE_URL=$SERVICE_URL

RUN mkdir /app/
WORKDIR /app/

COPY --from=deps /app/node_modules /app/node_modules

# app code changes all the time
ADD . .
RUN npm run build

# build smaller image for running
FROM base

ENV NODE_ENV=production

RUN mkdir /app/
WORKDIR /app/

COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public
COPY --from=build /app/next.config.js /app/next.config.js
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/package-lock.json /app/package-lock.json

ADD . .

EXPOSE 3000

ENV PORT 3000

CMD ["node_modules/.bin/next", "start"]
