# base node image
FROM node:16-bullseye-slim as base

# install open ssl for prisma
RUN apt-get update && apt-get install -y openssl

# install all node_modules, including dev
FROM base as deps

ENV HUSKY_SKIP_INSTALL=1

ADD package.json package-lock.json .
RUN npm install --production=false

# setup production node_modules
FROM base as production-deps

COPY --from=deps /node_modules /node_modules
ADD package.json package-lock.json .
RUN npm prune --production

# build app
FROM base as build

ARG COMMIT_SHA
ENV COMMIT_SHA=$COMMIT_SHA

COPY --from=deps /node_modules /node_modules

# schema doesn't change much so these will stay cached
ADD prisma .
RUN npx prisma generate

# app code changes all the time
ADD . .
RUN npm run build

# build smaller image for running
FROM base

ENV NODE_ENV=production

COPY --from=production-deps ./node_modules ./node_modules
COPY --from=build ./node_modules/.prisma ./node_modules/.prisma
COPY --from=build ./.next ./.next
COPY --from=build ./public ./public
COPY --from=build ./next.config.js ./next.config.js
COPY --from=build ./package.json ./package.json
COPY --from=build ./package-lock.json ./package-lock.json
ADD . .

EXPOSE 3000

ENV PORT 3000

CMD ["node_modules/.bin/next", "start"]
