async function formHandler() {
  var form = document.getElementById("auth-form");

  return form.addEventListener("submit", async (e) => {
    e.preventDefault();

    var formDataObj = {};

    new FormData(form).forEach((value, key) => {
      formDataObj[key] = value;
    });

    var response = await fetch("/auth/login/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataObj),
    });

    if (!response.ok) {
      throw new Error("Ошибка авторизации");
    }

    var json = await response.json();

    return json.redirect
      ? (window.location.href = "/")
      : (window.location.href = "/auth/login");
  });
}

formHandler();
