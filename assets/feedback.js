const hosted = document.querySelector('#hosted-form');
if (hosted) {
  const url = new URL(hosted.href);
  const incoming = new URLSearchParams(location.search);
  const source = incoming.get('source');
  url.searchParams.set('source', ['ios', 'android'].includes(source) ? source : 'website');
  url.searchParams.set('lang', 'en');
  for (const key of ['app_version', 'ios_version', 'android_version']) {
    const value = incoming.get(key);
    if (value && /^\d{1,4}(?:\.\d{1,4}){0,3}$/.test(value)) url.searchParams.set(key, value);
  }
  hosted.href = url.href;
  const frame = document.createElement('iframe');
  frame.src = url.href;
  frame.title = 'Grimoire feedback form';
  frame.className = 'feedback-embed';
  frame.referrerPolicy = 'no-referrer';
  document.querySelector('#hosted-container').append(frame);
} else {
  document.querySelector('#email-form').hidden = false;
}
const form = document.querySelector('#feedback-form');
const review = document.querySelector('#review');
const status = document.querySelector('#status');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  for (const id of ['summary', 'details']) {
    const input = document.getElementById(id);
    input.setCustomValidity(input.value.trim() ? '' : 'Please add a few words.');
    if (!input.reportValidity()) return;
  }
  const data = new FormData(form);
  const report = `Grimoire feedback\n\nType: ${data.get('category')}\n\nSummary: ${data.get('summary').trim()}\n\n${data.get('details').trim()}`;
  document.querySelector('#report').textContent = report;
  document.querySelector('#send-email').href = `mailto:info@reasonswithin.com?subject=Grimoire%20feedback&body=${encodeURIComponent(report)}`;
  form.hidden = true;
  review.hidden = false;
  status.textContent = '';
  review.focus();
});
form.addEventListener('input', (event) => event.target.setCustomValidity(''));
document.querySelector('#edit').addEventListener('click', () => {
  review.hidden = true;
  form.hidden = false;
  document.querySelector('#summary').focus();
});
document.querySelector('#copy').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(document.querySelector('#report').textContent);
    status.textContent = 'Note copied. Nothing has been sent.';
  } catch {
    status.textContent = 'Copy is unavailable. Select and copy the note above.';
  }
});
