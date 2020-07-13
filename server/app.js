
const path = require('path');
const Koa = require('koa');
// const static = require('koa-static');
const staticMD = require('./koa-showdown.js')

const home = path.join(__dirname, '..','frontend');
const app = new Koa();

// app.use(static(home));
app.use(staticMD(home));     // like koa-static, but translates markdown

app.listen(3000);

