import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
for (const route of ['', 'feedback/', 'privacy/']) {
  const target = `https://yarynamashta.github.io/veiled-pages-site/${route}`;
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="referrer" content="no-referrer"><meta name="robots" content="noindex"><title>Veiled Pages — new address</title><link rel="canonical" href="${target}"><meta http-equiv="refresh" content="1;url=${target}"></head>
<body><main><h1>Veiled Pages</h1><p>Our website has moved.</p><p><a href="${target}">Continue to Veiled Pages</a></p></main>
<script>
const target = new URL(${JSON.stringify(target)});
if (!target.pathname.endsWith('/privacy/')) {
  const incoming = new URLSearchParams(location.search);
  const source = incoming.get('source');
  if (['ios', 'android', 'website'].includes(source)) target.searchParams.set('source', source);
  for (const key of ['app_version', 'ios_version', 'android_version']) {
    const value = incoming.get(key);
    if (value && /^\\d{1,4}(?:\\.\\d{1,4}){0,3}$/.test(value)) target.searchParams.set(key, value);
  }
}
location.replace(target.href);
</script></body></html>`;
  await mkdir(`${root}dist/${route}`, { recursive: true });
  await writeFile(`${root}dist/${route}index.html`, html);
}
await writeFile(`${root}dist/.nojekyll`, '');
console.log('Built legacy address redirects to Veiled Pages.');
