# Cache in Nodejs with Redis and Docker

### Description

A simple application that caches requests from jsonplaceholder and swapi.

### Pre-requisites

- NodeJS
- Redis
- Docker

### Turn up

> Install dependencies

```
npm install
```

> Starting application for development

```
npm run start:dev
```

> Build Image

```
npm run docker:build
```

> Run Docker Compose

```
npm run docker:compose
```

> Test application (check response time)

```
curl http://localhost:5000/jsonp/posts
```

_<> with <3 by @ocardenasg_
