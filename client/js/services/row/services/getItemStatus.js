const sendItemStatus = async (userId, orderId, item) => {
  var response = await fetch("/itemstatus", {
    method: "PATCH",
    body: JSON.stringify({ userId, orderId, item }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    var err = await response.text();
    alert("Ошибка при обновлении статуса: " + err);
    console.log("sendItemStatusErr: ", err);
    return;
  }
};

export default async (userId, orderId, items) => {
  var [value, status] = items.split(":::");

  var checkbox = document.createElement("input");
  checkbox.id = value;
  checkbox.type = "checkbox";
  checkbox.name = "item-status";

  if (!Boolean(+status)) {
    checkbox.checked = false;
  } else {
    checkbox.checked = true;
  }

  checkbox.addEventListener("change", async (e) => {
    e.preventDefault();

    var orderStatus = await getOrderStatus(userId, orderId);

    // if (orderStatus < 3) {
    //   alert("text");
    //   return;
    // }

    if (checkbox.checked) {
      await sendItemStatus(userId, orderId, value + ":::" + 1);
    } else {
      await sendItemStatus(userId, orderId, value + ":::" + 0);
    }
  });

  var td = document.createElement("td");
  td.append(checkbox);

  return td;
};

const getOrderStatus = async (userId, orderId) => {
  var response = await fetch("/itemstatus" + "/" + userId + "/" + orderId);

  if (!response.ok) {
    var err = await response.text();
    console.log("sendItemStatusErr: ", err);
    return;
  }

  var json = await response.json();

  return json.split(":")[1];
};
