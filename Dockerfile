# base node image
FROM node:18-bookworm-slim as base

# set for base and all layer that inherit from it
ENV NODE_ENV production
ENV CI=true
ENV LEFTHOOK=0

# Install open ssl and certs for Sentry CLI
RUN apt-get update && apt-get install -y openssl ca-certificates

# install all node_modules, including dev
FROM base as deps

WORKDIR /app

ADD package.json package-lock.json ./
RUN npm install --include=dev

# setup production node_modules
FROM base as production-deps

WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
ADD package.json package-lock.json ./
RUN npm prune --omit=dev

# build the app
FROM base as build

ARG GITHUB_SHA
ENV GITHUB_SHA=$GITHUB_SHA

ARG SERVICE_URL
ENV SERVICE_URL=$SERVICE_URL

WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules

# app code changes all the time
ADD . .
RUN --mount=type=secret,id=SENTRY_AUTH_TOKEN \
    SENTRY_AUTH_TOKEN="$(cat /run/secrets/SENTRY_AUTH_TOKEN)" \
    npm run build

# build smaller image for running
FROM base

WORKDIR /app

COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public
COPY --from=build /app/next.config.js /app/next.config.js
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/package-lock.json /app/package-lock.json

ADD . .

CMD [ "npm", "run", "start" ]
