# NodeJS / ExpressJS / TypeScript template 
![logo](https://mayajuni.github.io/2016/06/30/typescript-express/typescript-express-nodejs.jpg "NodeJS/ExpressJS/Typescript")
## Simple template project configured to use ExpressJS with Typescript on VS Code.
Originally created by [Lucas Werner](https://www.linkedin.com/in/lucas-werner/)


## Installation
This particular template is created using Visual Studio Code, so the TypeScript compiler is the one included on it. So to execute the compiler you can use the "Run Build Task" hotkey
All the packages used can be installed as usual with
```javascript
npm install
```
In order to prevent problems on the compilation step I highly recommend you to install TypeScript and TSC npm packages.
```javascript
sudo npm -g install typescript tsc
```

## Package.json
### Commands

#### npm start
Start the server in 'development' mode
```javascript
DEBUG=express* PORT=8000 NODE_ENV=dev nodemon --exitcrash --inspect ./bin/server.js
```
#### npm test
Executes the tests suite. It will create a folder called coverage which will contain the coverage information.
```javascript
NODE_ENV=test nyc --reporter=html mocha ./**/**.spec.js
```

#### npm run coverage
Shows the coverage report already created.
```javascript
nyc report
```
