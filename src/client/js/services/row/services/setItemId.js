import checkItemId from "./checkItemId.js";
import sendItemIdToServer from "./sendItemIdToServer.js";

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
    }

    if (!input.value) {
      alert("Нельзя отправить пустое поле");
      return;
    }

    var itemIdIsValid = checkItemId(itemId);

    if (!itemIdIsValid) {
      alert("Введите корректный id товара");
      return;
    }

    await sendItemIdToServer(userId, orderId, index, itemId);
    window.location.reload();
  });

  form.append(input, btn);

  var td = document.createElement("td");
  td.append(form);

  return td;
};

export default setItemId;
