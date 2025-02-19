var sendItemId = async (userId, orderId, index, itemId) => {
  var response = await fetch("/itemid", {
    method: "PATCH",
    body: JSON.stringify({ userId, orderId, index, itemId }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    var err = await response.text();
    alert("Ошибка при обновлении статуса: " + err);
    console.log("ErrorOfSetItemID: ", err);
    return;
  }
};

var setItemId = async (userId, orderId, index) => {
  var input = document.createElement("input");
  input.id = index;
  input.name = index;
  input.type = "text";

  var btn = document.createElement("button");
  btn.type = "submit";
  btn.textContent = "изменить";

  var form = document.createElement("form");
  form.method = "PATCH";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    var formData = new FormData(form);

    for (var [index, itemId] of formData) {
      console.log(index, itemId);
    }

    if (!input.value) {
      alert("Нельзя отправить пустое поле");
      return;
    }
    await sendItemId(userId, orderId, index, itemId);
    window.location.reload();
  });

  form.append(input, btn);

  var td = document.createElement("td");
  td.append(form);

  return td;
};

var getItemId = async (itemId) => {
  var td = document.createElement("td");
  td.id = itemId;
  td.append(itemId || '');
  return td;
};

export { getItemId, setItemId };
