// Submit the message form to Formspree via fetch so the user stays on the page
// instead of being redirected. Falls back to a normal form POST if fetch fails.
(function () {
  var form = document.getElementById('messageForm');
  var status = document.getElementById('formStatus');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (form.action.indexOf('YOUR_FORM_ID') !== -1) {
      setStatus(
        'Form not configured yet — add your Formspree ID in index.html.',
        'error'
      );
      return;
    }

    var button = form.querySelector('button[type="submit"]');
    if (button) button.disabled = true;
    setStatus('Sending…', '');

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    })
      .then(function (response) {
        if (response.ok) {
          form.reset();
          setStatus('Thanks! Your message has been sent.', 'success');
        } else {
          return response.json().then(function (data) {
            var msg =
              data && data.errors
                ? data.errors.map(function (er) { return er.message; }).join(', ')
                : 'Something went wrong. Please try again.';
            setStatus(msg, 'error');
          });
        }
      })
      .catch(function () {
        setStatus('Network error. Please try again.', 'error');
      })
      .finally(function () {
        if (button) button.disabled = false;
      });
  });

  function setStatus(text, kind) {
    if (!status) return;
    status.textContent = text;
    status.className = kind || '';
  }
})();
