[![CI](https://github.com/Romanow/store-frontend/actions/workflows/build.yml/badge.svg?branch=master)](https://github.com/Romanow/store-frontend/actions/workflows/build.yml)
[![pre-commit](https://img.shields.io/badge/pre--commit-enabled-brightgreen?logo=pre-commit)](https://github.com/pre-commit/pre-commit)
[![Release](https://img.shields.io/github/v/release/Romanow/store-frontend?logo=github&sort=semver)](https://github.com/Romanow/store-frontend/releases/latest)
[![Docker Pulls](https://img.shields.io/docker/pulls/romanowalex/store-frontend?logo=docker)](https://hub.docker.com/r/romanowalex/store-frontend)
[![License](https://img.shields.io/github/license/Romanow/store-frontend)](https://github.com/Romanow/store-frontend/blob/main/LICENSE)

# Store Service

GitHub: [romanow/store-frontend](https://github.com/Romanow/store-frontend).
Store Service Backend: [romanow/store-service](https://github.com/Romanow/store-service).

## Локальный запуск

Используем [docker-compose.yml](docker-compose.yml):

```shell
$ npm install
$ docker compose up -d --wait postgres person-service
$ npm run dev
```
