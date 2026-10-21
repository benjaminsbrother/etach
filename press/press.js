(() => {
  'use strict';
  const audio = document.getElementById('audio');
  const audioError = document.getElementById('audio-error');
  const showAudioError = () => { audioError.hidden = false; };
  audio.addEventListener('error', showAudioError);
  audio.querySelector('source').addEventListener('error', showAudioError);
  audio.addEventListener('playing', () => { audioError.hidden = true; });
  const copyButton = document.getElementById('copy-text');
  const status = document.getElementById('copy-status');
  if (navigator.clipboard && window.isSecureContext) {
    copyButton.hidden = false;
    copyButton.addEventListener('click', async () => {
      const quote = document.querySelector('blockquote').textContent.trim();
      const paragraphs = [...document.querySelectorAll('#press-copy p')].map(p => p.textContent.trim());
      const credits = [...document.querySelectorAll('.credits dl > div')].map(row => row.querySelector('dt').textContent.trim() + ': ' + row.querySelector('dd').textContent.trim());
      const text = ['יוסף בך | איתך', 'מילים, לחן והפקה: יוסף בך', quote, ...paragraphs, 'קרדיטים', ...credits, 'קשר לרדיו ולעיתונות: benjaminsbrother@gmail.com', 'להאזנה: https://ffm.to/etach'].join('\n\n');
      try {
        await navigator.clipboard.writeText(text);
        status.textContent = 'הטקסט הועתק';
      } catch (_) {
        status.textContent = 'לא ניתן להעתיק בדפדפן זה. אפשר להוריד קובץ Word.';
      }
    });
  }
})();
