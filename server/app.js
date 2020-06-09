// taken from: https://github.com/koajs/examples/blob/master/stream-file/app.js

const fs = require('fs');
const path = require('path');
const stat = require('fs/promises').stat
const Koa = require('koa');

const convertMarkdown = require('./convertMarkdown.js')

function isErrorNotFound(err) {
  return err.code === "ENOENT";
}

const home = path.join(__dirname, '..','frontend');
const app = new Koa();

// try GET /app.js

app.use(async function(ctx) {
  const fpath = path.join(home, ctx.path);

  const finfo = await stat(fpath)
      .catch(err => {
        if (isErrorNotFound(err)) {
          console.log(`${fpath} Not Found.`);
          ctx.throw(404)
        }
        throw err;
    });

  if (finfo.isFile()) {
    let mime = path.extname(fpath);
    if (mime === '.md') {
      ctx.type = '.html'
      ctx.body = convertMarkdown(fpath);
    } else {
      ctx.type = mime
      ctx.body = fs.createReadStream(fpath);
    }
  }
});

app.listen(3000);

