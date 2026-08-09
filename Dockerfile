# ---- build stage ----
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Serve from the domain root here, not the GitHub Pages "/cognitionsync/" base.
ARG VITE_BASE=/
ENV VITE_BASE=$VITE_BASE
RUN npm run build

# ---- runtime stage ----
FROM node:22-alpine
WORKDIR /app

RUN npm install -g serve@14

# vite.config.ts builds to client/dist
COPY --from=build /app/client/dist ./dist

# serve (serve-handler) uses 404.html for unmatched paths and returns a real
# HTTP 404 with it. Copying the SPA shell there means the branded NotFound page
# still renders, but crawlers get a 404 instead of a soft-404 200.
RUN cp dist/index.html dist/404.html

EXPOSE 3000

# NOTE: deliberately NOT using -s. The site has a single route ("/"), so SPA
# fallback would only turn every bad URL into a 200. If real client-side routes
# are added later, they need explicit rewrites in a dist/serve.json, or -s back.
CMD ["serve", "dist", "-l", "3000"]
