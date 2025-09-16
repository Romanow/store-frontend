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
$ docker compose up -d --wait gateway store-service warehouse-service warranty-service
$ npm run dev
```

Теперь нужно добавить OAuth2 и личный кабинет.

Чтобы добавить товар в корзину, клиент должен быть авторизован. Для авторизации открывается blur на весь экран и в
центре две кнопки:

* авторизация через Auth0.
* авторизация через Keycloak.

После этого выполняется redirect на страницу `/oauth2/authorization/${type}`, где type: auth0 или keycloak. После
успешной авторизации будет redirect на страницу / и в cookie придет `access_token`, который нужно сохранить

Так же для запроса purchase (запрос номер 2) добавить заголовок `Authorization`: `Bearer` + access_token. 

В личном кабинете нужно вывести все заказы (запрос номер 5).