# Static site served by nginx running as a non-root user on port 8080.
FROM nginxinc/nginx-unprivileged:alpine

COPY --chown=nginx:nginx index.html /usr/share/nginx/html/
COPY --chown=nginx:nginx shared /usr/share/nginx/html/shared
COPY --chown=nginx:nginx games /usr/share/nginx/html/games

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:8080/ || exit 1
