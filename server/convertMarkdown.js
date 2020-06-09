const fs = require('fs');
const showdown = require('showdown');

const converter = new showdown.Converter();

function convertMarkdown(fpath) {
  let html = `<!-- ${fpath} -->\n`
  try {
    const mdText = fs.readFileSync(fpath, 'utf8');
    html += converter.makeHtml(mdText);

  } catch(e) {
    console.log('Error:', e.stack);
    html += `Error: ${e.stack}`
  }

  return html
}

module.exports = convertMarkdown;