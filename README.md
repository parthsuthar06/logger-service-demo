# logger-service-demo

In folder structure two services are present:
- logger.js : responsible for streaming server log
- app.js : responsible for populating server log

### Installation

```sh
npm install
```

### Start Individual Service

To run logger service:
```sh
npm run logger
```
To run app service:
```sh
npm run app
```

### Start via pm2

Please first install [pm2](http://pm2.keymetrics.io/docs/usage/quick-start/)
```sh
npm start
```
or 
```sh
npm run start:logs
```
### Start via Docker

Install [Docker](https://docs.docker.com/) and [Docker-compose](https://docs.docker.com/compose/)
```sh
docker-compose up --build
```

### To see logs

for logger service that stream server logs visit http://localhost:4002 (default port)

for app service that will populating server logs visit http://localhost:4003 (default port)

### To change Service configuration

check ***ecosystem.config.js*** for environment variable for each app

***note : If port is changed then keep index.html and application socket port insync***