import { readFile, mkdir, cp, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const config = JSON.parse(await readFile(`${root}config.json`, 'utf8'));
const configured = process.env.FILLOUT_URL || config.filloutURL;
let embed = '';
if (configured) {
  const url = new URL(configured);
  if (url.protocol !== 'https:' || url.username || url.password || url.port ||
      !(url.hostname === 'fillout.com' || url.hostname.endsWith('.fillout.com')) ||
      !/^\/t\/[a-zA-Z0-9]+\/?$/.test(url.pathname)) throw new Error('Expected a published HTTPS Fillout form URL.');
  url.search = ''; url.hash = '';
  embed = `<div id="hosted-container"><p class="hint">This form is hosted by Fillout, which processes your submission.</p><p><a id="hosted-form" href="${url.href}" target="_blank" rel="noopener noreferrer">Open the form in a new tab ↗</a></p></div>`;
}
await mkdir(`${root}dist/feedback`, { recursive: true });
await cp(`${root}assets`, `${root}dist/assets`, { recursive: true });
const html = (await readFile(`${root}feedback/index.html`, 'utf8')).replace('<!-- FILLOUT -->', embed);
await writeFile(`${root}dist/feedback/index.html`, html);
await writeFile(`${root}dist/index.html`, html.replaceAll('../assets/', './assets/').replaceAll('../privacy/', './privacy/'));
await cp(`${root}privacy`, `${root}dist/privacy`, { recursive: true });
await writeFile(`${root}dist/.nojekyll`, '');
console.log(`Built feedback page (${configured ? 'Fillout' : 'email review'}).`);
