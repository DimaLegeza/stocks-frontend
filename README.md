# Description
Front-end part of application for CRUD stocks maintenance. 

# Overview
Project consists of two parts:
* front-end that is build using Angular and Material
* back-end that is build on top of Spring Boot

Back-end part can be found via [this link](https://github.com/DimaLegeza/stocks-backend) 

# Dependencies
Production environment: Docker or real web-server, e.g. Nginx
Development environment: npm, Angular CLI (installed globally), Karma (installed globally)

# Technological stack
* Angular 5
* AngularCLI 1.7.3
* Material 5.2.4

# Running on developer machine
1. Install globally AngularCLI with `npm install -g @angular/cli` 
1. Install globally Karma with `npm install -g karma` 
1. Install all project dependencies using `npm insall`

After that following running options are available:
* Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
* Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
* Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
* Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
* Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

# Docker
As production-ready solution, front-end docker image can be build on top of Nginx image

**Building Docker image:**
Windows machine:
```create_image.cmd```

*nix systems:
```./create_image.sh```

**Running Docker image:**
Project has pre-build docker-compose file that will run both back-end and front-end in integrated environment.

To run with docker-compose:
```docker-compose up```

To run front-end separately:
```npm run start```
