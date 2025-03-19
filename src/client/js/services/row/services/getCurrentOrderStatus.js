var getCurrentOrderStatus = async (userId, orderId, path) => {
  var url = path + userId + "/" + orderId;

  var response = await fetch(url);

  if (!response.ok) {
    alert("Ошибка при получении статуса заказа");
    throw new Error("Ошибка при получении статуса заказа");
  }

  var json = await response.json();

  var { currentOrderStatus } = json;

  return currentOrderStatus;
};

export default getCurrentOrderStatus;
