var formHandler = async () => {
  var form = document.getElementById('auth-form');

  return form.addEventListener('submit', async (e) => {
    e.preventDefault();

    var formDataObj = {};

    new FormData(form).forEach((value, key) => {
      formDataObj[key] = value;
    });

    var response = await fetch('/auth/login/check', {
      method: 'POST',
      body: JSON.stringify(formDataObj),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error('Ошибка авторизации');

    var json = await response.json();

    return json.redirect
      ? (window.location.href = '/')
      : (window.location.href = '/auth/login');
  });
};

formHandler();
