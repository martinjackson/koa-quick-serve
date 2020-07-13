const fs = require('fs');
const path = require('path');
const stat = require('fs/promises').stat
const showdown = require('showdown');

const converter = new showdown.Converter();

function convertMarkdown(fpath) {
  let html = `<!-- ${fpath} -->\n`
  try {
    const mdText = fs.readFileSync(fpath, 'utf8');
    html += converter.makeHtml(mdText);             // Isn't showdown simple

  } catch(e) {
    console.log('Error:', e.stack);
    html += `Error: ${e.stack}`
  }

  return html
}


function isErrorNotFound(err) {
  return err.code === "ENOENT";
}


const koaShowdown = (home) => {

  return async function (ctx) {
    let fpath = path.join(home, ctx.path);

    if (fpath.endsWith('/'))
       fpath += 'index.html'  // dont allow directory navigation
                              // TODO: serve up index.md if exists?

    const finfo = await stat(fpath).catch((err) => {
      if (isErrorNotFound(err)) {
        console.log(`${fpath} Not Found.`);
        ctx.throw(404);
      }
      throw err;
    });

    if (finfo.isFile()) {
      let mime = path.extname(fpath);
      if (mime === ".md") {
        ctx.type = ".html";
        ctx.body = convertMarkdown(fpath);
      } else {
        ctx.type = mime;
        ctx.body = fs.createReadStream(fpath);
      }
    }
  };
};

module.exports = koaShowdown;